import { motion } from "framer-motion";
import React from "react";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 px-6 lg:px-20"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Profile Image with Circle Crop */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <picture>
            <source
              srcSet="/images/Kern_Goretzky_400.webp 400w, /images/Kern_Goretzky_800.webp 800w"
              sizes="(max-width: 768px) 400px, 800px"
              type="image/webp"
            />
            <source
              srcSet="/images/Kern_Goretzky_400.jpg 400w, /images/Kern_Goretzky_800.jpg 800w"
              sizes="(max-width: 768px) 400px, 800px"
              type="image/jpeg"
            />
            <motion.img
              src="/images/Kern_Goretzky_400.jpg"
              alt="Kern Goretzky profile photo"
              className="rounded-full shadow-2xl w-[250px] md:w-[300px] lg:w-[350px] object-cover border-4 border-gray-700"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
            />
          </picture>
        </motion.div>

        {/* About Text with Animation */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
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
