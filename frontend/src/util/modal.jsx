import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'


export const Modal = ({ open, anchorEl, setOpen, children }) => {
  const [pos, setPos] = useState(null);
  //handle pos
  useEffect(() => {
    if (anchorEl.current && open) {
      const elemPos = anchorEl.current.getBoundingClientReact();
      setPos({ top: elemPos.top, left: elemPos.left });
    }
    const handleClick = (e) => {
      if (open && anchorEl.current && anchorEl.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    }

  }, [open, anchorEl, setOpen]);

  return (
    < AnimatePresence >
      {open &&
        (
          <motion.div
            initial={{ opacity: 0, scale: 0.90 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              top: pos.top,
              left: pos.left
            }}
            className="bg-slate-600"

          >
            {children}
          </motion.div>

        )

      }
    </AnimatePresence >)
}
