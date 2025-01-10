import React from "react";
import Home from "../Components/Home";
import { Link } from "react-router-dom";
import { blogPost } from "../Components/ArticleDetail";

const Journal = () => {
  return (
    <>
      <Home title="Journal" />
      <section className="bg-white w-full min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch py-8 md:py-12">
            {blogPost.map((blog) => (
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
                    <p className="text-xs font-sans text-black mb-4 line-clamp-2">
                      {blog.content}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#635C4C] py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center p-12">
            <div className="mb-8">
              <h3 className="text-white font-medium text-2xl md:text-3xl mb-4 max-w-sm mx-auto">
                Tips, guides, and articles straight to your inbox
              </h3>
              <p className="text-white text-sm md:text-base max-w-2xl mx-auto opacity-90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                commodo diam libero vitae erat.
              </p>
            </div>
            <form
              action="#"
              className="w-full flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-xl mx-auto"
            >
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus-within:ring-[#4A4539] focus-within:border-transparent text-black"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-[#635C4C] rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Journal;
