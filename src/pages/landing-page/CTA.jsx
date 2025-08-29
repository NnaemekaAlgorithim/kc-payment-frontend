import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function CTA() {
  return (
    <section className="bg-gray-100 py-20 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Ready to Get Started?
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-gray-600 text-lg">
          Join thousands of businesses already using KC Payment to grow their
          revenue.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700 transition">
            Start Free Trial <FaArrowRight />
          </button>
          <button className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition">
            Contact Sales
          </button>
        </div>
      </motion.div>
    </section>
  );
}
