"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Portal from "../Portal";
import React from "react";
import { TiTimesOutline } from "react-icons/ti";
import { LuMessageSquareText } from "react-icons/lu";
import Tooltip from "../Tooltip";
import HelpForm from "./HelpForm";
import { RiCloseCircleLine } from "react-icons/ri";

export default function StickyWidgetForm() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContainer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Portal>
      <div className="fixed bottom-5 right-5 z-[999999] flex flex-col items-end gap-3 md:right-10">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="relative z-10 w-[90vw] max-w-md overflow-y-auto rounded-2xl border border-bg1 bg-white shadow-2xl max-sm:-mb-16 md:max-h-[31rem] md:w-96"
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <button
                onClick={toggleContainer}
                className="absolute right-2 top-2 text-2xl text-red-500 transition-all duration-300 hover:scale-105"
              >
                <RiCloseCircleLine />
              </button>
              <HelpForm />
            </motion.div>
          )}
        </AnimatePresence>
        <Tooltip content="Need Help? Ask to Experts" direction="left">
          <AnimatedButton onClick={toggleContainer} />
        </Tooltip>
      </div>
    </Portal>
  );
}

function AnimatedButton({ onClick }: { onClick: any }) {
  const [icon, setIcon] = useState("CLOSE");

  const handleClick = () => {
    setIcon((prev) => (prev === "OPEN" ? "CLOSE" : "OPEN"));
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center rounded-full border border-white bg-bg1/90 p-3 text-xl text-white shadow-lg hover:bg-bg1"
    >
      <motion.div
        animate={{ rotate: icon === "CLOSE" ? 0 : 180 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
      >
        {icon === "OPEN" ? (
          <motion.span
            key="OPEN"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TiTimesOutline />
          </motion.span>
        ) : (
          <motion.span
            key="CLOSE"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LuMessageSquareText />
          </motion.span>
        )}
      </motion.div>
    </button>
  );
}
