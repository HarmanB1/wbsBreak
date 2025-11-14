import { motion } from "framer-motion";
import { NavLink } from "react-router";
import {
  Zap,
  Target,
  Workflow,
  BarChart,
  Bot,
  Rocket,
  ArrowRight,
} from "lucide-react";

//fix animation my guess it has to do with fact already in view
//fix text clipping
const FeatureCard = ({ title, description, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    whileHover={{ y: -10, transition: { duration: 0.2 } }}
    className="relative group"
  >
    <div className="relative overflow-hidden rounded-3xl shadow-2xl h-full">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border border-gray-200" />
      <div className="relative z-10 flex flex-col p-8">
        <Icon className="w-12 h-12 text-slate-700 mb-4" />
        <h3 className="text-2xl font-bold mb-3 text-slate-800">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-stone-500/5"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  </motion.div>
);

const TimelineItem = ({ title, description, position, index }) => (
  <motion.div
    initial={{ opacity: 0, x: position === "left" ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className={`flex items-center gap-8 ${
      position === "right" ? "flex-row-reverse" : ""
    }`}
  >
    <motion.div
      className="flex-1 p-6 rounded-2xl bg-white/90 backdrop-blur-lg border border-gray-200 shadow-lg"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <h4 className="text-xl font-semibold mb-2 text-slate-800">{title}</h4>
      <p className="text-slate-600">{description}</p>
    </motion.div>

    <motion.div
      className="relative z-10 flex items-center justify-center"
      whileHover={{ scale: 1.3 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold shadow-lg">
        {index + 1}
      </div>
    </motion.div>

    <div className="flex-1" />
  </motion.div>
);

export const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "AI Course Generation",
      description:
        "Feed it any topic — instantly get a full multi-module course with lessons, quizzes, and summaries.",
    },
    {
      icon: Target,
      title: "Personalized Learning Paths",
      description:
        "Every learner gets a custom journey based on their goals, knowledge, and pace.",
    },
    {
      icon: Workflow,
      title: "Interactive Lessons",
      description:
        "Auto-generated lessons with summaries, examples, exercises, and quizzes to reinforce knowledge.",
    },
    {
      icon: BarChart,
      title: "Progress Tracking",
      description:
        "Track completion, comprehension, streaks, and overall learning insights.",
    },
    {
      icon: Bot,
      title: "AI Tutor Assistant",
      description:
        "Ask questions anytime — get explanations, expansions, or lesson rewrites instantly.",
    },
    {
      icon: Rocket,
      title: "Export & Share Courses",
      description:
        "Export courses to PDF or Markdown, or share them publicly with learners.",
    },
  ];

  const timelineSteps = [
    {
      title: "Enter a Topic",
      description:
        "Start with any subject, concept, or skill you want to learn.",
    },
    {
      title: "AI Builds the Course",
      description:
        "The system creates modules, lessons, quizzes, examples, and summaries.",
    },
    {
      title: "Learn Interactively",
      description:
        "Work through lessons, ask the AI tutor questions, and deepen understanding.",
    },
    {
      title: "Track Progress",
      description:
        "See analytics, completion stats, and learning improvements.",
    },
    {
      title: "Master the Topic",
      description: "Finish the course and export or share your results.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-200 via-white-50 to-stone-50 min-h-screen">
    
      <section className="pt-40 pb-20 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-7xl md:text-8xl font-bold mb-8 bg-slate-900 bg-clip-text text-transparent">
            Transform Your Learning
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg"
          >
            <p className="text-xl text-slate-700 leading-relaxed">
              <span className="font-semibold">AI-Generated Courses</span> with
              lessons, quizzes, and personalized learning paths. Learn any topic
              deeply with your built-in AI tutor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16 text-slate-800"
          >
            Powerful Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent"
        />
      </div>

      {/* TIMELINE */}
      <section className="py-20 px-8 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16 text-slate-800"
          >
            Your Learning Journey
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-12 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-400 via-slate-600 to-stone-600 opacity-30" />

            {timelineSteps.map((step, index) => (
              <TimelineItem
                key={index}
                {...step}
                index={index}
                position={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8">
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
            Build or learn any topic with AI-powered courses.
          </p>

          <NavLink to="/signup">
            <motion.button
              whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-12 py-5 text-xl font-semibold text-white bg-gradient-to-r from-slate-800 via-slate-700 to-stone-700 rounded-full shadow-lg hover:shadow-gray-500/30 transition-all duration-300 border border-gray-500/20"
            >
              Sign Up Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </NavLink>

          <p className="mt-6 text-slate-500">
            No credit card required • Start in seconds
          </p>
        </motion.div>
      </section>
    </div>
  );
};
