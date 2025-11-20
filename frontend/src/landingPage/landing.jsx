import { motion, useScroll, useTransform } from "framer-motion";
import { NavLink } from "react-router";
import { FaPython, FaCloud, FaBrain, FaRobot } from "react-icons/fa";

export const Landing = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const trustedTech = [
    { icon: FaRobot, name: "OpenAI" },
    { icon: FaPython, name: "Python APIs" },
    { icon: FaCloud, name: "Cloud Platforms" },
    { icon: FaBrain, name: "Deep Learning" },
  ];

  const stats = [
    { number: "100+", label: "Supported AI APIs", icon: FaRobot },
    { number: "50+", label: "Integrations Ready", icon: FaCloud },
    { number: "10K+", label: "Lines of AI Code", icon: FaPython },
  ];

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 text-center px-4 max-w-5xl"
        >
          <h1 className="text-7xl md:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">
              Build Faster.
            </span>
            <br />
            <span className="text-gray-800">Ship Smarter.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform how AI apps integrate, deploy, and scale.
          </p>
          <NavLink to="/signup">
            <motion.div
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-slate-700 text-white rounded-full font-bold text-lg shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </motion.div>
          </NavLink>
        </motion.div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 mb-8 uppercase tracking-wider">
            Works With
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {trustedTech.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center gap-2 text-gray-700"
              >
                <tech.icon className="w-12 h-12" />
                <span className="text-sm">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
              Numbers That Speak
            </h2>
            <p className="text-xl text-gray-600">
              What our platform supports today
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl h-64">
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border border-white/30" />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
                    <stat.icon className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-5xl font-black text-gray-800 mb-2">
                      {stat.number}
                    </h3>
                    <p className="text-lg text-gray-600 font-semibold">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
