
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin, Users } from "lucide-react";

import { destinations } from "../data/destination";

export default function DestinationDetails() {
    const { slug } = useParams();

    const destination = destinations.find(
        (item) => item.slug === slug
    );

    if (!destination) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-slate-950 px-6 text-white">
                <h1 className="text-3xl font-bold">
                    Destination not found
                </h1>

                <Link to="/" className="text-amber-400 underline">
                    Back to Home
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 px-5 pb-16 pt-28 text-white md:px-10">
            <div className="mx-auto max-w-7xl">
                <Link
                    to="/"
                    className="mb-7 inline-flex items-center gap-2 text-white/70 transition hover:text-amber-400"
                >
                    <ArrowLeft size={18} />
                    Back to destinations
                </Link>

                {/* Destination hero image */}
                <div className="relative mb-10 flex min-h-72 items-end overflow-hidden rounded-3xl bg-slate-800 p-7 md:min-h-96 md:p-12">
                    {destination.image && (
                        <img
                            src={destination.image}
                            alt={destination.name}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    )}

                    <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent" />

                    <div className="relative z-10">
                        <p className="mb-3 flex items-center gap-2 text-amber-300">
                            <MapPin size={18} />
                            Explore Bangladesh
                        </p>

                        <h1 className="text-4xl font-bold md:text-6xl">
                            {destination.name}
                        </h1>

                        <p className="mt-3 text-white/80">
                            {destination.subtitle}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5">
                    {/* Booking section */}
                    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:col-span-2">
                        <h2 className="text-2xl font-bold">Book Your Trip</h2>

                        <p className="mt-4 text-3xl font-bold text-amber-400">
                            ৳{destination.price}
                            <span className="text-sm font-normal text-white/60">
                                {" "} / person
                            </span>
                        </p>

                        <p className="mt-2 text-white/70">
                            {destination.duration}
                        </p>

                        <form
                            className="mt-7 space-y-5"
                            onSubmit={(event) => {
                                event.preventDefault();
                                alert("Booking functionality will be added later.");
                            }}
                        >
                            <label className="block">
                                <span className="mb-2 flex items-center gap-2 text-sm">
                                    <CalendarDays size={17} />
                                    Travel Date
                                </span>

                                <input
                                    type="date"
                                    required
                                    className="w-full rounded-lg border border-white/15 bg-slate-900 p-3 text-white"
                                />
                            </label>

                            <label className="block">
                                <span className="mb-2 flex items-center gap-2 text-sm">
                                    <Users size={17} />
                                    Number of Travelers
                                </span>

                                <input
                                    type="number"
                                    min="1"
                                    defaultValue="1"
                                    required
                                    className="w-full rounded-lg border border-white/15 bg-slate-900 p-3 text-white"
                                />
                            </label>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-amber-400 px-5 py-3 font-bold text-black transition hover:bg-amber-300"
                            >
                                Book Now
                            </button>
                        </form>
                    </section>

                    {/* Full details section */}
                    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 lg:col-span-3">
                        <h2 className="text-2xl font-bold">
                            About {destination.name}
                        </h2>

                        <p className="mt-5 leading-8 text-white/70">
                            {destination.description}
                        </p>

                        <h3 className="mt-8 text-xl font-semibold">
                            Highlights
                        </h3>

                        <ul className="mt-4 space-y-3">
                            {destination.highlights.map((highlight) => (
                                <li
                                    key={highlight}
                                    className="flex items-center gap-3 text-white/80"
                                >
                                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                                    {highlight}
                                </li>
                            ))}
                        </ul>

                        <p className="mt-8 rounded-xl bg-white/5 p-4 text-white/70">
                            Package duration: {destination.duration}
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
