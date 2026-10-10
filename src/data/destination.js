
import cox from "../assets/Rectangle 1.png";
import sundarban from "../assets/sundorbon.png";
import srimanglar from "../assets/Sreemongol.png";

export const destinations = [
    {
        id: "cox",
        slug: "cox-bazar",
        name: "Cox's Bazar",
        subtitle: "Discover the world's longest sea beach",
        description:
            "Cox's Bazar is famous for its long natural sandy beach, Marine Drive, and beautiful sunsets.",
        duration: "3 Days / 2 Nights",
        price: 5000,
        image: cox,
        highlights: ["Sea Beach", "Marine Drive", "Sunset"],
    },
    {
        id: "sundarbans",
        slug: "sundarbans",
        name: "Sundarbans",
        subtitle: "Explore the world's largest mangrove forest",
        description:
            "Discover mangrove forests, river cruises, and the natural beauty of the Sundarbans.",
        duration: "3 Days / 2 Nights",
        price: 6500,
        image: sundarban,
        highlights: ["Mangrove Forest", "River Cruise", "Wildlife"],
    },
    {
        id: "sreemangal",
        slug: "sreemangal",
        name: "Sreemangal",
        subtitle: "Experience the beauty of tea gardens",
        description:
            "Enjoy beautiful tea gardens, green hills, and peaceful natural scenery in Sreemangal.",
        duration: "2 Days / 1 Night",
        price: 3500,
        image: srimanglar,
        highlights: ["Tea Gardens", "Green Hills", "Nature"],
    },
];
