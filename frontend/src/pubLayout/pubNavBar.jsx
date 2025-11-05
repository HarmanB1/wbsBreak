import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {NavLink} from "react-router-dom";
import {motion} from 'framer-motion';

export const PubNavBar = () => {
  const[vis,setVis] = useState(true);
  const scrollLoc = useRef(typeof window !== "undefined"? window.scrollY : 0 ); 
  const mouseTop = useRef(false);
  const ticking= useRef(false);

  const MOUSE_TOP = 80;
  const SCROLL_THRESHOLD = 5;

  useEffect(() => {
    const handleScroll = () => {
      if(ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(()=>{
        const currScroll = window.scrollY;
        const diffScroll = currScroll - scrollLoc.current;

        if(diffScroll > SCROLL_THRESHOLD && !mouseTop.current){setVis(false);}

        else if(diffScroll < -SCROLL_THRESHOLD){
          setVis(true);
        }
        scrollLoc.current = currScroll;
        ticking.current = false;
      

    });};

    const onMouseMove= (e)=>{
      const nearTop = e.clientY < MOUSE_TOP;
      mouseTop.current = nearTop;

      if(nearTop){
        setVis(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", onMouseMove);

    return ()=>{
      window.removeEventListener("scroll",handleScroll);
      window.removeEventListener("mousemove",onMouseMove);
    };
  }, []);






  const navItems = [
    { name: "home", link: "/" },
    { name: "features", link: "/features" },
    { name: "pricing", link: "/pricing" },
  ];

  return (
    <motion.nav className="fixed p-8 text-2xl z-50"
    initial = {{y:0}}
    animate ={{y: vis? 0: -200}}
    transition={{
      type: "spring",
      stiffness:200,
      damping: 15,
    }} 
    >
      <div className="flex space-x-4 w-fit border-2 border-black shadow-2xl items-center bg-gray-100 m-0 rounded-full p-3 backdrop-blur-md bg-opacity-50">
        <div>LOGO</div>
        <ul className="flex space-x-4">
          {navItems.map((link) => (
            <NavLink className={({ isActive }) => isActive ? "text-blue-500 font-bold" : "text-black"}
             key={link.name} to= {link.link}>{link.name}</NavLink>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};
