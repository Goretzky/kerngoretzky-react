// src/components/Hero/Hero.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const Hero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

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
      const maxOpacity = 0.75;      // Max out at 92% opacity on full scroll
      
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

      {/* Hero content - always on top */}
      <motion.div
        className="relative text-center px-6 pt-20 md:pt-0"
        style={{ zIndex: 3 }}
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.729, ease: "easeOut" }}
      >
        <h1 className="hero-title font-extrabold tracking-tight leading-[0.95] big-shoulders-hero">
          KERN GORETZKY
        </h1>

        <motion.p
          className="hero-subtitle mt-6 text-gray-100 max-w-3xl mx-auto"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.81, delay: 0.2025 }}
        >
          Building sleek, modern websites & immersive digital experiences.
        </motion.p>

        <div className="mt-10 flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          <motion.a
            href="#about"
            className="glass-button relative px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold text-white rounded-full overflow-hidden block"
            initial={{
              opacity: 0,
              backdropFilter: 'blur(0px)',
              WebkitBackdropFilter: 'blur(0px)'
            } as any}
            animate={{
              opacity: 1,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            } as any}
            transition={{
              opacity: { duration: 0.648, delay: 0.3645, ease: "easeOut" },
              backdropFilter: { duration: 2.835, delay: 0.3645, ease: "easeOut" },
              WebkitBackdropFilter: { duration: 2.835, delay: 0.3645, ease: "easeOut" }
            } as any}
            whileHover={{ scale: 1.05 }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transition: 'background 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            }}
          >
            <span className="relative z-10">About Me</span>
            <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></span>
          </motion.a>
          <motion.a
            href="#projects"
            className="glass-button relative px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold text-white rounded-full overflow-hidden block"
            initial={{
              opacity: 0,
              backdropFilter: 'blur(0px)',
              WebkitBackdropFilter: 'blur(0px)'
            } as any}
            animate={{
              opacity: 1,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            } as any}
            transition={{
              opacity: { duration: 0.648, delay: 0.3645, ease: "easeOut" },
              backdropFilter: { duration: 2.835, delay: 0.3645, ease: "easeOut" },
              WebkitBackdropFilter: { duration: 2.835, delay: 0.3645, ease: "easeOut" }
            } as any}
            whileHover={{ scale: 1.05 }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transition: 'background 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            }}
          >
            <span className="relative z-10">View Projects</span>
            <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></span>
          </motion.a>
          <motion.a
            href="#courses"
            className="glass-button relative px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold text-white rounded-full overflow-hidden block"
            initial={{
              opacity: 0,
              backdropFilter: 'blur(0px)',
              WebkitBackdropFilter: 'blur(0px)'
            } as any}
            animate={{
              opacity: 1,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            } as any}
            transition={{
              opacity: { duration: 0.648, delay: 0.3645, ease: "easeOut" },
              backdropFilter: { duration: 2.835, delay: 0.3645, ease: "easeOut" },
              WebkitBackdropFilter: { duration: 2.835, delay: 0.3645, ease: "easeOut" }
            } as any}
            whileHover={{ scale: 1.05 }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transition: 'background 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            }}
          >
            <span className="relative z-10">Courses</span>
            <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></span>
          </motion.a>
          <motion.a
            href="#contact"
            className="glass-button relative px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold text-white rounded-full overflow-hidden block"
            initial={{
              opacity: 0,
              backdropFilter: 'blur(0px)',
              WebkitBackdropFilter: 'blur(0px)'
            } as any}
            animate={{
              opacity: 1,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            } as any}
            transition={{
              opacity: { duration: 0.648, delay: 0.3645, ease: "easeOut" },
              backdropFilter: { duration: 2.835, delay: 0.3645, ease: "easeOut" },
              WebkitBackdropFilter: { duration: 2.835, delay: 0.3645, ease: "easeOut" }
            } as any}
            whileHover={{ scale: 1.05 }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transition: 'background 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            }}
          >
            <span className="relative z-10">Get in Touch</span>
            <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
