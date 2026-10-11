
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  Compass,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../provider/AuthProvider";

function getAuthError(error) {
  const messages = {
    "auth/invalid-credential":
      "Email অথবা password সঠিক নয়।",
    "auth/invalid-email":
      "সঠিক email address দাও।",
    "auth/user-disabled":
      "এই account বর্তমানে disabled।",
    "auth/too-many-requests":
      "অনেকবার চেষ্টা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করো।",
    "auth/popup-closed-by-user":
      "Google sign-in window বন্ধ করা হয়েছে।",
    "auth/popup-blocked":
      "Browser popup block করেছে। Popup allow করে আবার চেষ্টা করো।",
    "auth/unauthorized-domain":
      "Firebase Console-এ এই domain authorize করতে হবে।",
    "auth/network-request-failed":
      "Internet connection পরীক্ষা করো।",
  };

  return (
    messages[error.code] ||
    "অনুরোধ সম্পন্ন হয়নি। আবার চেষ্টা করো।"
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { login, googleLogin, resetPassword, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setBusy(true);

    try {
      await login(email, password, remember);
      navigate("/");
    } catch (error) {
      setMessage(getAuthError(error));
    } finally {
      setBusy(false);
    }
  };

  const handleGoogleLogin = async () => {
    setMessage("");
    setBusy(true);

    try {
      await googleLogin();
      navigate("/");
    } catch (error) {
      setMessage(getAuthError(error));
    } finally {
      setBusy(false);
    }
  };

  const handleForgotPassword = async () => {
    setMessage("");

    if (!email.trim()) {
      setMessage("আগে Email address লিখো।");
      return;
    }

    setBusy(true);

    try {
      await resetPassword(email);
      setMessage(
        "যদি এই email-এর account থাকে, password reset link পাঠানো হবে। Inbox এবং spam folder দেখো।"
      );
    } catch (error) {
      setMessage(getAuthError(error));
    } finally {
      setBusy(false);
    }
  };

  const disabled = busy || loading;

  return (
    <div>
      <div className="mb-8">
        <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-[#D88700]">
          <Compass size={27} />
        </span>

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D88700]">
          Welcome back
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Sign in to your account
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Your next adventure is just a step away.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-slate-700">
            Email address
          </label>

          <div className="relative">
            <Mail size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#F9A51A] focus:bg-white focus:ring-4 focus:ring-amber-100"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label htmlFor="login-password" className="text-sm font-semibold text-slate-700">
              Password
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={disabled}
              className="text-xs font-semibold text-[#B87500] hover:text-black disabled:opacity-50"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <LockKeyhole size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#F9A51A] focus:bg-white focus:ring-4 focus:ring-amber-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            className="h-4 w-4 accent-[#F9A51A]"
          />
          Remember me
        </label>

        {message && (
          <p role="status" className="rounded-xl bg-amber-50 p-3 text-sm leading-6 text-amber-800">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={disabled}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F9A51A] px-5 py-3.5 font-bold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Please wait..." : "Sign In"}
          {!busy && <ArrowRight size={19} />}
        </button>

        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-xs text-slate-400">
              OR CONTINUE WITH
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={disabled}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
        >
          <span className="flex h-5 w-5 items-center justify-center font-bold text-base">
            G
          </span>
          Continue with Google
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link to="/auth/register" className="font-bold text-[#B87500] hover:text-black">
          Create account
        </Link>
      </p>
    </div>
  );
}
