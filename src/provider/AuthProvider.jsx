
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
        const result = await createUserWithEmailAndPassword(
            auth,
            email.trim(),
            password
        );

        await updateProfile(result.user, {
            displayName: name.trim(),
        });

        return result.user;
    };

    const login = async (email, password, remember = true) => {
        await setPersistence(
            auth,
            remember ? browserLocalPersistence : browserSessionPersistence
        );

        const result = await signInWithEmailAndPassword(
            auth,
            email.trim(),
            password
        );

        return result.user;
    };

    const googleLogin = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
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

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
