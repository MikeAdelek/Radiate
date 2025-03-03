import React, { useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const Brand = () => {
  const brands = [
    { text: "As seen on", fontFamily: "sans", fontWeight: "thin" },
    { text: "Accent", fontFamily: "mono", fontWeight: "bold" },
    { text: "n•a", fontFamily: "display", fontWeight: "extrabold" },
    { text: "SOMEDAY", fontFamily: "poppins", fontWeight: "extrabold" },
    { text: "IRENE", fontFamily: "cursive", fontWeight: "semibold" },
    { text: "n•a", fontFamily: "display", fontWeight: "extrabold" },
    { text: "Accent", fontFamily: "mono", fontWeight: "bold" },
    { text: "Compose", fontFamily: "body", fontWeight: "normal" },
    { text: "n•a", fontFamily: "display", fontWeight: "extrabold" },
    { text: "IRENE", fontFamily: "cursive", fontWeight: "semibold" },
    { text: "As seen on", fontFamily: "sans", fontWeight: "thin" }
  ];

  // Create a doubled array for infinite scrolling effect
  const scrollBrands = [
    ...brands.slice(1),
    ...brands.slice(1),
    ...brands.slice(1)
  ];

  // Refs for the scrolling container
  const scrollRef = useRef(null);
  const xPos = useRef(0);
  const speed = useRef(0.5); // Pixels per frame - adjust for faster/slower scrolling

  // Use animation frame for smooth scrolling that never stops
  useAnimationFrame(() => {
    if (!scrollRef.current) return;

    // Get total width of all items for the first set
    const containerWidth = scrollRef.current.scrollWidth / 3;

    // Move position continuously
    xPos.current -= speed.current;

    // Reset position when first set of items is fully scrolled
    if (Math.abs(xPos.current) >= containerWidth) {
      xPos.current = 0;
    }

    // Apply transform
    scrollRef.current.style.transform = `translateX(${xPos.current}px)`;
  });

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl px-4 sm:px-6 md:px-8 pb-14 mx-auto flex flex-col items-center">
        {/* Outer container with overflow hidden */}
        <div className="w-full overflow-hidden">
          {/* Inner container that moves */}
          <div
            ref={scrollRef}
            className="flex items-center gap-8 md:gap-12 lg:gap-16 py-4 whitespace-nowrap"
          >
            {scrollBrands.map((brand, index) => (
              <motion.span
                key={index}
                className={`text-black font-${brand.fontFamily} font-${brand.fontWeight} text-xl sm:text-2xl md:text-3xl lg:text-4xl cursor-default`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {brand.text}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
