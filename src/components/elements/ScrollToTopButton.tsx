"use client";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className="bg-bg1 fixed bottom-20 right-5 z-[999999] rounded-full bg-opacity-80 p-3 duration-300 hover:bg-opacity-100 md:bottom-5 md:right-10"
      onClick={scrollToTop}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTopButton;
