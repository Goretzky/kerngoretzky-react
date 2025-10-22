/**
 * About section component with 2D slide-in animations.
 * Uses Framer Motion to create engaging entrance animations:
 * - Header and content card slide in from the right
 * - Smooth fade-in effect combines with motion
 *
 * Animations match the Projects section for consistency:
 * - Horizontal slide with opacity fade
 * - 0.6s duration for smooth motion
 * - Custom easing curve for natural movement
 * - Contained within a max-width card layout
 */

import { motion } from "framer-motion";
import React from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useLowPowerDevice } from "../../hooks/useLowPowerDevice";

// Animation Parameters
const SLIDE_DISTANCE = 100;     // Distance of horizontal slide-in motion (pixels)
const ANIMATION_DURATION = 0.6;  // Total animation time in seconds
const EASE = [0.11, 0, 0.5, 0] as const; // Custom bezier curve for smooth motion

const About: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const isLowPowerDevice = useLowPowerDevice();
  const disableAnimations = prefersReducedMotion || isLowPowerDevice;

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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={disableAnimations ? { opacity: 1 } : { opacity: 0, x: SLIDE_DISTANCE }}
          whileInView={disableAnimations ? { opacity: 1 } : { opacity: 1, x: 0 }}
          transition={disableAnimations ? { duration: 0 } : { duration: ANIMATION_DURATION, ease: EASE }}
          viewport={{ once: true, margin: "0px" }}
          className="mb-12 px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md text-center">
            About Me
          </h2>
        </motion.div>

        {/* Content Card - Expanded with skills and education */}
        <motion.div
          initial={disableAnimations ? { opacity: 1 } : { opacity: 0, x: SLIDE_DISTANCE }}
          whileInView={disableAnimations ? { opacity: 1 } : { opacity: 1, x: 0 }}
          transition={disableAnimations ? { duration: 0 } : { duration: ANIMATION_DURATION, ease: EASE, delay: 0.1 }}
          viewport={{ once: true, margin: "0px" }}
          style={{
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
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm passionate about creating modern web experiences that combine clean design with powerful functionality.
                When I'm not coding, I'm exploring new ways technology can shape storytelling, creativity, and business.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I actively leverage AI-powered development tools including Claude Code and GitHub Copilot, using prompt engineering
                techniques to accelerate development workflows and maintain code quality.
              </p>
            </div>

            {/* Skills Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Technical Skills</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-[#32C4C4] mb-2">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "Angular", "TypeScript", "JavaScript", "HTML5", "CSS", "Tailwind", "Bootstrap"].map((skill, index) => (
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
                    {["Node.js", "Express", "MongoDB", "AWS", "Vercel", "Git/GitHub", "CI/CD", "GitHub Actions"].map((skill, index) => (
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
                href="/KERN_GORETZKY_RESUME.pdf"
                download
                className="inline-block px-6 py-3 font-semibold rounded-full transition-all duration-[197ms]"
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

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 pt-6 border-t border-white/10">
              <span className="text-sm text-gray-300">Connect with me:</span>
              <a
                href="https://github.com/Goretzky"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#32C4C4] transition-colors duration-[131ms]"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/goretzky/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#32C4C4] transition-colors duration-[131ms]"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://bsky.app/profile/kerngoretzky.bsky.social"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#32C4C4] transition-colors duration-[131ms]"
                aria-label="Bluesky"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 600 530" aria-hidden="true">
                  <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
