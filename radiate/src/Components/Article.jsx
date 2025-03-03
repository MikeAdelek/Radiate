import React from "react";
import { Link } from "react-router-dom";
import { blogPost } from "./ArticleDetail";
import { motion } from "framer-motion";
import { Animation_Variants } from "./AnimationVariants";

const Article = () => {
  const blogArticle = blogPost.slice(0, 4);

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <motion.h2
            variants={Animation_Variants.titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="font-serif text-2xl md:text-3xl lg:text-4xl w-full sm:w-auto sm:text-left text-center"
          >
            From our journal
          </motion.h2>

          <div className="w-full sm:w-auto sm:text-right text-center">
            <motion.div
              variants={Animation_Variants.buttonVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Link
                to="/journal"
                className="inline-block px-4 md:px-6 py-2.5 md:py-3 bg-[#635C4C] text-white rounded hover:bg-[#4A4539] transition-colors duration-200"
              >
                Read all
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={Animation_Variants.containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch py-8 md:py-12"
        >
          {blogArticle.map((blog) => (
            <motion.div
              key={blog.id}
              variants={Animation_Variants.itemVariants}
              className="flex flex-col group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Link
                to="/"
                className="block aspect-w-16 aspect-h-9 overflow-hidden"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={blog.image}
                  alt={blog.title}
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
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Article;
