
import { Link, Outlet } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import { destinations } from "../data/destination";

export default function AuthLayout() {
  const backgroundImage = destinations[0]?.image;

  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      <section className="relative hidden min-h-screen overflow-hidden lg:block">
        <img
          src={backgroundImage}
          alt="Travel destination"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20" />

        <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 xl:p-14">
          <Link to="/" className="flex w-fit items-center gap-3 text-white">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F9A51A] text-black">
              <Compass size={27} />
            </span>
            <span>
              <span className="block text-2xl font-bold">Travel Guru</span>
              <span className="text-xs text-white/70">Explore beyond ordinary</span>
            </span>
          </Link>

          <div className="max-w-xl pb-8">
            <span className="mb-5 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
              Your next adventure starts here
            </span>

            <h1 className="text-4xl font-bold leading-tight text-white xl:text-6xl">
              The world is wide.
              <br />
              <span className="text-[#F9A51A]">Go explore it.</span>
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-white/80">
              Discover beautiful places and create memories that last forever.
            </p>
          </div>

          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Travel Guru
          </p>
        </div>
      </section>

      <section className="flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900">
            <ArrowLeft size={17} />
            Back to home
          </Link>

          <Link to="/" className="flex items-center gap-2 font-bold text-slate-900 lg:hidden">
            <Compass className="text-[#F9A51A]" size={25} />
            Travel Guru
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>

        <p className="pb-2 text-center text-xs text-slate-400">
          Travel beautifully. Travel with Travel Guru.
        </p>
      </section>
    </main>
  );
}
