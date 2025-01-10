import React from "react";

const Home = (props) => {
  return (
    <div className="bg-[#F8F3F1] w-full min-h-[30rem] flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-6 md:py-12 lg:pt-32 lg:pb-16 w-full">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-start md:items-center">
          {/* Left Column */}
          <div className="pt-4 md:pt-0">
            <h1 className="font-serif text-xl md:text-4xl lg:text-6xl text-[#1A1A1A] leading-tight sm:leading-[1.2] md:leading-[1.1]">
              {props.title}
            </h1>
          </div>

          {/* Right Column */}
          <div className="space-y-4 md:space-y-4">
            <div>
              <p className="text-gray-700 text-justify text-sm sm:text-sm md:text-sm leading-relaxed sm:leading-relaxed">
                Welcome to the skincare revolution. The New age of beauty is
                here. Create a personalized routine with the best products.
                Helping you to achieve a youthful glow like never before.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <button className="px-4 sm:px-5 md:px-6 py-2.5 md:py-3 text-sm sm:text-sm bg-[#635C4C] text-white rounded hover:bg-[#4A4539] transition-colors duration-200">
                Shop collection
              </button>
              <button className="px-4 sm:px-5 md:px-6 py-2.5 md:py-3 text-sm sm:text-sm bg-white text-[#1A1A1A] rounded border-none hover:bg-gray-50 transition-colors duration-200">
                Our story
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
