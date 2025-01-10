import React from "react";
import AboutImg from "../assets/aboutImg.jpg";

const Ourstory = () => {
  return (
    <section className="w-full bg-white min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-24 lg:pt-32 lg:pb-16 flex-grow">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 mb-16 items-center">
          <div className="text-center md:text-left">
            <h3 className="text-black font-medium text-2xl md:text-3xl lg:text-4xl mb-4 max-w-xl mx-auto md:mx-0">
              A better way
            </h3>
            <p className="text-black text-justify text-sm md:text-base lg:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis. Sed diam diam, posuere eu urna cursus, dignissim pharetra
              tortor. In at orci id sapien tincidunt vulputate.
            </p>
          </div>
          <div className="w-full h-auto flex justify-center">
            <img
              src={AboutImg}
              alt="About Image"
              className="object-cover w-full max-w-xl rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-8">
          <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-medium text-black mb-8">
            A note from our founder
          </h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4 text-justify text-sm md:text-base lg:text-lg text-black leading-relaxed">
          {[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget mauris in nulla posuere malesuada. Sed diam diam, posuere eu urna cursus, dignissim pharetra tortor. In at orci id sapien tincidunt vulputate.",
            "Aenean eu enim blandit, ullamcorper augue a, posuere mauris. Duis ante purus, semper non erat vel, vehicula commodo nibh. Maecenas tellus ante, consequat quis massa nec, sollicitudin sodales urna. Proin at leo finibus, scelerisque urna sed, mattis tortor. Mauris faucibus consequat tempus. Fusce tempor erat vitae leo cursus sagittis.",
            "Nam a semper leo. Duis quis velit ultricies, faucibus metus id, mattis est. In vel neque iaculis, porttitor turpis nec, volutpat ligula. Nullam rutrum dolor in leo laoreet molestie.",
            "Maecenas mi ex, feugiat vel enim non, cursus hendrerit dui. Phasellus pellentesque ut ante in posuere.",
            "Donec imperdiet facilisis dolor dictum. Sed cursus id dolor at volutpat. Nulla at vehicula erat. Fusce lacinia tellus vel mauris viverra, id interdum quam pellentesque."
          ].map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ourstory;
