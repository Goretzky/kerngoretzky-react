import React, { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

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
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
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
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
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
  );
};

export default Header;
