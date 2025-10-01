// Projects.tsx
/**
 * Projects section with responsive grid and 3D animations.
 * Features a combination of entrance and interaction effects:
 * - Header and cards slide in from the right
 * - 3D rotation during entrance (90-degree rotation)
 * - Staggered animation timing between cards
 * - Hover effect lifts cards slightly
 * 
 * Grid Layout:
 * - Responsive columns (1 to 3 depending on viewport)
 * - Consistent card sizing and spacing
 * - Each card maintains its own animation scope
 */

import React from "react";
import { motion } from "framer-motion";

// Animation Parameters
// Core animation values - used by both About and Projects sections
const ROTATION_ANGLE = 90;     // Initial 3D rotation (degrees) - adjust for more/less dramatic effect
const SLIDE_DISTANCE = 100;    // Horizontal slide-in distance (pixels)
const ANIMATION_DURATION = 1.8; // Length of main animation (seconds)
const HOVER_LIFT = -4;         // Vertical hover translation (pixels) - unique to project cards
const STAGGER_DELAY = 0.1;     // Time between each card's animation start (seconds)
const EASE = [0.11, 0, 0.5, 0] as const; // Custom easing curve for smooth motion

const projects = [
  {
    title: "KernGoretzky.ca",
    description: "React-based blog website using Next.js framework with markdown articles. A modern single-page application showcasing technical writing and web development expertise.",
    technologies: ["React", "Next.js", "Vercel", "Markdown"],
    demoUrl: "https://www.kerngoretzky.ca/",
    githubUrl: "#", // TODO: Add GitHub repository URL
    image: "/images/project-kerngoretzky-ca.jpg" // TODO: Add project screenshot
  },
  {
    title: "CoderLeaf",
    description: "Prerendered Angular website with glassmorphism design, search engine optimized. Full AWS cloud infrastructure with contact microservice and custom email integration.",
    technologies: ["Angular", "AWS S3", "CloudFront", "Lambda", "API Gateway", "Bootstrap"],
    demoUrl: "http://coderleaf.com/",
    githubUrl: "#", // TODO: Add GitHub repository URL
    image: "/images/project-coderleaf.jpg" // TODO: Add project screenshot
  },
  {
    title: "Portfolio Website",
    description: "Modern React portfolio website featuring liquid glass morphism design, smooth animations, and responsive layout. Built with TypeScript and Framer Motion.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Claude Code"],
    demoUrl: "https://kerngoretzky.com",
    githubUrl: "https://github.com/Goretzky/kerngoretzky-react",
    image: "/images/project-portfolio.jpg"
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="projects py-16 px-4 text-gray-100">
      <div className="max-w-6xl mx-auto" style={{ perspective: "2000px" }}>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: SLIDE_DISTANCE, rotateY: ROTATION_ANGLE }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: ANIMATION_DURATION, ease: EASE }}
            viewport={{ once: true, margin: "-100px" }}
            style={{
              transformStyle: "preserve-3d"
            }}
            className="col-span-full mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md text-center">
              Projects
            </h2>
          </motion.div>
          {/* Project Cards */}
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              // Initial state: invisible, shifted right, and rotated
              initial={{ opacity: 0, x: SLIDE_DISTANCE, rotateY: ROTATION_ANGLE }}
              // Final state: visible, centered, and flat
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              // Hover animation: lift card up slightly
              whileHover={{ y: HOVER_LIFT, transition: { duration: 0.2 } }}
              // Animation timing and easing
              transition={{
                duration: ANIMATION_DURATION,
                ease: [0.11, 0, 0.5, 0], // Custom easing curve for smooth animation
                delay: index * STAGGER_DELAY // Creates cascading effect
              }}
              // Viewport settings: trigger when in view, only animate once
              viewport={{ once: true, margin: "-100px" }}
              // Enable 3D transforms
              style={{
                transformStyle: "preserve-3d",
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              className="glass-card p-6 rounded-xl block no-underline"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></span>

              {/* Project Image */}
              {project.image && (
                <div className="relative z-10 mb-4 rounded-lg overflow-hidden bg-gray-800 h-48">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`
                        ${project.image.replace('.jpg', '-480.webp')} 480w,
                        ${project.image.replace('.jpg', '-768.webp')} 768w,
                        ${project.image.replace('.jpg', '-1024.webp')} 1024w
                      `}
                      sizes="(max-width: 768px) 480px, (max-width: 1024px) 768px, 1024px"
                    />
                    <img
                      src={project.image}
                      srcSet={`
                        ${project.image.replace('.jpg', '-480.jpg')} 480w,
                        ${project.image.replace('.jpg', '-768.jpg')} 768w,
                        ${project.image.replace('.jpg', '-1024.jpg')} 1024w
                      `}
                      sizes="(max-width: 768px) 480px, (max-width: 1024px) 768px, 1024px"
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </picture>
                </div>
              )}

              <h3 className="text-2xl font-semibold mb-3 text-white relative z-10">
                {project.title}
              </h3>

              <p className="text-gray-200 mb-4 relative z-10 text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      background: 'rgba(50, 196, 196, 0.2)',
                      border: '1px solid rgba(50, 196, 196, 0.4)',
                      color: '#32C4C4'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 relative z-10">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300"
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
                  View Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300"
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
                  GitHub
                </a>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
