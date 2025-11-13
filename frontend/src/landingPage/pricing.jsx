import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { LogIn } from "./login";

export const Pricing = () => {
  const Card = ({ features, title, delay }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay }}
        viewport={{ once: true }}
        whileHover={{
          y: -8, 
          x: -2,
          boxShadow: "black", 
          transition: {duration: 0.2, ease: "easeOut"},
        }}
        className="relative group h-96 w-40"
      >
        <div className="relative overflow-hidden rounded-3xl shadow-xl h-full">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl border z-5 border-white/20 shadow-xl"></div>
          <div className="relative z-10 p-8 flex flex-col">
            <div className="">{title}</div>
            <div className="">
              {features.map((feature, index) => (
                <div className="" key={index}>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const pricingOps = [
    { price: "$10", features: ["Feature 1", "Feature 2"], title: "Basic" },
    { price: "$20", features: ["Feature 3", "Feature 4"], title: "Pro" },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-200 via-white-50 to-stone-50">
        {/* Hero Section */}
        <div className="flex  flex-col gap-4 items-center justify-center h-screen">
          <div className="flex gap-6">
            {pricingOps.map((option, index) => (
              <Card
                key={index}
                price={option.price}
                features={option.features}
                title={option.title}
                delay={index * 0.2}
              />
            ))}
          </div>
          <NavLink
            to="/login"
            className="border-2 p-4 rounded-lg border-red-300 bg-orange-600 text-white"
          >
            Sign Up Now
          </NavLink>
        </div>
      </div>
      <div></div>
    </>
  );
};
