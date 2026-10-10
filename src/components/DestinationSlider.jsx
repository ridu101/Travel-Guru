
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { destinations } from "../data/destination";

export default function DestinationSlider() {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const activeDestination = destinations[activeIndex];

    const previousSlide = () => {
        setActiveIndex((current) =>
            current === 0 ? destinations.length - 1 : current - 1
        );
    };

    const nextSlide = () => {
        setActiveIndex((current) =>
            current === destinations.length - 1 ? 0 : current + 1
        );
    };

    if (!activeDestination) return null;

    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-900 text-white">
            {/* Full-screen background image */}
            <img
                key={activeDestination.id}
                src={activeDestination.image}
                alt={activeDestination.name}
                onError={(event) => {
                    console.error(
                        "Background image failed to load:",
                        activeDestination.image
                    );
                    event.currentTarget.style.display = "none";
                }}
                className="absolute inset-0 h-full w-full  object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-black/45" />

            {/* Content */}
            <section className="relative z-10 mx-auto flex min-h-screen max-w-362.5 flex-col justify-center px-6 pb-20 pt-32 lg:px-12">
                <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-12">

                    {/* Destination information */}
                    <div className="max-w-xl">
                        <h1 className="font-[Impact,sans-serif] text-5xl uppercase leading-tight sm:text-6xl lg:text-7xl">
                            {activeDestination.name}
                        </h1>

                        <p className="mt-5 max-w-md text-sm leading-6 text-white/85 sm:text-base">
                            {activeDestination.description}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(`/destination/${activeDestination.slug}`)
                            }
                            className="mt-6 inline-flex items-center gap-3 rounded-md bg-[#F9A51A] px-6 py-3 font-medium text-black transition hover:bg-amber-300"
                        >
                            Booking
                            <ArrowRight size={19} />
                        </button>
                    </div>

                    {/* Destination cards */}
                    <div
                        id="destinations"
                        className="grid grid-cols-1 gap-5 sm:grid-cols-3"
                    >
                        {destinations.map((destination, index) => (
                            <button
                                key={destination.id}
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                aria-pressed={activeIndex === index}
                                className={`group relative h-64 overflow-hidden rounded-2xl border-[3px] text-left transition-all duration-300 sm:h-72 lg:h-70 xl:h-82.5 ${activeIndex === index
                                        ? "-translate-y-1 border-[#F9A51A]"
                                        : "border-transparent hover:-translate-y-1 hover:border-white/60"
                                    }`}
                            >
                                {/* Card image */}
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    onError={(event) => {
                                        console.error(
                                            "Card image failed to load:",
                                            destination.image
                                        );
                                        event.currentTarget.style.display = "none";
                                    }}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Card overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-black/10" />

                                {/* Card title */}
                                <div className="absolute inset-x-0 bottom-0 p-4">
                                    <h2 className="font-[Impact,sans-serif] text-xl uppercase leading-tight sm:text-lg lg:text-xl xl:text-2xl">
                                        {destination.name}
                                    </h2>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Slider controls */}
                <div className="mt-9 flex justify-center gap-2 lg:mt-12">
                    <button
                        type="button"
                        onClick={previousSlide}
                        aria-label="Previous destination"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:bg-[#F9A51A]"
                    >
                        <ChevronLeft size={22} />
                    </button>

                    <button
                        type="button"
                        onClick={nextSlide}
                        aria-label="Next destination"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:bg-[#F9A51A]"
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>
            </section>
        </main>
    );
}
