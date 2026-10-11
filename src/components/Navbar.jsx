
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import Swal from "sweetalert2";

import logo from "../assets/logo.png";
import { destinations } from "../data/destination";
import { useAuth } from "../provider/AuthProvider";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  function handleSearch(event) {
    event.preventDefault();

    const searchValue = search.trim().toLowerCase();

    if (!searchValue) return;

    const found = destinations.find((destination) =>
      destination.name.toLowerCase().includes(searchValue)
    );

    if (found) {
      navigate(`/ destination / ${ found.slug } `);
      setSearch("");
      setMenuOpen(false);
    } else {
      Swal.fire({
        title: "Destination Not Found",
        text: "Please enter a valid destination name.",
        icon: "info",
        confirmButtonColor: "#F9A51A",
      });
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  async function handleLogout() {
    try {
      await logout();
      closeMenu();

      await Swal.fire({
        title: "Logged Out!",
        text: "You have successfully logged out.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);

      Swal.fire({
        title: "Logout Failed",
        text: "Please try again.",
        icon: "error",
        confirmButtonColor: "#F9A51A",
      });
    }
  }

  function AuthLinks({ mobile = false }) {
    const containerClass = mobile
      ? "mt-3 flex flex-col gap-3 border-t border-white/15 pt-4"
      : "flex items-center gap-3";

    if (loading) {
      return (
        <div className={containerClass}>
          <span className="loading loading-spinner loading-sm text-warning" />
        </div>
      );
    }

    if (!user) {
      return (
        <div className={containerClass}>
          <Link
            to="/auth/login"
            onClick={closeMenu}
            className={
              mobile
                ? "rounded-lg bg-[#F9A51A] px-4 py-3 text-center font-semibold text-black transition hover:bg-amber-300"
                : "shrink-0 rounded-lg bg-[#F9A51A] px-4 py-2.5 text-center font-semibold text-black transition hover:bg-amber-300"
            }
          >
            Login Now
          </Link>
        </div>
      );
    }

    return (
      <div className={containerClass}>
        <span
          className="max-w-48 truncate px-2 text-sm text-white"
          title={user.email || ""}
        >
          {user.displayName || user.email}
        </span>

        <button
          type="button"
          onClick={handleLogout}
          className={
            mobile
              ? "rounded-lg bg-[#F9A51A] px-4 py-3 font-semibold text-black transition hover:bg-amber-300"
              : "shrink-0 rounded-lg bg-[#F9A51A] px-4 py-2.5 font-semibold text-black transition hover:bg-amber-300"
          }
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50 text-white">
      <nav className="mx-auto flex max-w-[1450px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:px-12">

        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="shrink-0">
          <img
            src={logo}
            alt="Travel Guru"
            className="h-9 w-auto object-contain brightness-0 invert sm:h-12"
          />
        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden h-10 max-w-[450px] flex-1 items-center gap-2 rounded border border-white/70 bg-white/10 px-3 sm:flex lg:ml-4"
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
            aria-label="Search destination"
            className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/75"
          />
        </form>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 text-sm md:flex lg:gap-6">
          <Link
            to="/"
            className="transition hover:text-amber-400"
          >
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

          {/* Firebase Authentication */}
          <AuthLinks />
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded border border-white/40 bg-white/10 transition hover:bg-white/20 md:hidden"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
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
            aria-label="Search destination"
            className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/75"
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

              {/* Mobile Firebase Authentication */}
              <AuthLinks mobile />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
