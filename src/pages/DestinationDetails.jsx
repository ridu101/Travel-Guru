
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    MapPin,
    Users,
    Clock3,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";

import { destinations } from "../data/destination";

export default function DestinationDetails() {
    const { slug } = useParams();

    const destination = destinations.find(
        (item) => item.slug === slug
    );

    if (!destination) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">
                        Destination Not Found
                    </h1>
                    <Link
                        to="/"
                        className="mt-5 inline-flex items-center gap-2 text-amber-400"
                    >
                        <ArrowLeft size={18} />
                        Back to Home
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
            {/* Full-page destination background */}
            <img
                src={destination.image}
                alt={destination.name}
                className="fixed inset-0 h-full w-full object-cover"
            />

            {/* Dark overlays */}
            <div className="fixed inset-0 bg-black/65" />
            <div className="fixed inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/60" />

            {/* Page content */}
            <div className="relative z-10 mx-auto max-w-[1450px] px-6 pb-16 pt-28 lg:px-12">
                {/* Back navigation */}
                <Link
                    to="/"
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-sm text-white/85 backdrop-blur-md transition hover:border-amber-400 hover:text-amber-400"
                >
                    <ArrowLeft size={17} />
                    Back to destinations
                </Link>

                {/* Main two-column layout */}
                <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">

                    {/* Left: Destination information */}
                    <section className="flex flex-col justify-center lg:min-h-[570px]">
                        <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
                            <MapPin size={18} />
                            Explore Bangladesh
                        </p>

                        <h1 className="max-w-3xl font-[Impact,sans-serif] text-5xl uppercase leading-[1.05] sm:text-6xl lg:text-8xl">
                            {destination.name}
                        </h1>

                        <h2 className="mt-5 max-w-xl text-xl font-medium text-white/90 sm:text-2xl">
                            {destination.subtitle}
                        </h2>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                            {destination.description}
                        </p>

                        {/* Duration */}
                        <div className="mt-7 flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-md">
                                <Clock3 size={17} className="text-amber-400" />
                                <span className="text-sm">{destination.duration}</span>
                            </div>

                            <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-md">
                                <span className="text-sm">
                                    Starting from{" "}
                                    <strong className="text-amber-400">
                                        ৳{destination.price}
                                    </strong>
                                    <span className="text-white/60"> / person</span>
                                </span>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="mt-9">
                            <h3 className="text-lg font-semibold">
                                Trip Highlights
                            </h3>

                            <div className="mt-4 flex flex-wrap gap-3">
                                {destination.highlights.map((highlight) => (
                                    <span
                                        key={highlight}
                                        className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/25 px-3 py-2 text-sm text-white/85 backdrop-blur-md"
                                    >
                                        <CheckCircle2
                                            size={16}
                                            className="text-amber-400"
                                        />
                                        {highlight}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Right: Booking form */}
                    <section className="rounded-3xl border border-white/20 bg-black/45 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:mt-5">
                        <div className="border-b border-white/15 pb-5">
                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-400">
                                Plan your trip
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                Book Your Journey
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-white/60">
                                Choose your travel date and the number of travelers.
                            </p>
                        </div>

                        <div className="mt-6 flex items-end justify-between gap-3">
                            <div>
                                <p className="text-sm text-white/60">
                                    Package price
                                </p>
                                <p className="mt-1 text-3xl font-bold text-amber-400">
                                    ৳{destination.price}
                                    <span className="ml-1 text-sm font-normal text-white/60">
                                        / person
                                    </span>
                                </p>
                            </div>
                        </div>

                        <form
                            className="mt-7 space-y-5"
                            onSubmit={(event) => {
                                event.preventDefault();

                                const formData = new FormData(event.currentTarget);
                                const date = formData.get("travelDate");
                                const travelers = Number(formData.get("travelers"));

                                if (!date || travelers < 1) return;

                                const total = destination.price * travelers;

                                alert(
                                    `Destination: ${destination.name}\nTravel date: ${date}\nTravelers: ${travelers}\nEstimated total: ৳${total.toLocaleString("en-BD")}\n\nBooking submission will be connected later.`
                                );
                            }}
                        >
                            {/* Travel date */}
                            <label className="block">
                                <span className="mb-2 flex items-center gap-2 text-sm font-medium">
                                    <CalendarDays
                                        size={17}
                                        className="text-amber-400"
                                    />
                                    Travel Date
                                </span>

                                <input
                                    type="date"
                                    name="travelDate"
                                    min={new Date().toLocaleDateString("en-CA")}
                                    required
                                    className="w-full rounded-xl border border-white/15 bg-white/10 p-3.5 text-white outline-none transition focus:border-amber-400"
                                />
                            </label>

                            {/* Number of travelers */}
                            <label className="block">
                                <span className="mb-2 flex items-center gap-2 text-sm font-medium">
                                    <Users size={17} className="text-amber-400" />
                                    Number of Travelers
                                </span>

                                <select
                                    name="travelers"
                                    defaultValue="1"
                                    required
                                    className="w-full rounded-xl border border-white/15 bg-slate-900 p-3.5 text-white outline-none transition focus:border-amber-400"
                                >
                                    <option value="1">1 Traveler</option>
                                    <option value="2">2 Travelers</option>
                                    <option value="3">3 Travelers</option>
                                    <option value="4">4 Travelers</option>
                                    <option value="5">5 Travelers</option>
                                    <option value="6">6 Travelers</option>
                                    <option value="7">7 Travelers</option>
                                    <option value="8">8 Travelers</option>
                                    <option value="9">9 Travelers</option>
                                    <option value="10">10 Travelers</option>
                                </select>
                            </label>

                            {/* Booking summary */}
                            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="text-white/65">Duration</span>
                                    <span>{destination.duration}</span>
                                </div>

                                <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                                    <span className="text-white/65">Price per person</span>
                                    <span>৳{destination.price.toLocaleString("en-BD")}</span>
                                </div>

                                <p className="mt-3 border-t border-white/10 pt-3 text-xs leading-5 text-white/50">
                                    Your total cost depends on the number of travelers.
                                </p>
                            </div>

                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#F9A51A] px-5 py-4 font-bold text-black transition hover:bg-amber-300"
                            >
                                Continue Booking
                                <ArrowRight size={19} />
                            </button>

                            <p className="text-center text-xs leading-5 text-white/45">
                                This is a design preview. Actual booking and payment
                                functionality will be added later.
                            </p>
                        </form>
                    </section>
                </div>

                {/* Additional destination details */}
                <section className="mt-12 rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-lg sm:p-8">
                    <h2 className="text-2xl font-bold sm:text-3xl">
                        Discover {destination.name}
                    </h2>

                    <p className="mt-4 max-w-4xl leading-8 text-white/70">
                        {destination.description}
                    </p>

                    <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {destination.highlights.map((highlight, index) => (
                            <div
                                key={highlight}
                                className="rounded-2xl border border-white/10 bg-white/5 p-5"
                            >
                                <span className="text-sm font-semibold text-amber-400">
                                    0{index + 1}
                                </span>

                                <h3 className="mt-3 text-lg font-semibold">
                                    {highlight}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-white/60">
                                    Explore {highlight.toLowerCase()} during your visit
                                    to {destination.name}.
                                </p>
                            </div>
                        ))}
                    </div>

                    <Link
                        to="/"
                        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-400 transition hover:text-amber-300"
                    >
                        <ArrowLeft size={17} />
                        Explore other destinations
                    </Link>
                </section>
            </div>
        </main>
    );
}
