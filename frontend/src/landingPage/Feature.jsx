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

// Animation Variants (Cleaner way to manage animations)
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const FeatureCard = ({ title, description, icon: Icon, delay }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }} // Fix: Ensures animation triggers properly
    variants={{
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: delay },
      },
    }}
    className="group h-full"
  >
    <div className="relative overflow-hidden rounded-3xl shadow-lg border border-slate-100 bg-white h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative z-10 flex flex-col p-8 h-full">
        <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-100 transition-colors">
          <Icon className="w-7 h-7 text-slate-700" />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-slate-900">{title}</h3>
        <p className="text-slate-600 leading-relaxed flex-grow">
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

const TimelineItem = ({ title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true, margin: "-50px" }}
    className={`flex flex-col md:flex-row items-center gap-8 ${
      index % 2 !== 0 ? "md:flex-row-reverse" : ""
    }`}
  >
    {/* Text Side */}
    <div
      className={`flex-1 w-full ${
        index % 2 !== 0 ? "md:text-left" : "md:text-right"
      }`}
    >
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
        <h4 className="text-xl font-bold mb-2 text-slate-900">{title}</h4>
        <p className="text-slate-600">{description}</p>
      </div>
    </div>

    {/* Number Bubble */}
    <div className="relative z-10 flex-none">
      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-lg shadow-xl ring-4 ring-slate-50">
        {index + 1}
      </div>
    </div>

    {/* Empty Spacer for Desktop Layout */}
    <div className="hidden md:block flex-1" />
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
      title: "Personalized Paths",
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
      title: "Export & Share",
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
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-slate-200">
      {/* HEADER */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* FIXED: Removed transparent text class so title is visible */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-8 text-slate-900 tracking-tight"
          >
            Transform Your <br className="hidden md:block" />
            <span className="text-slate-500">Learning Experience</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xl text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-900">
                AI-Generated Courses
              </span>{" "}
              with lessons, quizzes, and personalized learning paths. Learn any
              topic deeply with your built-in AI tutor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 px-6 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-slate-500 text-lg">
              Everything you need to learn faster.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Your Learning Journey
            </h2>
            <p className="text-slate-500 text-lg">
              From curiosity to mastery in minutes.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12 relative">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -z-10 md:-ml-px" />

            {timelineSteps.map((step, index) => (
              <TimelineItem key={index} {...step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-slate-900 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Ready to Get Started?
          </h2>

          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Build or learn any topic with AI-powered courses today.
          </p>

          <NavLink to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 text-lg font-bold text-slate-900 bg-white rounded-full shadow-lg hover:bg-slate-100 transition-all duration-300"
            >
              Sign Up Free
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </NavLink>

          <p className="mt-8 text-slate-500 text-sm font-medium">
            No credit card required • Start in seconds
          </p>
        </motion.div>
      </section>
    </div>
  );
};
