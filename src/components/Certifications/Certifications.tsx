// Certifications.tsx
/**
 * Certifications section with filterable grid and 3D animations.
 * Features:
 * - Category filtering (All, Frontend, Backend, Full Stack, etc.)
 * - Cards slide in from the right with 3D rotation
 * - Staggered animation timing between cards
 * - Hover effect lifts cards slightly
 * - Glassmorphism design matching Projects section
 */

import React, { useState } from "react";
import { motion } from "framer-motion";

// Animation Parameters (matching Projects section)
const ROTATION_ANGLE = 90;
const SLIDE_DISTANCE = 100;
const ANIMATION_DURATION = 1.8;
const HOVER_LIFT = -4;
const STAGGER_DELAY = 0.1;
const EASE = [0.11, 0, 0.5, 0] as const;

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  category: string;
}

const certifications: Certification[] = [
  {
    title: "Next.js & React - The Complete Guide (incl. Two Paths!)",
    issuer: "Udemy",
    date: "Sep 2023",
    credentialId: "UC-152bbf2c-6422-4dd2-b4e7-f184a4a4be6c",
    credentialUrl: "https://www.udemy.com/certificate/UC-152bbf2c-6422-4dd2-b4e7-f184a4a4be6c/",
    category: "Frontend"
  },
  {
    title: "Clean Code",
    issuer: "Udemy",
    date: "May 2023",
    credentialId: "UC-ef9ea775-ebed-43a1-876a-7ba2b7ab323f",
    credentialUrl: "https://www.udemy.com/certificate/UC-ef9ea775-ebed-43a1-876a-7ba2b7ab323f/",
    category: "Best Practices"
  },
  {
    title: "The Git & Github Bootcamp",
    issuer: "Udemy",
    date: "Apr 2023",
    credentialId: "UC-adf780d9-2417-482d-8484-d9a51d7a14af",
    credentialUrl: "https://www.udemy.com/certificate/UC-adf780d9-2417-482d-8484-d9a51d7a14af/",
    category: "Tools"
  },
  {
    title: "Angular Universal In Depth (Angular 15)",
    issuer: "Udemy",
    date: "Mar 2023",
    credentialId: "UC-132bac29-f228-4149-9d0a-217318d00ea6",
    credentialUrl: "https://www.udemy.com/certificate/UC-132bac29-f228-4149-9d0a-217318d00ea6/",
    category: "Frontend"
  },
  {
    title: "Understanding TypeScript - 2022 Edition",
    issuer: "Udemy",
    date: "May 2022",
    credentialId: "UC-efca56e7-c45a-494b-afad-2b7e5b466ca1",
    credentialUrl: "https://www.udemy.com/certificate/UC-efca56e7-c45a-494b-afad-2b7e5b466ca1/",
    category: "Frontend"
  },
  {
    title: "Angular & NodeJS - The MEAN Stack Guide [2022 Edition]",
    issuer: "Udemy",
    date: "Apr 2022",
    credentialId: "UC-e33c9974-a5f9-49bb-9193-6dd91c3ec561",
    credentialUrl: "https://www.udemy.com/certificate/UC-e33c9974-a5f9-49bb-9193-6dd91c3ec561/",
    category: "Full Stack"
  },
  {
    title: "LinkedIn Ads: LinkedIn Lead Generation | LinkedIn Marketing",
    issuer: "Udemy",
    date: "Apr 2022",
    credentialId: "UC-bc71345c-ad1c-4ee6-bfef-4c31f8dad24f",
    credentialUrl: "https://www.udemy.com/certificate/UC-bc71345c-ad1c-4ee6-bfef-4c31f8dad24f/",
    category: "Marketing"
  },
  {
    title: "The Web Developer Bootcamp 2022",
    issuer: "Udemy",
    date: "Apr 2022",
    credentialId: "UC-8a4b17b8-c7cc-4d6b-983c-13b89490c88c",
    credentialUrl: "https://www.udemy.com/certificate/UC-8a4b17b8-c7cc-4d6b-983c-13b89490c88c/",
    category: "Full Stack"
  },
  {
    title: "Learning Docker",
    issuer: "LinkedIn",
    date: "Jun 2018",
    credentialUrl: "https://www.linkedin.com/learning/certificates/f5361725d07fd24b2800bfd134c5c9e8a7866126d5d8bd0bd069aca6f84b023f",
    category: "Tools"
  },
  {
    title: "Multiplatform Mobile App Development with Web Technologies",
    issuer: "Coursera",
    date: "Dec 2016",
    credentialId: "JM6RMVXZMCQH",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/JM6RMVXZMCQH",
    category: "Full Stack"
  },
  {
    title: "Server-side Development with NodeJS",
    issuer: "Coursera",
    date: "Nov 2016",
    credentialId: "M3YVH28Q3TJW",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/M3YVH28Q3TJW",
    category: "Backend"
  },
  {
    title: "Front-End JavaScript Frameworks: AngularJS",
    issuer: "Coursera",
    date: "Oct 2016",
    credentialId: "HSU2YSV8WZYZ",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/HSU2YSV8WZYZ",
    category: "Frontend"
  },
  {
    title: "Front-End Web UI Frameworks and Tools",
    issuer: "Coursera",
    date: "Sep 2016",
    credentialId: "NP7T8T4Z7XG3",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/NP7T8T4Z7XG3",
    category: "Frontend"
  },
  {
    title: "HTML, CSS and JavaScript",
    issuer: "Coursera",
    date: "Sep 2016",
    credentialId: "HAC3JHKYGW57",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/HAC3JHKYGW57",
    category: "Frontend"
  },
  {
    title: "Responsive Website Basics: Code with HTML, CSS, and JavaScript",
    issuer: "Coursera",
    date: "Aug 2016",
    credentialId: "2S9J7RMBL7WR",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/2S9J7RMBL7WR",
    category: "Frontend"
  },
  {
    title: "An Introduction to Interactive Programming in Python",
    issuer: "Coursera",
    date: "Nov 2014",
    credentialId: "F569VPMQ4A",
    category: "Backend"
  },
  {
    title: "Programming for Everybody (Python)",
    issuer: "Coursera",
    date: "Sep 2014",
    credentialId: "6P4HZ46P8W",
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/6P4HZ46P8W",
    category: "Backend"
  },
  {
    title: "Intro to Salesforce App Development",
    issuer: "Udacity",
    date: "Mar 2014",
    category: "Tools"
  },
  {
    title: "Canadian Securities Course (Honours)",
    issuer: "Canadian Securities Institute",
    date: "May 2011",
    category: "Finance"
  },
  {
    title: "Google Analytics Essential Training",
    issuer: "Lynda.com",
    date: "Jul 2016",
    credentialId: "E3168C",
    category: "Marketing"
  },
  {
    title: "Up and Running with Python and Django",
    issuer: "Lynda.com",
    date: "Jul 2016",
    credentialId: "C5F316",
    category: "Backend"
  }
];

const categories = ["All", "Frontend", "Backend", "Full Stack", "Tools", "Marketing", "Best Practices", "Finance"];

const Certifications: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCertifications = selectedCategory === "All"
    ? certifications
    : certifications.filter(cert => cert.category === selectedCategory);

  return (
    <section
      id="certifications"
      className="certifications py-16 px-4 text-gray-100"
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: SLIDE_DISTANCE, rotateY: ROTATION_ANGLE }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: ANIMATION_DURATION, ease: EASE }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ transformStyle: "preserve-3d" }}
            className="col-span-full mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md text-center">
              Certifications
            </h2>
          </motion.div>

          {/* Category Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, x: SLIDE_DISTANCE, rotateY: ROTATION_ANGLE }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: ANIMATION_DURATION, ease: EASE, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ transformStyle: "preserve-3d" }}
            className="col-span-full mb-8 flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300"
                style={{
                  background: selectedCategory === category
                    ? 'rgba(50, 196, 196, 0.3)'
                    : 'rgba(255, 255, 255, 0.1)',
                  border: selectedCategory === category
                    ? '1px solid rgba(50, 196, 196, 0.6)'
                    : '1px solid rgba(255, 255, 255, 0.2)',
                  color: selectedCategory === category ? '#32C4C4' : '#ffffff',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Certification Cards */}
          {filteredCertifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: SLIDE_DISTANCE, rotateY: ROTATION_ANGLE }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              whileHover={{ y: HOVER_LIFT, transition: { duration: 0.2 } }}
              transition={{
                duration: ANIMATION_DURATION,
                ease: EASE,
                delay: index * STAGGER_DELAY
              }}
              viewport={{ once: true, margin: "-100px" }}
              style={{
                transformStyle: "preserve-3d",
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
              }}
              className="glass-card p-6 rounded-xl"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></span>

              <div className="relative z-10">
                <h3 className="text-lg font-semibold mb-2 text-white line-clamp-2">
                  {cert.title}
                </h3>

                <p className="text-gray-300 text-sm mb-2">
                  {cert.issuer}
                </p>

                <p className="text-gray-400 text-xs mb-3">
                  {cert.date}
                </p>

                {cert.credentialId && (
                  <p className="text-gray-400 text-xs mb-3 font-mono">
                    ID: {cert.credentialId}
                  </p>
                )}

                {/* Category Badge */}
                <span
                  className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-3"
                  style={{
                    background: 'rgba(50, 196, 196, 0.2)',
                    border: '1px solid rgba(50, 196, 196, 0.4)',
                    color: '#32C4C4'
                  }}
                >
                  {cert.category}
                </span>

                {/* View Credential Button */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 mt-3"
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
                    View Credential
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
