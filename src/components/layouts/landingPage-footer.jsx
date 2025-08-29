import React from "react";
import { FaCreditCard } from "react-icons/fa";
import SocialLinks from "../Landingpage/socialLinks";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 text-xl font-bold text-indigo-400 mb-4">
              <FaCreditCard />
              KC Payment
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Secure, fast, and reliable payment solutions for businesses of all
              sizes. Accept payments anywhere, anytime with our modern platform.
            </p>
            {/* Social Links Component */}
            <SocialLinks />
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {[
                "Features",
                "Pricing",
                "Integrations",
                "API Documentation",
                "Security",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {["About Us", "Careers", "Blog", "Press", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-indigo-400 transition"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {[
                "Help Center",
                "Documentation",
                "Community",
                "System Status",
                "Contact Support",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2024 KC Payment. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-indigo-400 transition">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-indigo-400 transition">
              Terms of Service
            </a>
            <a href="#cookies" className="hover:text-indigo-400 transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
