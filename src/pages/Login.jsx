
import { useState } from "react";
// import { FcFeedback, FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
    Mail,
    LockKeyhole,
    Eye,
    EyeOff,
    
} from "lucide-react";

import { useAuth } from "../provider/AuthProvider";
// import fbIcon from "../assets/fb.png"
import { FaFacebook, FaGoogle } from "react-icons/fa";

function getErrorMessage(error) {
    const messages = {
        "auth/invalid-credential": "Email অথবা password সঠিক নয়।",
        "auth/user-not-found": "এই email দিয়ে কোনো account পাওয়া যায়নি।",
        "auth/wrong-password": "Password সঠিক নয়।",
        "auth/invalid-email": "সঠিক email address দাও।",
        "auth/popup-closed-by-user": "Google login বাতিল করা হয়েছে।",
        "auth/popup-blocked": "Browser popup block করেছে। Popup allow করে আবার চেষ্টা করো।",
        "auth/unauthorized-domain": "Firebase Console-এর Authorized domains-এ এই domain যোগ করো।",
        "auth/operation-not-allowed": "Firebase Console-এ এই sign-in method enable করো।",
        "auth/network-request-failed": "Internet connection পরীক্ষা করো।",
        "auth/too-many-requests": "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করো।",
    };

    return messages[error?.code] || "Login করা যায়নি। আবার চেষ্টা করো।";
}

export default function Login() {
    const { login, googleLogin, resetPassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const redirectAfterLogin = () => {
        const destination = location.state?.from;

        if (destination?.pathname?.startsWith("/destination/")) {
            navigate(
                `${destination.pathname}${destination.search || ""}${destination.hash || ""}`,
                { replace: true }
            );
        } else {
            navigate("/", { replace: true });
        }
    };

    const handleEmailLogin = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        try {
            await login(email, password, remember);
            redirectAfterLogin();
        } catch (error) {
            await Swal.fire({
                title: "Login Failed",
                text: getErrorMessage(error),
                icon: "error",
                confirmButtonColor: "#F9A51A",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogleLogin = async () => {
        setSubmitting(true);

        try {
            await googleLogin();
            redirectAfterLogin();
        } catch (error) {
            await Swal.fire({
                title: "Google Login Failed",
                text: getErrorMessage(error),
                icon: "error",
                confirmButtonColor: "#F9A51A",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email.trim()) {
            await Swal.fire(
                "Email required",
                "প্রথমে email field-এ তোমার email লিখো।",
                "info"
            );
            return;
        }

        try {
            await resetPassword(email);

            await Swal.fire(
                "Check Your Email",
                "Password reset link তোমার email-এ পাঠানো হয়েছে।",
                "success"
            );
        } catch (error) {
            await Swal.fire(
                "Could Not Send Email",
                getErrorMessage(error),
                "error"
            );
        }
    };

    const inputClass =
        "w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-12 text-gray-800 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

    return (
        <div className="w-full max-w-md">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-amber-600">
                Welcome back
            </p>

            <h1 className="mb-2 text-3xl font-bold text-gray-900">
                Login to Travel Guru
            </h1>

            <p className="mb-7 text-sm text-gray-500">
                Sign in to continue planning your next trip.
            </p>

            <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                        className={inputClass}
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                        className={inputClass}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="current-password"
                        required
                    />

                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                    <label className="flex cursor-pointer items-center gap-2 text-gray-600">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-warning checkbox-sm"
                            checked={remember}
                            onChange={(event) => setRemember(event.target.checked)}
                        />
                        Remember me
                    </label>

                    <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="font-semibold text-amber-700 hover:underline"
                    >
                        Forgot password?
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-xl bg-[#F9A51A] py-3 font-bold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? "Please wait..." : "Login"}
                </button>
            </form>

            <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
                <div className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="">
                {/* Google Login */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={submitting}
                    className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 mb-2"
                >
                    <FaGoogle size={20} />

                    <span>
                        {submitting ? "Please wait..." : "Continue with Google"}
                    </span>
                </button>

                {/* Facebook Login */}
                <button
                    type="button"
                    // onClick={handleFacebookLogin}
                    disabled={submitting}
                    className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <FaFacebook size={20} />

                    <span>
                        {submitting ? "Please wait..." : "Continue With Facebook"}
                    </span>
                </button>
            </div>
           
           
        
   
           
            <p className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                    to="/auth/register"
                    className="font-bold text-amber-600 hover:underline"
                >
                    Create Account
                </Link>
            </p>
        </div>
    );
}
