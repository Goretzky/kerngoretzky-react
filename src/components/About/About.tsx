/**
 * About section component with 3D slide-in animations.
 * Uses Framer Motion to create engaging entrance animations:
 * - Header and content card slide in from the right
 * - Elements rotate in 3D space while entering
 * - Smooth fade-in effect combines with motion
 * 
 * Animations match the Projects section exactly:
 * - 90-degree initial rotation
 * - 1.8s duration for smooth motion
 * - Custom easing curve for natural movement
 * - Contained within a max-width card layout
 */

import { motion } from "framer-motion";
import React from "react";

// Animation Parameters
// Matches Projects section exactly for visual consistency
const ROTATION_ANGLE = 90;      // Initial rotation in degrees (90° rotation around Y axis)
const SLIDE_DISTANCE = 100;     // Distance of horizontal slide-in motion (pixels)
const ANIMATION_DURATION = 1.8;  // Total animation time in seconds (matches Projects)
const EASE = [0.11, 0, 0.5, 0] as const; // Custom bezier curve for smooth motion

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="about py-16 px-4"
      style={{
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <div className="max-w-6xl mx-auto" style={{ perspective: "2000px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: SLIDE_DISTANCE, rotateY: ROTATION_ANGLE }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: ANIMATION_DURATION, ease: EASE }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ transformStyle: "preserve-3d" }}
          className="mb-12 px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md text-center">
            About Me
          </h2>
        </motion.div>

        {/* Content Card - Using same width as a single project card */}
        <motion.div
          initial={{ opacity: 0, x: SLIDE_DISTANCE, rotateY: ROTATION_ANGLE }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: ANIMATION_DURATION, ease: EASE }}
          viewport={{ once: true, margin: "-100px" }}
          style={{
            transformStyle: "preserve-3d",
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="glass-card p-8 rounded-xl max-w-md mx-auto"
        >
          <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></span>
          <div className="space-y-6 relative z-10">
            <p className="text-gray-200 leading-relaxed">
              Hi, I'm Kern Goretzky — a developer with<br /> 
              a background in broadcasting, media, and<br />
              technology. I enjoy building engaging,<br /> 
              user-friendly websites and apps that <br />
              bring ideas to life.
            </p>

            <p className="text-gray-300 leading-relaxed">
              When I'm not coding, I'm spending time<br /> 
              exploring new ways technology can shape<br /> 
              storytelling, creativity, and business.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
