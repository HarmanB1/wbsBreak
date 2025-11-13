import { motion } from "framer-motion";

const FeatureCard = ({ title, description, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="relative group"
  >
    <div className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg hover:grey-100/10 transition-all duration-500 hover:scale-105 hover:bg-white/90">
      <div className="absolute inset-0 x rounded-3xl opacity-0 group-hover:opacity-100 " />

      <div className="relative z-10">
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-3 text-slate-800">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

const TimelineItem = ({ title, description, position }) => (
  <motion.div
    initial={{ opacity: 0, x: position === "left" ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className={`flex items-center gap-8 ${
      position === "right" ? "flex-row-reverse" : ""
    }`}
  >
    <div className="flex-1 p-6 rounded-2xl bg-white/90 backdrop-blur-lg border border-gray-200 shadow-lg">
      <h4 className="text-xl font-semibold mb-2 text-slate-800">{title}</h4>
      <p className="text-slate-600">{description}</p>
    </div>

    <div className="w-4 h-4 rounded-full bg-gray-400 shadow-md" />

    <div className="flex-1" />
  </motion.div>
);

export const Features = () => {
  const features = [
    {
      icon: "temp",
      title: "Smart WBS Generation",
      description:
        "Transform your ideas into structured work breakdown structures instantly. AI-powered organization helps you see the full scope of your project.",
    },
    {
      icon: "temp",
      title: "Task Prioritization",
      description:
        "Automatically prioritize tasks based on dependencies, complexity, and your goals. Focus on what matters most at every stage.",
    },
    {
      icon: "temp",
      title: "Agile Workflows",
      description:
        "Experience real Scrum methodology tailored for solo developers. Sprint planning, daily standups, and retrospectives - all adapted for one.",
    },
    {
      icon: "temp",
      title: "Progress Tracking",
      description:
        "Visualize your journey with beautiful charts and timelines. See how far you've come and what's ahead at a glance.",
    },
    {
      icon: "temp",
      title: "Virtual Scrum Master",
      description:
        "Get guidance and coaching from your AI Scrum Master. Receive suggestions, stay accountable, and maintain momentum.",
    },
    {
      icon: "temp",
      title: "Lightning Fast",
      description:
        "Seamless performance that keeps up with your thoughts. No friction between ideation and execution.",
    },
  ];

  const timelineSteps = [
    {
      title: "Ideation",
      description: "Start with your concept or problem statement",
    },
    {
      title: "Breakdown",
      description: "AI generates a comprehensive WBS structure",
    },
    {
      title: "Planning",
      description: "Organize tasks into sprints and set priorities",
    },
    { title: "Execution", description: "Track progress with Agile workflows" },
    { title: "Delivery", description: "Ship your project with confidence" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-200 via-white-50 to-stone-50">
      {/* Hero Section */}
      <div className="relative z-10 px-8 pt-40 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-7xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-slate-800 via-slate-500 to-stone-700 bg-clip-text text-transparent">
            Transform Your Developer Journey
          </h1>

          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg">
            <p className="text-xl text-slate-700 leading-relaxed">
              <span className="font-semibold">
                Your AI-Powered Agile Companion
              </span>{" "}
              helps solo developers plan, organize, and execute projects like a
              full Agile team. Turn ideas into structured work breakdowns,
              prioritize tasks, and track progress effortlessly — all while
              simulating Scrum workflows. Stay focused, work smarter, and move
              your projects from concept to completion with the guidance of your
              virtual Scrum Master.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 px-8 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center mb-16 text-slate-800"
        >
          Powerful Features
        </motion.h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 0.1} />
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative z-10 px-8 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center mb-16 text-slate-800"
        >
          Your Journey
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-12 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-slate-600 to-amber-600 opacity-30" />

          {timelineSteps.map((step, index) => (
            <TimelineItem
              key={index}
              {...step}
              position={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-6xl font-bold mb-8 text-slate-800">
            Ready to Get Started?
          </h2>

          <p className="text-xl text-slate-600 mb-12">
            Join developers who are shipping faster with structured planning
          </p>

          <a href="/signup">
            <motion.button
              whileHover={{ scale: 1.05 , transition: {duration: 0.1}}}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 text-xl font-semibold text-white bg-gradient-to-r from-slate-800 via-slate-700 to-stone-700 rounded-full shadow-lg hover:shadow-gray-500/30 transition-all duration-300 border border-gray-500/20"
            >
              Sign Up Now
            </motion.button>
          </a>

          <p className="mt-6 text-slate-500">
            No credit card required • Start in seconds
          </p>
        </motion.div>
      </div>
    </div>
  );
};
