import React from "react";
import Home from "../Components/Home";
import { Link } from "react-router-dom";
import { blogPost } from "../Components/ArticleDetail";
import { Animation_Variants } from "../Components/AnimationVariants";
import { motion } from "framer-motion";

const Journal = () => {
  return (
    <>
      <Home title="Journal" />
      <section className="bg-white w-full min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch py-8 md:py-12"
            variants={Animation_Variants.containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {blogPost.map((blog) => (
              <motion.div
                key={blog.id}
                variants={Animation_Variants.itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                }}
                className="flex flex-col group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Link
                  to="/"
                  className="block aspect-w-16 aspect-h-9 overflow-hidden"
                >
                  <motion.img
                    src={blog.image}
                    alt={blog.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="object-cover w-full h-full rounded-t-lg"
                  />
                </Link>

                <Link
                  to="/"
                  className="flex-grow p-4 flex flex-col justify-between"
                >
                  <div>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="inline-block text-sm font-[Instrument Serif] text-[#4A4539] mb-2 px-2 py-1 rounded-full bg-[#F8F3F1]"
                    >
                      {blog.tag}
                    </motion.span>
                    <motion.h3
                      whileHover={{ x: 2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-base font-serif text-black mb-4 line-clamp-2"
                    >
                      {blog.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-xs font-sans text-black mb-4 line-clamp-2"
                    >
                      {blog.content}
                    </motion.p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div
          className="bg-[#635C4C] py-12 px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={Animation_Variants.subscriptionVariants}
        >
          <div className="max-w-4xl mx-auto text-center p-12">
            <motion.div
              className="mb-8"
              variants={Animation_Variants.childVariants}
            >
              <motion.h3
                className="text-white font-medium text-2xl md:text-3xl mb-4 max-w-sm mx-auto"
                variants={Animation_Variants.childVariants}
              >
                Tips, guides, and articles straight to your inbox
              </motion.h3>
              <motion.p
                className="text-white text-sm md:text-base max-w-2xl mx-auto opacity-90"
                variants={Animation_Variants.childVariants}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                commodo diam libero vitae erat.
              </motion.p>
            </motion.div>
            <motion.form
              action="#"
              className="w-full flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-xl mx-auto"
              variants={Animation_Variants.childVariants}
            >
              <motion.input
                type="email"
                placeholder="Your email"
                variants={Animation_Variants.inputVariants}
                whileFocus="focus"
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus-within:ring-[#4A4539] focus-within:border-transparent text-black"
              />
              <motion.button
                type="submit"
                variants={Animation_Variants.buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-6 py-3 bg-white text-[#635C4C] rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                Submit
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Journal;
