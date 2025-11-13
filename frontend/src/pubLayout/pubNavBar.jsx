import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export const PubNavBar = () => {
  const [vis, setVis] = useState(true);
  const scrollLoc = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const mouseTop = useRef(false);
  const ticking = useRef(false);

  const MOUSE_TOP = 80;
  const SCROLL_THRESHOLD = 5;

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currScroll = window.scrollY;
        const diffScroll = currScroll - scrollLoc.current;

        if (diffScroll > SCROLL_THRESHOLD && !mouseTop.current) {
          setVis(false);
        } else if (diffScroll < -SCROLL_THRESHOLD) {
          setVis(true);
        }
        scrollLoc.current = currScroll;
        ticking.current = false;
      });
    };

    const onMouseMove = (e) => {
      const nearTop = e.clientY < MOUSE_TOP;
      mouseTop.current = nearTop;

      if (nearTop) {
        setVis(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const navItems = [
    { name: "home", link: "/" },
    { name: "features", link: "/features" },
    { name: "pricing", link: "/pricing" },
  ];

  return (
    <motion.nav
      className="fixed p-8 flex text-2xl z-50 "
      initial={{ y: 0 }}
      animate={{ y: vis ? 0 : -200 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
    >
      <div className="flex space-x-8 w-fit border-2 border-white/20 h-16 shadow-2xl items-center bg-gray-50/30 m-0 rounded-full p-3 backdrop-blur-lg bg-opacity-30">
        <div className="px-4 font-semibold text-gray-700">LOGO</div>
        <ul className="flex space-x-2 h-16 items-center relative">
          {navItems.map((link, index) => (
            <NavLink
              key={link.name}
              to={link.link}
              className={({ isActive }) =>
                `relative h-12 flex items-center px-6 rounded-3xl transition-all duration-300 ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-500"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <motion.span
                    className="relative z-10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {link.name}
                  </motion.span>

                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-white/40 rounded-3xl border border-white/30 shadow-lg"
                      layoutId="activeNav"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="flex space-x-4 items-center px-8  border-gray-300/50 h-full">
        <NavLink to="/signin">
          <motion.div
            className="px-6 py-2 rounded-full text-gray-700 h-full bg-gray-600 hover:text-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Sign In
          </motion.div>
        </NavLink>
        <NavLink to="/signup">
          <motion.div
            className="px-6 py-2 bg-white/40 text-gray-700 rounded-full hover:bg-white/60 transition-colors border border-white/30"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Sign Up
          </motion.div>
        </NavLink>
      </div>
    </motion.nav>
  );
};
