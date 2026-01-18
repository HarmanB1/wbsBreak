import React from "react";
import { NavLink } from "react-router-dom"; // changed from "react-router" to standard "react-router-dom"
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Layout,
  Calendar,
  FileText,
  Settings,
  ChevronLeft,
  User
} from "lucide-react";

export const ProjectInNav = ({ open, setOpen }) => {

  const links = [
    { id: "breakdown", label: "WBS Breakdown", icon: Layout },
    { id: "timeline", label: "Timeline", icon: Calendar },
    { id: "context", label: "Context & Notes", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <AnimatePresence mode="wait">
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10"
          />

          <motion.div
            className="fixed left-4 top-4 bottom-4 w-72 z-20 flex flex-col rounded-3xl border border-white/60 bg-white/70 shadow-2xl backdrop-blur-xl overflow-hidden"
            initial={{ x: -350, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 300, damping: 30 }
            }}
            exit={{
              x: -350,
              opacity: 0,
              transition: { duration: 0.2, ease: "easeInOut" }
            }}
          >

            {/* --- TOP SECTION --- */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800 tracking-tight">
                  Project Menu
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-200/50 text-gray-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Quick Search */}
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={16} />
                <input
                  className="w-full bg-white/50 border border-gray-200 pl-10 pr-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all placeholder:text-gray-400"
                  type="text"
                  placeholder="Quick search..."
                />
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-2" />

            {/* --- LINKS SECTION --- */}
            <div className="flex-1 px-3 flex flex-col gap-1 overflow-y-auto">
              {links.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.id}
                  onClick={() => setOpen(false)} // Close menu on navigation
                  className="relative px-4 py-3 rounded-xl text-sm font-medium text-gray-500 transition-all duration-200 outline-none hover:text-gray-900 group"
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}

                      <span className={`relative z-10 flex items-center gap-3 ${isActive ? "text-gray-900" : "group-hover:translate-x-1 transition-transform"}`}>
                        <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* --- FOOTER SECTION --- */}
            <div className="mt-auto bg-white/40 border-t border-white/60 p-5">

              {/* Go Back Link */}
              <NavLink
                to="/app/projects"
                className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gray-700 mb-6 transition-colors pl-1"
              >
                <ChevronLeft size={14} />
                Back to Dashboard
              </NavLink>

              {/* AI Credits Widget */}
              <div className="mb-5 bg-white/50 p-3 rounded-lg border border-white/60 shadow-sm">
                <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1.5">
                  <span>AI Credits</span>
                  <span>85%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="h-full bg-gradient-to-r from-gray-700 to-black rounded-full"
                  />
                </div>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-3 pt-2 cursor-pointer group">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-gray-200 to-white border border-white shadow-sm flex items-center justify-center text-gray-400">
                  <User size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800 group-hover:text-black transition-colors">Jane Doe</span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">Pro Plan</span>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
