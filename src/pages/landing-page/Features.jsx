import { motion } from "framer-motion";
import { features } from "../../constant/LandingPage";

export default function Features() {
  return (
    <section className="bg-gray-50 py-20 px-6 flex flex-col items-center justify-center min-h-[100vh] ">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Why Choose KC Payment?
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-lg">
          Everything you need to accept, process, and manage payments.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition"
          >
            <f.icon className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">{f.title}</h3>
            <p className="mt-2 text-gray-600">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
