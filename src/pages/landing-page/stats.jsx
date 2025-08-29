import { motion } from "framer-motion";
import { stats } from "../../constant/LandingPage";

export default function Stats() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Trusted by Thousands
      </h2>
      <p className="mb-12 text-lg opacity-90">
        Join the growing community of businesses using KC Payment
      </p>

      <div className="grid gap-8 md:grid-cols-4 max-w-5xl mx-auto">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <h3 className="text-4xl font-bold">{s.value}</h3>
            <p className="opacity-90 mt-2">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
