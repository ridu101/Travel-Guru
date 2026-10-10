
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

import logo from "../assets/logo.png";
import { destinations } from "../data/destination";

export default function Navbar() {
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    function handleSearch(event) {
        event.preventDefault();

        const found = destinations.find((destination) =>
            destination.name
                .toLowerCase()
                .includes(search.trim().toLowerCase())
        );

        if (found) {
            navigate(`/ destination / ${ found.slug } `);
            setSearch("");
            setMenuOpen(false);
        }
    }

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <header className="absolute inset-x-0 top-0 z-50 text-white">
            <nav className="mx-auto flex max-w-362.5 flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:px-12">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="shrink-0"
                >
                    <img
                        src={logo}
                        alt="Travel Guru"
                        className="h-9 w-auto object-contain brightness-0 invert sm:h-12"
                    />
                </Link>

                {/* Desktop Search */}
                <form
                    onSubmit={handleSearch}
                    className="hidden h-10 max-w-112.5 flex-1 items-center gap-2 rounded border border-white/70 bg-white/10 px-3 sm:flex lg:ml-4"
                >
                    <Search
                        size={17}
                        className="shrink-0 text-white/80"
                    />

                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search your Destination..."
                        className="min-w-0 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/75"
                    />
                </form>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-5 text-sm md:flex lg:gap-7">
                    <Link to="/" className="transition hover:text-amber-400">
                        News
                    </Link>

                    <a
                        href="/#destinations"
                        className="transition hover:text-amber-400"
                    >
                        Destination
                    </a>

                    <a
                        href="/#about"
                        className="transition hover:text-amber-400"
                    >
                        Blog
                    </a>

                    <a
                        href="/#contact"
                        className="transition hover:text-amber-400"
                    >
                        Contact
                    </a>

                    <Link
                        to="/auth/login"
                        className="shrink-0 rounded bg-[#F9A51A] px-5 py-2.5 font-medium text-black transition hover:bg-amber-300 lg:px-7"
                    >
                        Login
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    className="flex h-10 w-10 items-center justify-center rounded border border-white/40 bg-white/10 transition hover:bg-white/20 md:hidden"
                >
                    {menuOpen ? (
                        <X size={23} />
                    ) : (
                        <Menu size={23} />
                    )}
                </button>

                {/* Mobile Search */}
                <form
                    onSubmit={handleSearch}
                    className="flex h-10 w-full items-center gap-2 rounded border border-white/70 bg-black/20 px-3 sm:hidden"
                >
                    <Search
                        size={17}
                        className="shrink-0 text-white/80"
                    />

                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search your Destination..."
                        className="min-w-0 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/75"
                    />
                </form>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <div className="w-full rounded-xl border border-white/20 bg-black/90 p-4 shadow-xl backdrop-blur-md md:hidden">
                        <div className="flex flex-col gap-1">

                            <Link
                                to="/"
                                onClick={closeMenu}
                                className="rounded-lg px-3 py-3 transition hover:bg-white/10 hover:text-amber-400"
                            >
                                News
                            </Link>

                            <a
                                href="/#destinations"
                                onClick={closeMenu}
                                className="rounded-lg px-3 py-3 transition hover:bg-white/10 hover:text-amber-400"
                            >
                                Destination
                            </a>

                            <a
                                href="/#about"
                                onClick={closeMenu}
                                className="rounded-lg px-3 py-3 transition hover:bg-white/10 hover:text-amber-400"
                            >
                                Blog
                            </a>

                            <a
                                href="/#contact"
                                onClick={closeMenu}
                                className="rounded-lg px-3 py-3 transition hover:bg-white/10 hover:text-amber-400"
                            >
                                Contact
                            </a>

                            <Link
                                to="/auth/login"
                                onClick={closeMenu}
                                className="mt-2 rounded-lg bg-[#F9A51A] px-4 py-3 text-center font-medium text-black transition hover:bg-amber-300"
                            >
                                Login
                            </Link>

                        </div>
                    </div>
                )}

            </nav>
        </header>
    );
}
