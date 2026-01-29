import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Layout,
  Calendar,
  FileText,
  Settings,
  ChevronLeft,
  User,
  Zap
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-40"
          />

          {/* Sidebar Container */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed left-4 top-4 bottom-4 w-72 z-50 flex flex-col rounded-[2.5rem] border border-white/40 bg-white/70 shadow-2xl backdrop-blur-2xl overflow-hidden"
          >
            {/* --- HEADER --- */}
            <div className="p-8 pb-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Project</span>
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight">Navigation</h2>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full bg-slate-100/50 hover:bg-white text-slate-500 transition-all shadow-sm border border-slate-200/50"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Search Pill */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-800 transition-colors" size={15} />
                <input
                  className="w-full bg-white/40 border border-slate-200/60 pl-11 pr-4 py-2.5 rounded-2xl text-sm outline-none focus:bg-white focus:ring-4 focus:ring-slate-900/5 transition-all placeholder:text-slate-400"
                  type="text"
                  placeholder="Find something..."
                />
              </div>
            </div>

            {/* --- NAVIGATION --- */}
            <div className="flex-1 px-4 mt-4 flex flex-col gap-1.5 overflow-y-auto">
              {links.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.id}
                  onClick={() => setOpen(false)}
                  className="relative px-5 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300"
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="active-pill-sidebar"
                          className="absolute inset-0 rounded-2xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-slate-100"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className={`relative z-10 flex items-center gap-3 transition-colors duration-300 ${isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-800"}`}>
                        <item.icon size={18} strokeWidth={isActive ? 2.2 : 2} />
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* --- FOOTER SECTION --- */}
            <div className="mt-auto bg-slate-50/50 border-t border-white/60 p-6">
              {/* AI Credits Mini-Card */}
              <div className="mb-6 p-4 rounded-[1.5rem] bg-white/60 border border-white shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={14} className="text-slate-800 fill-slate-800" />
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">AI Capacity</span>
                  <span className="ml-auto text-[11px] font-bold text-slate-900">85%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden px-[2px] flex items-center">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    className="h-[3px] bg-slate-800 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)]"
                  />
                </div>
              </div>

              {/* User + Dashboard Link */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-white shadow-lg shadow-slate-200">
                    <User size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">Jane Doe</span>
                    <NavLink to="/app/projects" className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-tighter transition-colors">
                      Exit Project
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
