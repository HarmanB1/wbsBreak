import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, HelpCircle, LogOut, ChevronDown } from "lucide-react";

export const PrivNavBar = () => {
  const [vis, setVis] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const scrollLoc = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const mouseTop = useRef(false);
  const ticking = useRef(false);
  const dropRef = useRef(null);

  const MOUSE_TOP = 60;
  const SCROLL_THRESHOLD = 10;

  useEffect(() => {
    const handleClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currScroll = window.scrollY;
        const diffScroll = currScroll - scrollLoc.current;

        if (diffScroll > SCROLL_THRESHOLD && !mouseTop.current) {
          setVis(false);
          setIsOpen(false); // Close dropdown on scroll
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
      if (nearTop) setVis(true);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const navItems = [
    { name: "Dashboard", link: "/app" },
    { name: "Projects", link: "/app/projects" },
    { name: "Workspace", link: "/app/workspace" },
  ];

  const profItems = [
    { name: "Settings", link: "/settings", icon: Settings },
    { name: "Help & FAQ", link: "/help", icon: HelpCircle },
    { name: "Log Out", link: "/logout", icon: LogOut, danger: true },
  ];

  return (
    <motion.nav
      className="fixed w-full px-10 py-6 flex justify-between items-center z-50 pointer-events-none"
      initial={{ y: 0 }}
      animate={{ y: vis ? 0 : -120 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* Left: Logo + Main Nav */}
      <div className="flex items-center gap-6 pointer-events-auto">
        <div className="flex items-center bg-white/70 backdrop-blur-md border border-white/40 shadow-sm rounded-full px-6 py-2">
          <Link to="/app" className="font-bold text-lg tracking-tighter mr-8 text-slate-800">
          COMPANY 
          </Link>

          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.link}
                className={({ isActive }) =>
                  `relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full ${isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-800"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-white shadow-sm border border-slate-100 rounded-full"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>

      {/* Right: Profile Dropdown */}
      <div className="relative pointer-events-auto" ref={dropRef}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 pl-2 pr-4 py-2 rounded-full border transition-all duration-200 ${isOpen
            ? "bg-white border-slate-200 shadow-md"
            : "bg-white/70 backdrop-blur-md border-white/40 shadow-sm hover:bg-white"
            }`}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white">
            <User size={16} />
          </div>
          <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-3 w-52 bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl p-2 overflow-hidden"
            >
              <div className="px-3 py-2 mb-1 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Account</p>
              </div>

              {profItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${item.danger
                    ? "text-red-500 hover:bg-red-50"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={16} />
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
