import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="min-h-[100vh] flex flex-col items-center justify-center relative bg-gradient-to-br from-blue-50 to-blue-100 text-center px-6 py-20 overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
      >
        Accept Payments <br />
        <span className="text-blue-600">Anywhere, Anytime</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600"
      >
        Streamline your payment process with KC Payment – the secure,
        mobile-first platform for businesses that scale.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700 transition">
          Get Started Free <FaArrowRight />
        </button>
        <button className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition">
          View Demo
        </button>
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-12 flex flex-wrap justify-center gap-6 text-gray-600 text-sm"
      >
        {[
          "PCI DSS Compliant",
          "99.9% Uptime",
          "24/7 Support",
          "No Setup Fees",
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />
            {item}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
