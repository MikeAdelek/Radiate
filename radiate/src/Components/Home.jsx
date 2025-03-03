import React from "react";
import { Animation_Variants } from "./AnimationVariants";
import { motion } from "framer-motion";

// Seperate button for component resuability
export const Button = ({ primary, children, className }) => {
  return (
    <motion.button
      className={`px-4 sm:px-5 md:px-6 py-2.5 md:py-3 
        text-sm rounded transition-colors duration-200
        ${
          primary
            ? "bg-[#635C4C] text-white hover:bg-[#4A4539]"
            : "bg-white text-[#1A1A1A] hover:bg-gray-50"
        }
        ${className || ""}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

const Home = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#F8F3F1] w-full min-h-[30rem] flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-6 md:py-12 lg:pt-32 lg:pb-16 w-full">
        <motion.div
          variants={Animation_Variants.staggerChildren}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-4 md:gap-8 items-start md:items-center"
        >
          {/* Left Column */}
          <motion.div
            variants={Animation_Variants.fadeInUp}
            className="pt-4 md:pt-0"
          >
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.2
              }}
              className="font-serif text-xl md:text-4xl lg:text-6xl text-[#1A1A1A] leading-tight sm:leading-[1.2] md:leading-[1.1]"
            >
              {title}
            </motion.h1>
          </motion.div>

          {/* Right Column */}
          <motion.div
            variants={Animation_Variants.staggerChildren}
            className="space-y-4 md:space-y-4"
          >
            <motion.div variants={Animation_Variants.fadeInUp}>
              <motion.p className="text-gray-700 text-justify text-sm sm:text-sm md:text-sm leading-relaxed sm:leading-relaxed">
                Welcome to the skincare revolution. The New age of beauty is
                here. Create a personalized routine with the best products.
                Helping you to achieve a youthful glow like never before.
              </motion.p>
            </motion.div>

            <motion.div
              variants={Animation_Variants.fadeInUp}
              className="flex flex-wrap gap-3 md:gap-4"
            >
              <Button primary>Shop collection</Button>
              <Button>Our story</Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
