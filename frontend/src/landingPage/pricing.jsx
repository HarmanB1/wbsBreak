import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { Check, Zap, Star, Sparkles } from "lucide-react";

//fix animation inconcistincecy
export const Pricing = () => {
  const PricingCard = ({
    features,
    title,
    price,
    description,
    popular,
    delay,
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        whileHover={{ y: -10, transition: { duration: 0.2 } }}
        className="relative group"
      >
        {popular && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="flex items-center gap-1 px-4 py-1 bg-slate-800 text-white rounded-full text-sm font-bold shadow-lg">
              <Star className="w-3 h-3 fill-white" />
              Most Popular
            </div>
          </motion.div>
        )}

        <div
          className={`relative overflow-hidden rounded-3xl shadow-2xl h-full ${
            popular ? "ring-2 ring-slate-800" : ""
          }`}
        >
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border border-gray-200"></div>

          <div className="relative z-10 p-8 flex flex-col h-full">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {title}
              </h3>
              <p className="text-slate-600 text-sm">{description}</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-800">
                  ${price}
                </span>
                <span className="text-slate-600">/month</span>
              </div>
            </div>

            <div className="flex-1 mb-8">
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: delay + 0.1 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <NavLink to="/signup" className="w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 rounded-full font-semibold transition-all ${
                  popular
                    ? "bg-gradient-to-r from-slate-800 via-slate-700 to-stone-700 text-white shadow-lg"
                    : "bg-white/60 backdrop-blur-sm border border-gray-300 text-slate-800 hover:bg-white/80"
                }`}
              >
                Get Started
              </motion.button>
            </NavLink>
          </div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-stone-500/5 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    );
  };


  const pricingOptions = [
    {
      title: "Starter",
      price: "0",
      description: "Perfect for learning and testing course generation",
      popular: false,
      features: [
        "Generate up to 3 AI-built courses",
        "AI-generated lessons & modules",
        "Basic progress tracking",
        "Store up to 10 saved topics",
        "Community support",
      ],
    },
    {
      title: "Pro",
      price: "29",
      description: "For creators who want deep, advanced AI courses",
      popular: true,
      features: [
        "Unlimited AI-generated courses",
        "Deep multi-module course creation",
        "Smart progress analytics",
        "AI assistant for revisions & expansions",
        "Export (PDF & Markdown)",
        "Priority support",
        "Custom course templates",
        "Upload your own materials (PDF/video)",
      ],
    },
    {
      title: "Enterprise",
      price: "99",
      description: "For teams, schools, and organizations",
      popular: false,
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Shared course libraries",
        "LMS integration (SCORM, Canvas, Moodle)",
        "Student analytics dashboard",
        "Custom AI tuning",
        "Dedicated account manager",
        "On-prem or private cloud option",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-white-50 to-stone-50">
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-8">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full text-sm font-semibold text-slate-700 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Simple, transparent pricing
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-slate-800">
            Choose Your Plan
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed">
            Start free, upgrade when you need more power. No hidden fees, cancel
            anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pricingOptions.map((option, index) => (
            <PricingCard key={index} {...option} delay={index * 0.1} />
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  Can I change plans later?
                </h3>
                <p className="text-slate-600">
                  Yes! You can upgrade or downgrade at any time. Changes take
                  effect immediately.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-slate-600">
                  We accept all major credit cards, PayPal, and offer invoicing
                  for Enterprise customers.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-slate-600">
                  The Starter plan is free forever! Pro & Enterprise include a
                  14-day free trial.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  What if I need a custom solution?
                </h3>
                <p className="text-slate-600">
                  Contact our team for custom AI training & Enterprise
                  deployments.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 bg-white/30 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <Zap className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4 text-slate-800">
            Ready to build amazing courses?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Join thousands of learners and creators building knowledge with AI.
          </p>

          <NavLink to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-slate-800 via-slate-700 to-stone-700 text-white rounded-full font-bold text-lg shadow-lg"
            >
              Start Free Today
            </motion.button>
          </NavLink>

          <p className="mt-4 text-sm text-slate-500">
            No credit card required • Cancel anytime
          </p>
        </motion.div>
      </section>
    </div>
  );
};
