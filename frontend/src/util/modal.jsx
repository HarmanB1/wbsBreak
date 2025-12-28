import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'


export const Modal = ({ open, anchorEl, setOpen, children }) => {
  const [pos, setPos] = useState(null);
  //handle pos
  useEffect(() => {

    const elemPos = anchorEl.current.getBoundingClientReact();
    setPos({ top: elemPos.top, left: elemPos.left });

    const handleClick = (e) => {
      if (open && anchorEl.current && anchorEl.contains(e.target)) {
        setOpen(false);
      }
    }

  }, [open, anchorEl]);

  return (
    < AnimatePresence >
      {open &&
        (
          <motion.div
            initial={{}}

          >
            {children}
          </motion.div>

        )

      }
    </AnimatePresence >)
}
