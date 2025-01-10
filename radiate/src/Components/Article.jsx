import React from "react";
import { Link } from "react-router-dom";
import { blogPost } from "./ArticleDetail";

const Article = () => {
  const blogArticle = blogPost.slice(0, 4);

  return (
    <section className="bg-white w-full py-6 md:py-8 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl w-full sm:w-auto sm:text-left text-center">
            From our journal
          </h2>

          <div className="w-full sm:w-auto sm:text-right text-center">
            <Link
              to="/journal"
              className="inline-block px-4 md:px-6 py-2.5 md:py-3 bg-[#635C4C] text-white rounded hover:bg-[#4A4539] transition-colors duration-200"
            >
              Read all
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch py-8 md:py-12">
          {blogArticle.map((blog) => (
            <div
              key={blog.id}
              className="flex flex-col group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Link
                to="/"
                className="block aspect-w-16 aspect-h-9 overflow-hidden"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 rounded-t-lg"
                />
              </Link>

              <Link
                to="/"
                className="flex-grow p-4 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-sm font-[Instrument Serif] text-[#4A4539] mb-2 px-2 py-1 rounded-full bg-[#F8F3F1]">
                    {blog.tag}
                  </span>
                  <h3 className="text-base font-serif text-black mb-4 line-clamp-2">
                    {blog.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Article;
