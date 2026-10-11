
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";

import { auth } from "../firebase";

const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      () => {
        setUser(null);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const register = async (name, email, password) => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    await updateProfile(credential.user, {
      displayName: name.trim(),
    });

    return credential.user;
  };

  const login = async (email, password, remember = true) => {
    await setPersistence(
      auth,
      remember
        ? browserLocalPersistence
        : browserSessionPersistence
    );

    const credential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    return credential.user;
  };

  const googleLogin = async () => {
    await setPersistence(auth, browserLocalPersistence);

    const credential = await signInWithPopup(
      auth,
      googleProvider
    );

    return credential.user;
  };

  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email.trim());
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    loading,
    register,
    login,
    googleLogin,
    resetPassword,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
