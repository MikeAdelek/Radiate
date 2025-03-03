import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import AboutImg from "../assets/aboutImg.jpg";
import { Animation_Variants } from "../Components/AnimationVariants";

const OurStory = () => {
  // Create controls for animations
  const headingControls = useAnimation();
  const textControls = useAnimation();
  const imageControls = useAnimation();
  const founderNoteControls = useAnimation();
  const paragraphControls = useAnimation();

  // Create refs to detect when elements are in view
  const [headingRef, headingInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  const [textRef, textInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  const [imageRef, imageInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  const [founderRef, founderInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  const [paragraphsRef, paragraphsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Start animations when elements come into view
  useEffect(() => {
    if (headingInView) headingControls.start("visible");
    if (textInView) textControls.start("visible");
    if (imageInView) imageControls.start("visible");
    if (founderInView) founderNoteControls.start("visible");
    if (paragraphsInView) paragraphControls.start("visible");
  }, [
    headingInView,
    textInView,
    imageInView,
    founderInView,
    paragraphsInView,
    headingControls,
    textControls,
    imageControls,
    founderNoteControls,
    paragraphControls
  ]);

  // Sample paragraphs array for cleaner code
  const founderParagraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget mauris in nulla posuere malesuada. Sed diam diam, posuere eu urna cursus, dignissim pharetra tortor. In at orci id sapien tincidunt vulputate.",
    "Aenean eu enim blandit, ullamcorper augue a, posuere mauris. Duis ante purus, semper non erat vel, vehicula commodo nibh. Maecenas tellus ante, consequat quis massa nec, sollicitudin sodales urna. Proin at leo finibus, scelerisque urna sed, mattis tortor. Mauris faucibus consequat tempus. Fusce tempor erat vitae leo cursus sagittis.",
    "Nam a semper leo. Duis quis velit ultricies, faucibus metus id, mattis est. In vel neque iaculis, porttitor turpis nec, volutpat ligula. Nullam rutrum dolor in leo laoreet molestie.",
    "Maecenas mi ex, feugiat vel enim non, cursus hendrerit dui. Phasellus pellentesque ut ante in posuere.",
    "Donec imperdiet facilisis dolor dictum. Sed cursus id dolor at volutpat. Nulla at vehicula erat. Fusce lacinia tellus vel mauris viverra, id interdum quam pellentesque."
  ];

  return (
    <section className="w-full bg-white min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-24 lg:pt-32 lg:pb-16 flex-grow">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 mb-16 items-center">
          <div className="text-center md:text-left">
            <motion.h3
              ref={headingRef}
              initial="hidden"
              animate={headingControls}
              variants={Animation_Variants.fadeInUp}
              className="text-black font-medium text-2xl md:text-3xl lg:text-4xl mb-4 max-w-xl mx-auto md:mx-0"
            >
              A better way
            </motion.h3>
            <motion.p
              ref={textRef}
              initial="hidden"
              animate={textControls}
              variants={Animation_Variants.fadeInUp}
              className="text-black text-justify text-sm md:text-base lg:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis. Sed diam diam, posuere eu urna cursus, dignissim pharetra
              tortor. In at orci id sapien tincidunt vulputate.
            </motion.p>
          </div>
          <motion.div
            ref={imageRef}
            initial="hidden"
            animate={imageControls}
            variants={Animation_Variants.scaleIn}
            className="w-full h-auto flex justify-center"
          >
            <img
              src={AboutImg}
              alt="About Image"
              className="object-cover w-full max-w-xl rounded-lg shadow-md"
            />
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <motion.h2
            ref={founderRef}
            initial="hidden"
            animate={founderNoteControls}
            variants={Animation_Variants.fadeInUp}
            className="text-center text-2xl md:text-3xl lg:text-4xl font-medium text-black mb-8"
          >
            A note from our founder
          </motion.h2>
        </div>
        <motion.div
          ref={paragraphsRef}
          initial="hidden"
          animate={paragraphControls}
          variants={Animation_Variants.staggeredParagraphs}
          className="max-w-5xl mx-auto space-y-4 text-justify text-sm md:text-base lg:text-lg text-black leading-relaxed"
        >
          {founderParagraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              variants={Animation_Variants.paragraphItem}
              className="mb-4"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
