import { NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

export const ProjectInNav = ({ open, setOpen }) => {

  // Define links with display labels and actual paths
  const links = [
    { id: "breakdown", label: "WBS Breakdown" },
    { id: "timeline", label: "Timeline" },
    { id: "context", label: "Context & Notes" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            className="fixed left-4 top-4 h-[95vh] w-72 z-20 flex flex-col rounded-3xl border border-white/40 bg-white/60 shadow-2xl backdrop-blur-xl overflow-hidden"
            initial={{ x: -350, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 300, damping: 30 }
            }}
            exit={{
              x: -350,
              opacity: 0,
              transition: { duration: 0.2 }
            }}
          >


            {/* --- TOP SECTION --- */}
            <div className="p-6 pb-2">
              <div className="flex items-center justify-between mb-6">

                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-full hover:bg-black/10 transition-colors"
                >
                  {//raplce with svg icon
                  }

                  x
                </button>
              </div>

              <div className="w-full flex items-center justify-center">
                <div>
                  menu

                </div>

              </div>


              {/* Quick Search */}
              <input className="text-md mt-6 border border-gray-400/20 px-1 rounded cursor-pointer w-full hover:bg-gray-100/90 transition-colors "
                type="text"
                placeholder="Quick search ..."

              />


              <div className="w-full border border-gray-100/50 mt-6" />
            </div>


            <div className="flex-1 px-4 flex flex-col gap-2">
              {links.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.id}
                  className="relative px-4 py-3 text-sm font-medium text-gray-600 transition-colors duration-200 outline-none hover:text-black hover:scale-105 duration-100"
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 rounded-xl bg-white shadow-sm border border-black/5"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}

                      <span className={`relative z-10 flex items-center gap-3 ${isActive ? "text-black font-semibold" : ""}`}>
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <div>go back </div>
            <div className="p-6 mt-auto bg-white/30 border-t border-white/40">

              {/* AI Credits Widget */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                  <span>AI Credits</span>
                  <span>85%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-black  w-[85%]" />
                </div>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-3 pt-4 border-t border-black/5 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="h-8 w-8 rounded-full bg-gray-100 shadow-inner" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">Jane Doe</span>
                  <span className="text-xs text-gray-500">Pro Plan</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence >
    </>
  );
};
