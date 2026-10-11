
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { destinations } from "../data/destination";

const CARDS_PER_PAGE = 4;

export default function DestinationSlider() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate();

    const activeDestination = destinations[activeIndex];

    const totalPages = Math.ceil(
        destinations.length / CARDS_PER_PAGE
    );

    const visibleDestinations = destinations.slice(
        currentPage * CARDS_PER_PAGE,
        (currentPage + 1) * CARDS_PER_PAGE
    );

    const selectDestination = (index) => {
        setActiveIndex(index);
        setCurrentPage(Math.floor(index / CARDS_PER_PAGE));
    };

    const previousSlide = () => {
        const nextIndex =
            activeIndex === 0
                ? destinations.length - 1
                : activeIndex - 1;

        selectDestination(nextIndex);
    };

    const nextSlide = () => {
        const nextIndex =
            activeIndex === destinations.length - 1
                ? 0
                : activeIndex + 1;

        selectDestination(nextIndex);
    };

    const showMore = () => {
        if (currentPage < totalPages - 1) {
            const nextPage = currentPage + 1;

            setCurrentPage(nextPage);
            setActiveIndex(nextPage * CARDS_PER_PAGE);
        }
    };

    if (!activeDestination) return null;

    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-900 text-white">

            {/* Background image */}
            {activeDestination.image && (
                <img
                    key={activeDestination.id}
                    src={activeDestination.image}
                    alt={activeDestination.name}
                    onError={(event) => {
                        event.currentTarget.style.display = "none";
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            )}

            {/* Background overlays */}
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-black/45" />

            {/* Main content */}
            <section className="relative z-10 mx-auto flex min-h-screen max-w-362.5 flex-col justify-center px-6 pb-12 pt-32 lg:px-12">

                <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-12">

                    {/* Destination information */}
                    <div className="max-w-xl">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#F9A51A]">
                            Explore Bangladesh
                        </p>

                        <h1 className="font-[Impact,sans-serif] text-5xl uppercase leading-tight sm:text-6xl lg:text-7xl">
                            {activeDestination.name}
                        </h1>

                        <p className="mt-4 text-base font-medium text-white">
                            {activeDestination.subtitle}
                        </p>

                        <p className="mt-4 max-w-md text-sm leading-7 text-white/85 sm:text-base">
                            {activeDestination.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3 text-sm">
                            <span className="rounded-lg border border-white/30 bg-black/30 px-3 py-2">
                                {activeDestination.duration}
                            </span>

                            <span className="rounded-lg border border-white/30 bg-black/30 px-3 py-2">
                                From ৳{activeDestination.price}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    `/destination/${activeDestination.slug}`
                                )
                            }
                            className="mt-6 inline-flex items-center gap-3 rounded-md bg-[#F9A51A] px-6 py-3 font-bold text-black transition hover:bg-amber-300"
                        >
                            Booking
                            <ArrowRight size={19} />
                        </button>
                    </div>

                    {/* Four destination cards */}
                    <div id="destinations">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            {visibleDestinations.map((destination) => {
                                const index = destinations.findIndex(
                                    (item) => item.id === destination.id
                                );

                                const isActive = activeIndex === index;

                                return (
                                    <button
                                        key={destination.id}
                                        type="button"
                                        onClick={() => selectDestination(index)}
                                        aria-pressed={isActive}
                                        className={`group relative h-56 overflow-hidden rounded-2xl border-[3px] text-left transition-all duration-300 sm:h-64 lg:h-60 xl:h-64 ${isActive
                                                ? "-translate-y-1 border-[#F9A51A]"
                                                : "border-transparent hover:-translate-y-1 hover:border-white/60"
                                            }`}
                                    >
                                        {/* Card image */}
                                        {destination.image && (
                                            <img
                                                src={destination.image}
                                                alt={destination.name}
                                                loading="lazy"
                                                onError={(event) => {
                                                    event.currentTarget.style.display = "none";
                                                }}
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        )}

                                        {/* Card overlay */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-black/10" />

                                        {/* Card title and details */}
                                        <div className="absolute inset-x-0 bottom-0 p-4">
                                            <h2 className="font-[Impact,sans-serif] text-xl uppercase leading-tight sm:text-lg lg:text-xl">
                                                {destination.name}
                                            </h2>

                                            <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/80">
                                                {destination.subtitle}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}

                        </div>

                        {/* Page information */}
                        <div className="mt-5 flex items-center justify-between gap-3">
                            <p className="text-sm text-white/80">
                                Showing{" "}
                                {currentPage * CARDS_PER_PAGE + 1}
                                {" - "}
                                {Math.min(
                                    (currentPage + 1) * CARDS_PER_PAGE,
                                    destinations.length
                                )}
                                {" of "}
                                {destinations.length} destinations
                            </p>

                            <button
                                type="button"
                                onClick={showMore}
                                disabled={currentPage >= totalPages - 1}
                                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#F9A51A] px-4 py-2.5 text-sm font-bold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {currentPage >= totalPages - 1
                                    ? "All Destinations Shown"
                                    : "Show More"}
                                {currentPage < totalPages - 1 && (
                                    <ArrowRight size={17} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Previous / Next slider controls */}
                <div className="mt-8 flex items-center justify-center gap-4 lg:mt-10">
                    <button
                        type="button"
                        onClick={previousSlide}
                        aria-label="Previous destination"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition hover:bg-[#F9A51A]"
                    >
                        <ChevronLeft size={22} />
                    </button>

                    <span className="min-w-16 text-center text-sm text-white/90">
                        {activeIndex + 1} / {destinations.length}
                    </span>

                    <button
                        type="button"
                        onClick={nextSlide}
                        aria-label="Next destination"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition hover:bg-[#F9A51A]"
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>

            </section>
        </main>
    );
}
