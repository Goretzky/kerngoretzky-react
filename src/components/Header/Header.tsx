import React, { useEffect, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      // Respect reduced motion preference
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    }
  };

  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-white focus:bg-[#32C4C4]"
        onClick={(e) => handleSmoothScroll(e, "about")}
      >
        Skip to main content
      </a>

      <header
        className="fixed w-full z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
          boxShadow: scrolled ? '0 4px 16px rgba(0, 0, 0, 0.1)' : 'none'
        }}
      >
        <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4" aria-label="Main navigation">
        <a
          href="#hero"
          onClick={(e) => handleSmoothScroll(e, "hero")}
          className="text-2xl font-bold text-white hover:text-[#32C4C4] transition-colors duration-300"
          style={{ fontFamily: "'Big Shoulders', sans-serif" }}
        >
          KERN GORETZKY
        </a>
        <ul className="flex space-x-8">
          <li>
            <a
              href="#about"
              onClick={(e) => handleSmoothScroll(e, "about")}
              className="text-white hover:text-[#32C4C4] transition-colors duration-300 font-medium"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#projects"
              onClick={(e) => handleSmoothScroll(e, "projects")}
              className="text-white hover:text-[#32C4C4] transition-colors duration-300 font-medium"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#courses"
              onClick={(e) => handleSmoothScroll(e, "courses")}
              className="text-white hover:text-[#32C4C4] transition-colors duration-300 font-medium"
            >
              Courses
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "contact")}
              className="text-white hover:text-[#32C4C4] transition-colors duration-300 font-medium"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
    </>
  );
};

export default Header;
