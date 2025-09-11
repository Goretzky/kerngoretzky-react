// src/components/Hero/Hero.tsx
import React from "react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="hero bg-hero relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Overlay - ensure this is under the content */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h1 className="hero-title font-extrabold tracking-tight leading-[0.95] big-shoulders-hero">
          KERN GORETZKY
        </h1>

        <motion.p
          className="hero-subtitle mt-6 text-gray-200 max-w-3xl mx-auto"
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
