
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useAuth } from "../provider/AuthProvider";

export default function AuthButtons() {
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();

            await Swal.fire({
                title: "Logged Out!",
                text: "তুমি সফলভাবে logout করেছ।",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            navigate("/", { replace: true });
        } catch {
            await Swal.fire({
                title: "Logout Failed",
                text: "আবার চেষ্টা করো।",
                icon: "error",
            });
        }
    };

    if (loading) {
        return (
            <div className="h-9 w-20 animate-pulse rounded-lg bg-white/10" />
        );
    }

    if (!user) {
        return (
            <div className="flex items-center gap-3">
                <Link
                    to="/auth/login"
                    className="font-semibold text-white transition hover:text-[#F9A51A]"
                >
                    Login
                </Link>

                <Link
                    to="/auth/register"
                    className="rounded-lg bg-[#F9A51A] px-4 py-2 font-semibold text-black transition hover:bg-amber-300"
                >
                    Register
                </Link>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <span
                className="max-w-36 truncate text-sm text-white"
                title={user.email || ""}
            >
                {user.displayName || user.email}
            </span>

            <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-[#F9A51A] px-4 py-2 font-semibold text-black transition hover:bg-amber-300"
            >
                Logout
            </button>
        </div>
    );
}
