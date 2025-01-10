import React from "react";

const Brand = () => {
  const brands = [
    { text: "As seen on", fontFamily: "sans", fontWeight: "thin" },
    { text: "Accent", fontFamily: "mono", fontWeight: "bold" },
    { text: "SOMEDAY", fontFamily: "poppins", fontWeight: "extrabold" },
    { text: "IRENE", fontFamily: "cursive", fontWeight: "semibold" },
    { text: "n•a", fontFamily: "display", fontWeight: "extrabold" },
    { text: "Compose", fontFamily: "body", fontWeight: "normal" }
  ];
  return (
    <div className="w-full py-8 px-4 bg-gray-50">
      <div className=" max-w-7xl mx-auto flex flex-wrap justify-evenly gap-4">
        <span className="text-center w-full text-lg text-black font-medium mb-4">
          As seen on
        </span>
        <div className="flex flex-wrap justify-center lg:justify-evenly items-center gap-4 w-full">
          {brands.slice(1).map((brand, index) => (
            <span
              key={index}
              className={`text-black font-${brand.fontFamily} font-${brand.fontWeight} text-xl sm:text-2xl md:text-3xl lg:text-4xl transition-transform cursor-default`}
            >
              {brand.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brand;
