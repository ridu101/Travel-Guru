
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
    UserRound,
    Mail,
    LockKeyhole,
    Eye,
    EyeOff,
} from "lucide-react";

import { useAuth } from "../provider/AuthProvider";

function getErrorMessage(error) {
    const messages = {
        "auth/email-already-in-use": "এই email দিয়ে আগে থেকেই account আছে।",
        "auth/invalid-email": "সঠিক email address দাও।",
        "auth/weak-password": "Password কমপক্ষে ৬ অক্ষরের হতে হবে।",
        "auth/network-request-failed": "Internet connection পরীক্ষা করো।",
        "auth/operation-not-allowed": "Firebase Console-এ Email/Password enable করো।",
    };

    return messages[error?.code] || "Registration করা যায়নি। আবার চেষ্টা করো।";
}

export default function Register() {
    const { register, logout } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (form.name.trim().length < 2) {
            await Swal.fire("Name Required", "তোমার নাম লিখো।", "warning");
            return;
        }

        if (form.password.length < 6) {
            await Swal.fire(
                "Weak Password",
                "Password কমপক্ষে ৬ অক্ষরের হতে হবে।",
                "warning"
            );
            return;
        }

        if (form.password !== form.confirmPassword) {
            await Swal.fire(
                "Password Mismatch",
                "দুটি password একই হতে হবে।",
                "warning"
            );
            return;
        }

        setSubmitting(true);

        try {
            const user = await register(
                form.name,
                form.email,
                form.password
            );

            const displayName = user.displayName || form.name.trim();

            // Firebase registration-এর পর স্বয়ংক্রিয়ভাবে sign in হয়।
            // তাই Login Now দেখানোর আগে sign out করছি।
            await logout();

            const result = await Swal.fire({
                title: "Account Created!",
                text: `Welcome to Travel Guru, ${displayName}!`,
                icon: "success",
                confirmButtonText: "Login Now",
                confirmButtonColor: "#F9A51A",
                allowOutsideClick: false,
                allowEscapeKey: false,
            });

            if (result.isConfirmed) {
                navigate("/auth/login", { replace: true });
            }
        } catch (error) {
            await Swal.fire(
                "Registration Failed",
                getErrorMessage(error),
                "error"
            );
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-12 text-gray-800 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

    return (
        <div className="w-full max-w-md">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-amber-600">
                Start your journey
            </p>

            <h1 className="mb-2 text-3xl font-bold text-gray-900">
                Create Account
            </h1>

            <p className="mb-7 text-sm text-gray-500">
                Join Travel Guru and plan your next adventure.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <UserRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                        className={inputClass}
                        name="name"
                        placeholder="Full name"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                    />
                </div>

                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                        className={inputClass}
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                        className={inputClass}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password (minimum 6 characters)"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        minLength={6}
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

                <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                        className={inputClass}
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        aria-label="Toggle confirm password visibility"
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-xl bg-[#F9A51A] py-3 font-bold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? "Creating Account..." : "Create Account"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                    to="/auth/login"
                    className="font-bold text-amber-600 hover:underline"
                >
                    Login
                </Link>
            </p>
        </div>
    );
}
