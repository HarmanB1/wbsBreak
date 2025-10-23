import { motion } from "framer-motion";
import { NavLink } from "react-router";


export const Landing = () => {
  return (
    <>
      <div className="min-h-screen bg-orange-50 text-orange-700">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center h-screen ">
          <h2 className="text-8xl font-extrabold mb-4">FREE</h2>
          <p className="text-xl text-orange-600 mb-8 text-center max-w-xl">
            Get started instantly! No credit card required.
          </p>

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
