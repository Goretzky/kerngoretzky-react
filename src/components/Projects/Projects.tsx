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
  { title: "Project One", description: "A brief description of Project One." },
  { title: "Project Two", description: "A brief description of Project Two." },
  { title: "Project Three", description: "A brief description of Project Three." },
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
              transformStyle: "preserve-3d",
              transformOrigin: "left center"
            }}
            className="col-span-full mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
              Projects
            </h2>
          </motion.div>
          {/* Project Cards */}
          {projects.map((project, index) => (
            <motion.div
              key={index}
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
              style={{ transformStyle: "preserve-3d" }}
              className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl"
            >
              <h3 className="text-2xl font-semibold mb-2 text-white">
                {project.title}
              </h3>
              <p className="text-gray-200">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
