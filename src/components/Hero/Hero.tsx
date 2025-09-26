// src/components/Hero/Hero.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  // Reference to the hero section for measuring scroll position
  const heroRef = useRef<HTMLElement | null>(null);
  
  // State to track scroll progress (0 to 1)
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll events and update overlay opacity
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const heroHeight = heroRef.current.offsetHeight;
      const scrolled = window.scrollY;
      
      // Calculate how far we've scrolled through the hero section
      // Using 80% of hero height makes the fade complete before reaching the bottom
      const fadeDistance = heroHeight * 0.8;
      
      // *** INITIAL OPACITY CONTROL ***
      // This is where you control the initial and final opacity
      const initialOpacity = 0.25;   // Start at 25% opacity
      const maxOpacity = 0.92;      // Max out at 92% opacity on full scroll
      
      // Start with initial opacity and increase based on scroll
      const scrollFactor = Math.min(Math.max(scrolled / fadeDistance, 0), 1);
      // Interpolate between initial and max opacity based on scroll position
      const progress = initialOpacity + (scrollFactor * (maxOpacity - initialOpacity));
      
      setScrollProgress(progress);
    };

    // Set initial opacity when component mounts
    handleScroll();
    
    // Update opacity on scroll
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Responsive background image sources for different screen sizes
  const sources = {
    default: "/images/hero-1920.jpg",
    xl: "/images/hero-1440.jpg",
    lg: "/images/hero-1024.jpg",
    md: "/images/hero-768.jpg",
    sm: "/images/hero-480.jpg",
  };

  // Select appropriate image size based on viewport width
  const getHeroImage = () => {
    if (typeof window === "undefined") return sources.default;
    const w = window.innerWidth;
    if (w >= 1920) return sources.default;
    if (w >= 1440) return sources.xl;
    if (w >= 1024) return sources.lg;
    if (w >= 768) return sources.md;
    return sources.sm;
  };

  // Handle responsive image switching
  const [bgImage, setBgImage] = React.useState(sources.default);
  useEffect(() => {
    setBgImage(getHeroImage());
    const handleResize = () => setBgImage(getHeroImage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center"
      style={{
        padding: 0,
        margin: 0
      }}
    >
      {/* Fixed container - keeps background and overlay fixed while page scrolls */}
      <div 
        className="fixed left-0 top-0"
        style={{
          width: '100vw',
          height: '100vh'
        }}
      >
        {/* Background image - Base layer (z-index managed by DOM order) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Fade overlay - Sits between background image and content
            - opacity controlled by scroll position
            - starts at initialOpacity (set in useEffect above)
            - increases opacity as page scrolls */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#111827', // Same as site background color
            opacity: scrollProgress,    // Controlled by scroll position
            pointerEvents: 'none'       // Allows clicking through to content
          }}
        />
      </div>

      {/* Debug overlay - uncomment to see scroll progress
      <div 
        className="fixed top-4 right-4 bg-black text-white p-2 rounded shadow-lg"
        style={{ zIndex: 9999 }}
      >
        Scroll: {Math.round(scrollProgress * 100)}%
      </div>
      */}

      {/* Hero content - always on top */}
      <motion.div
        className="relative text-center px-6"
        style={{ zIndex: 3 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h1 className="hero-title font-extrabold tracking-tight leading-[0.95] big-shoulders-hero">
          KERN GORETZKY
        </h1>

        <motion.p
          className="hero-subtitle mt-6 text-gray-100 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.25 }}
        >
          Building sleek, modern websites & immersive digital experiences.
        </motion.p>

        <motion.div
          className="mt-10 flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.45 }}
        >
          <a
            href="#projects"
            className="px-8 py-4 text-lg font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-4 text-lg font-semibold border-2 border-white rounded-full hover:bg-white/10 transition"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
