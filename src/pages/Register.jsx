
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  Compass,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../provider/AuthProvider";

function getRegisterError(error) {
  const messages = {
    "auth/email-already-in-use":
      "এই email দিয়ে আগেই account তৈরি করা হয়েছে। Login করো।",
    "auth/invalid-email":
      "সঠিক email address দাও।",
    "auth/weak-password":
      "আরও শক্তিশালী password ব্যবহার করো।",
    "auth/operation-not-allowed":
      "Firebase Console-এ Email/Password provider Enable করো।",
    "auth/network-request-failed":
      "Internet connection পরীক্ষা করো।",
  };

  return (
    messages[error.code] ||
    "Account তৈরি করা যায়নি। আবার চেষ্টা করো।"
  );
}

export default function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("Password কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("দুটি password মিলছে না।");
      return;
    }

    if (!acceptedTerms) {
      setMessage("চালিয়ে যেতে Terms & Conditions গ্রহণ করো।");
      return;
    }

    setBusy(true);

    try {
      await register(name, email, password);
      navigate("/");
    } catch (error) {
      setMessage(getRegisterError(error));
    } finally {
      setBusy(false);
    }
  };

  const disabled = busy || loading;

  return (
    <div>
      <div className="mb-6">
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-[#D88700]">
          <Compass size={27} />
        </span>

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D88700]">
          Start exploring
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Create your account
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Join Travel Guru and plan your next journey.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="register-name" className="mb-2 block text-sm font-semibold text-slate-700">
            Full name
          </label>

          <div className="relative">
            <UserRound size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              id="register-name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#F9A51A] focus:bg-white focus:ring-4 focus:ring-amber-100"
            />
          </div>
        </div>

        <div>
          <label htmlFor="register-email" className="mb-2 block text-sm font-semibold text-slate-700">
            Email address
          </label>

          <div className="relative">
            <Mail size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              id="register-email"
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
          <label htmlFor="register-password" className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>

          <div className="relative">
            <LockKeyhole size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
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

        <div>
          <label htmlFor="register-confirm-password" className="mb-2 block text-sm font-semibold text-slate-700">
            Confirm password
          </label>

          <div className="relative">
            <LockKeyhole size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              id="register-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Enter your password again"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#F9A51A] focus:bg-white focus:ring-4 focus:ring-amber-100"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-5 text-slate-500">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-[#F9A51A]"
          />
          <span>
            I agree to the{" "}
            <span className="font-semibold text-slate-800">
              Terms & Conditions
            </span>{" "}
            and Privacy Policy.
          </span>
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
          {busy ? "Creating account..." : "Create Account"}
          {!busy && <ArrowRight size={19} />}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/auth/login" className="font-bold text-[#B87500] hover:text-black">
          Sign in
        </Link>
      </p>
    </div>
  );
}
