
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";

import { destinations } from "../data/destination";

export default function DestinationSlider() {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const activeDestination = destinations[activeIndex];

    return (
        <section className="relative flex min-h-screen items-center overflow-hidden bg-slate-900 text-white">
            {/* Selected destination background image */}
            {activeDestination.image && (
                <img
                    key={activeDestination.image}
                    src={activeDestination.image}
                    alt={activeDestination.name}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            )}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-black/20" />

            {/* Temporary background if images are not added yet */}
            <div className="absolute inset-0 z-0 bg-linear-to-br from-slate-800 to-slate-950" />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 pt-32">
                <div className="max-w-2xl">
                    <div className="mb-5 flex items-center gap-2 text-amber-400">
                        <MapPin size={18} />
                        <span className="text-sm font-semibold uppercase tracking-[0.25em]">
                            Explore Bangladesh
                        </span>
                    </div>

                    <h1 className="text-5xl font-bold leading-tight md:text-7xl">
                        {activeDestination.name}
                    </h1>

                    <h2 className="mt-4 text-xl font-medium md:text-2xl">
                        {activeDestination.subtitle}
                    </h2>

                    <p className="mt-4 max-w-lg leading-7 text-white/80">
                        {activeDestination.description}
                    </p>

                    <button
                        onClick={() =>
                            navigate(`/destination/${activeDestination.slug}`)
                        }
                        className="mt-7 inline-flex items-center gap-3 rounded-lg bg-amber-400 px-6 py-3 font-semibold text-black transition hover:bg-amber-300"
                    >
                        Explore Now
                        <ArrowRight size={19} />
                    </button>
                </div>

                {/* Three fixed destination cards */}
                <div
                    id="destinations"
                    className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3"
                >
                    {destinations.map((destination, index) => (
                        <button
                            key={destination.id}
                            onClick={() => setActiveIndex(index)}
                            aria-pressed={activeIndex === index}
                            className={`group relative h-48 overflow-hidden rounded-2xl border-2 text-left transition duration-300 md:h-56 ${activeIndex === index
                                    ? "border-amber-400 -translate-y-2"
                                    : "border-white/30 hover:-translate-y-1 hover:border-white"
                                }`}
                        >
                            {destination.image ? (
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-linear-to-br from-slate-700 to-slate-950" />
                            )}

                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute inset-x-0 bottom-0 p-5">
                                <p className="mb-2 text-xs uppercase tracking-wider text-amber-300">
                                    {destination.duration}
                                </p>

                                <h3 className="text-2xl font-bold">
                                    {destination.name}
                                </h3>

                                <p className="mt-1 text-sm text-white/80">
                                    {destination.subtitle}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
