
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="absolute top-0 left-0 z-50 w-full text-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
                <Link to="/" className="text-2xl font-bold tracking-wide">
                    Travel<span className="text-amber-400">Guru</span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    <Link to="/" className="transition hover:text-amber-400">
                        Home
                    </Link>

                    <a href="#destinations" className="transition hover:text-amber-400">
                        Destinations
                    </a>

                    <a href="#about" className="transition hover:text-amber-400">
                        About
                    </a>
                </div>

                <Link
                    to="/"
                    className="rounded-lg border border-white/70 px-5 py-2 transition hover:bg-white hover:text-black"
                >
                    Login
                </Link>
            </nav>
        </header>
    );
}
