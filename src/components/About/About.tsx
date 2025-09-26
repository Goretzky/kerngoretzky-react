import { motion } from "framer-motion";
import React from "react";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 px-6 lg:px-20"
    >
      <div className="max-w-4xl mx-auto">
        {/* About Text with Animation */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">
            About Me
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Hi, I’m Kern Goretzky — a developer with a background in broadcasting,
            media, and technology. I enjoy building engaging, user-friendly websites
            and apps that bring ideas to life.
          </p>
          <p className="text-gray-400 leading-relaxed">
            When I’m not coding, I’m spending time with my family or exploring new
            ways technology can shape storytelling and creativity.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
