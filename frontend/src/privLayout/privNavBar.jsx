import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {User} from "lucide-react";

export const PrivNavBar= () => {
  const [vis, setVis] = useState(true);
  const scrollLoc = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const mouseTop = useRef(false);
  const ticking = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropRef = useRef(null);

  const MOUSE_TOP = 80;
  const SCROLL_THRESHOLD = 5;

  //close when 
  useEffect(()=>{
    const handleClick=()=>{
      if(dropRef.current && !dropRef.current.contains(e.target)){
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown",handleClick);
    return() =>{
      document.removeEventListener("mousedown",handleClick);
    }
  },[])

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

    const onMouseMove = () => {
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
    { name: "Dash", link: "/app" },
    { name: "Projects", link: "/app/projects" },
    { name: "Workspace", link: "/app/workspace" },
  ];

  const profItems = [
    {name:"Settings", link: "/settings"},
    {name: "Help/?", link: "/Help"},
    {name: "Log Out", link: "end"}
  ]

  return (
    <motion.nav
      className="fixed w-full p-8 flex justify-between items-center text-2xl z-50"
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

      <div ref={dropRef} className="flex items-center border-2 rounded-full justify-center ">
        <button onClick={()=>{setIsOpen(!isOpen)}}>
          <motion.div
            className="flex justify-center items-center gap-2 px-5 py-2.5 rounded-full text-gray-700 bg-white/40 backdrop-blur-sm border border-white/30 hover:bg-white/60 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <User/>
          </motion.div>
        </button>
        {isOpen && (
          
            profItems.map((item, index)=>(
              <div key={index}>
                <NavLink to={item.name}>{item.link}</NavLink>
              </div>
            ))
          
        )}

              </div>
    </motion.nav>
  );
};
