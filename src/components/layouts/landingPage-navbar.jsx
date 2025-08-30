import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaCreditCard } from "react-icons/fa";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-bold text-indigo-600 cursor-pointer">
          <FaCreditCard />
          KC Payment
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-gray-700 font-medium hover:text-indigo-600 transition"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-gray-700 font-medium hover:text-indigo-600 transition"
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="text-gray-700 font-medium hover:text-indigo-600 transition"
          >
            Contact
          </a>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button size="sm" onClick={() => navigate("/signup")}>
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 text-2xl p-2 rounded-lg hover:bg-gray-100"
          onClick={toggleMobileMenu}
        >
          <FaBars />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg z-50 flex flex-col items-center gap-6 py-6"
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-700 text-2xl p-2"
              onClick={closeMobileMenu}
            >
              <FaTimes />
            </button>

            <a
              href="#features"
              onClick={closeMobileMenu}
              className="text-lg font-medium text-gray-700 hover:text-primary"
            >
              Features
            </a>
            <a
              href="#pricing"
              onClick={closeMobileMenu}
              className="text-lg font-medium text-gray-700 hover:text-primary"
            >
              Pricing
            </a>
            <a
              href="#contact"
              onClick={closeMobileMenu}
              className="text-lg font-medium text-gray-700 hover:text-primary"
            >
              Contact
            </a>

            {/* Buttons */}
            <div className="flex flex-col gap-3 w-4/5 max-w-xs">
              <Button
                variant="outline"
                fullWidth
                onClick={() => {
                  navigate("/login");
                  closeMobileMenu();
                }}
              >
                Login
              </Button>
              <Button
                fullWidth
                onClick={() => {
                  navigate("/signup");
                  closeMobileMenu();
                }}
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
