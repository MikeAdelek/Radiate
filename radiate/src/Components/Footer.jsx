import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    shop: [
      { label: "Shop all", to: "/shopall" },
      { label: "Bestseller", to: "/bestseller" },
      { label: "Body", to: "/body" },
      { label: "Hair", to: "/hair" },
      { label: "Scent", to: "/scent" },
      { label: "Skin", to: "/skin" }
    ],
    company: [
      { label: "Journal", to: "/journal" },
      { label: "Our story", to: "/ourstory" },
      { label: "FAQs", to: "/faq" },
      { label: "Contact", to: "/contact" },
      { label: "Returns", to: "/returns" }
    ],
    socials: [
      { label: "Instagram", to: "/", external: true },
      { label: "TikTok", to: "/", external: true },
      { label: "Pinterest", to: "/", external: true },
      { label: "Twitter", to: "/", external: true },
      { label: "LinkedIn", to: "/", external: true },
      { label: "YouTube", to: "/", external: true }
    ],
    legal: [
      { label: "Style Guide", to: "/style-guide" },
      { label: "Licenses", to: "/licenses" },
      { label: "Password", to: "/password" },
      { label: "404", to: "/404" }
    ]
  };

  const renderLinks = (links) => (
    <div className="space-y-4">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
          className="block text-black hover:text-gray-900 transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
  return (
    <>
      <footer className="bg-white py-2 lg:py-2 md:py-16 h-[30rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div className="flex flex-wrap justify-between lg:text-left md:text-center">
              <h2 className="font-bold text-black text-2xl mb-2">Radiate</h2>
            </div>
            {/* Link column */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 col-span-1 md:col-span-3 lg:col-span-4 gap-8 text-justify">
              <div>{renderLinks(footerLinks.shop)}</div>
              <div>{renderLinks(footerLinks.company)}</div>
              <div>{renderLinks(footerLinks.socials)}</div>
              <div>{renderLinks(footerLinks.legal)}</div>
            </div>
          </div>
          {/* Footer Bottom */}
          <div className="mt-32 pt-4 lg:pt-18 border-t border-gray-200 flex flex-wrap justify-between items-center">
            <div className="space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/terms" className="text-black hover:text-gray-900">
                Terms
              </Link>
              <Link to="/privacy" className="text-black hover:text-gray-900">
                Privacy
              </Link>
              <a
                href="https://folll.io/mikeadeleke"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-900"
              >
                Built by Michael Olomola
              </a>
            </div>
            <p className="text-gray-600">&copy; 2024 Radiate</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
