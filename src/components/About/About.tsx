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

        {/* Content Card - Expanded with skills and education */}
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
          className="glass-card p-8 rounded-xl max-w-4xl mx-auto"
        >
          <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></span>
          <div className="space-y-8 relative z-10">
            {/* Bio */}
            <div>
              <p className="text-gray-200 leading-relaxed mb-4">
                Hi, I'm Kern Goretzky — a full-stack web developer specializing in React, Angular, and Node.js.
                With a background in broadcasting, media, and technology, I bring a unique perspective to building
                engaging, user-friendly websites and applications.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I'm passionate about creating modern web experiences that combine clean design with powerful functionality.
                When I'm not coding, I'm exploring new ways technology can shape storytelling, creativity, and business.
              </p>
            </div>

            {/* Skills Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Technical Skills</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-[#32C4C4] mb-2">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Angular", "TypeScript", "JavaScript", "HTML5", "CSS", "Tailwind", "Bootstrap"].map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium rounded-full"
                        style={{
                          background: 'rgba(50, 196, 196, 0.2)',
                          border: '1px solid rgba(50, 196, 196, 0.4)',
                          color: '#32C4C4'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#32C4C4] mb-2">Backend & Cloud</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Express", "MongoDB", "AWS", "Vercel", "Git/GitHub"].map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium rounded-full"
                        style={{
                          background: 'rgba(50, 196, 196, 0.2)',
                          border: '1px solid rgba(50, 196, 196, 0.4)',
                          color: '#32C4C4'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Education</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-md font-medium text-gray-200">MBA in Finance</h4>
                  <p className="text-sm text-gray-400">Heriot-Watt University</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-200">Radio & Television Arts</h4>
                  <p className="text-sm text-gray-400">Toronto Metropolitan University</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-200">English Major</h4>
                  <p className="text-sm text-gray-400">University of Alberta</p>
                </div>
              </div>
            </div>

            {/* Download Resume Button */}
            <div className="pt-4">
              <a
                href="#" // TODO: Add resume PDF link
                download
                className="inline-block px-6 py-3 font-semibold rounded-full transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                Download Resume →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
