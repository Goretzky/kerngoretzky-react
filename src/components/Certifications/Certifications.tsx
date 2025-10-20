// Certifications.tsx
/**
 * Certifications section with filterable grid and 2D animations.
 * Features:
 * - Category filtering (All, Frontend, Backend, Full Stack, etc.)
 * - Cards slide in from the right with fade
 * - Staggered animation timing between cards
 * - Hover effect lifts cards slightly
 * - Glassmorphism design matching Projects section
 */

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

// Animation Parameters (matching Projects section)
const SLIDE_DISTANCE = 100;
const ANIMATION_DURATION = 0.6;
const HOVER_LIFT = -4;
const STAGGER_DELAY = 0.03;
const EASE = [0.11, 0, 0.5, 0] as const;

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  categories: string[];
}

const certifications: Certification[] = [
  {
    title: "100 Days of SwiftUI",
    issuer: "Hacking with Swift",
    date: "May 2025",
    credentialUrl: "https://www.hackingwithswift.com/100/swiftui",
    categories: ["Mobile"]
  },
  {
    title: "Next.js & React - The Complete Guide (incl. Two Paths!)",
    issuer: "Udemy",
    date: "Sep 2023",
    credentialId: "UC-152bbf2c-6422-4dd2-b4e7-f184a4a4be6c",
    credentialUrl: "https://www.udemy.com/certificate/UC-152bbf2c-6422-4dd2-b4e7-f184a4a4be6c/",
    categories: ["Frontend"]
  },
  {
    title: "Clean Code",
    issuer: "Udemy",
    date: "May 2023",
    credentialId: "UC-ef9ea775-ebed-43a1-876a-7ba2b7ab323f",
    credentialUrl: "https://www.udemy.com/certificate/UC-ef9ea775-ebed-43a1-876a-7ba2b7ab323f/",
    categories: ["Best Practices"]
  },
  {
    title: "The Git & Github Bootcamp",
    issuer: "Udemy",
    date: "Apr 2023",
    credentialId: "UC-adf780d9-2417-482d-8484-d9a51d7a14af",
    credentialUrl: "https://www.udemy.com/certificate/UC-adf780d9-2417-482d-8484-d9a51d7a14af/",
    categories: ["Tools"]
  },
  {
    title: "Angular Universal In Depth (Angular 15)",
    issuer: "Udemy",
    date: "Mar 2023",
    credentialId: "UC-132bac29-f228-4149-9d0a-217318d00ea6",
    credentialUrl: "https://www.udemy.com/certificate/UC-132bac29-f228-4149-9d0a-217318d00ea6/",
    categories: ["Frontend"]
  },
  {
    title: "Understanding TypeScript - 2022 Edition",
    issuer: "Udemy",
    date: "May 2022",
    credentialId: "UC-efca56e7-c45a-494b-afad-2b7e5b466ca1",
    credentialUrl: "https://www.udemy.com/certificate/UC-efca56e7-c45a-494b-afad-2b7e5b466ca1/",
    categories: ["Frontend"]
  },
  {
    title: "Angular & NodeJS - The MEAN Stack Guide [2022 Edition]",
    issuer: "Udemy",
    date: "Apr 2022",
    credentialId: "UC-e33c9974-a5f9-49bb-9193-6dd91c3ec561",
    credentialUrl: "https://www.udemy.com/certificate/UC-e33c9974-a5f9-49bb-9193-6dd91c3ec561/",
    categories: ["Full Stack"]
  },
  {
    title: "LinkedIn Ads: LinkedIn Lead Generation | LinkedIn Marketing",
    issuer: "Udemy",
    date: "Apr 2022",
    credentialId: "UC-bc71345c-ad1c-4ee6-bfef-4c31f8dad24f",
    credentialUrl: "https://www.udemy.com/certificate/UC-bc71345c-ad1c-4ee6-bfef-4c31f8dad24f/",
    categories: ["Marketing"]
  },
  {
    title: "The Web Developer Bootcamp 2022",
    issuer: "Udemy",
    date: "Apr 2022",
    credentialId: "UC-8a4b17b8-c7cc-4d6b-983c-13b89490c88c",
    credentialUrl: "https://www.udemy.com/certificate/UC-8a4b17b8-c7cc-4d6b-983c-13b89490c88c/",
    categories: ["Full Stack"]
  },
  {
    title: "Learning Docker",
    issuer: "LinkedIn",
    date: "Jun 2018",
    credentialUrl: "https://www.linkedin.com/learning/certificates/f5361725d07fd24b2800bfd134c5c9e8a7866126d5d8bd0bd069aca6f84b023f",
    categories: ["Tools"]
  },
  {
    title: "Multiplatform Mobile App Development with Web Technologies",
    issuer: "Coursera",
    date: "Dec 2016",
    credentialId: "JM6RMVXZMCQH",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/JM6RMVXZMCQH",
    categories: ["Full Stack", "Mobile"]
  },
  {
    title: "Server-side Development with NodeJS",
    issuer: "Coursera",
    date: "Nov 2016",
    credentialId: "M3YVH28Q3TJW",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/M3YVH28Q3TJW",
    categories: ["Backend"]
  },
  {
    title: "Front-End JavaScript Frameworks: AngularJS",
    issuer: "Coursera",
    date: "Oct 2016",
    credentialId: "HSU2YSV8WZYZ",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/HSU2YSV8WZYZ",
    categories: ["Frontend"]
  },
  {
    title: "Front-End Web UI Frameworks and Tools",
    issuer: "Coursera",
    date: "Sep 2016",
    credentialId: "NP7T8T4Z7XG3",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/NP7T8T4Z7XG3",
    categories: ["Frontend"]
  },
  {
    title: "HTML, CSS and JavaScript",
    issuer: "Coursera",
    date: "Sep 2016",
    credentialId: "HAC3JHKYGW57",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/HAC3JHKYGW57",
    categories: ["Frontend"]
  },
  {
    title: "Responsive Website Basics: Code with HTML, CSS, and JavaScript",
    issuer: "Coursera",
    date: "Aug 2016",
    credentialId: "2S9J7RMBL7WR",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/2S9J7RMBL7WR",
    categories: ["Frontend"]
  },
  {
    title: "An Introduction to Interactive Programming in Python",
    issuer: "Coursera",
    date: "Nov 2014",
    credentialUrl: "https://www.coursera.org/learn/interactive-python-1",
    categories: ["Backend"]
  },
  {
    title: "Programming for Everybody (Python)",
    issuer: "Coursera",
    date: "Sep 2014",
    credentialId: "6P4HZ46P8W",
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/6P4HZ46P8W",
    categories: ["Backend"]
  },
  {
    title: "Intro to Salesforce App Development",
    issuer: "Udacity",
    date: "Mar 2014",
    categories: ["Tools"]
  },
  {
    title: "Canadian Securities Course (Honours)",
    issuer: "Canadian Securities Institute",
    date: "May 2011",
    credentialUrl: "https://www.csi.ca/en/learning/courses/csc",
    categories: ["Finance"]
  },
  {
    title: "Google Analytics Essential Training",
    issuer: "Lynda.com",
    date: "Jul 2016",
    credentialId: "E3168C",
    categories: ["Marketing"]
  },
  {
    title: "Up and Running with Python and Django",
    issuer: "Lynda.com",
    date: "Jul 2016",
    credentialId: "C5F316",
    categories: ["Backend"]
  }
];

const categories = ["All", "Frontend", "Backend", "Full Stack", "Mobile", "Tools", "Marketing", "Best Practices", "Finance"];

const Certifications: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Detect mobile viewport (for display limit only)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset showAll when category changes
  useEffect(() => {
    setShowAll(false);
  }, [selectedCategory]);

  const filteredCertifications = selectedCategory === "All"
    ? certifications
    : certifications.filter(cert => cert.categories.includes(selectedCategory));

  const displayLimit = isMobile ? 3 : 6;
  const displayedCertifications = showAll
    ? filteredCertifications
    : filteredCertifications.slice(0, displayLimit);

  const handleShowMoreToggle = () => {
    if (showAll && sectionRef.current) {
      // When collapsing, scroll to top of section first
      const headerOffset = 80; // Height of fixed header
      const targetPosition = sectionRef.current.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      // Then collapse after delay to allow scroll to complete (longer delay for mobile)
      setTimeout(() => setShowAll(false), 300);
    } else {
      // When expanding, just toggle immediately
      setShowAll(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="courses"
      className="courses py-16 px-4 text-gray-100"
      style={{
        position: 'relative',
        isolation: 'isolate',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Header */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: SLIDE_DISTANCE }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: ANIMATION_DURATION, ease: EASE }}
            viewport={{ once: true, margin: "0px" }}
            className="col-span-full mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md text-center">
              Courses
            </h2>
          </motion.div>

          {/* Category Filter Buttons */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: SLIDE_DISTANCE }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: ANIMATION_DURATION, ease: EASE, delay: 0.2 }}
            viewport={{ once: true, margin: "0px" }}
            className="col-span-full mb-8 flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                aria-label={`Filter courses by ${category}`}
                aria-pressed={selectedCategory === category}
                className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-[197ms]"
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
          {displayedCertifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: SLIDE_DISTANCE }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              whileHover={prefersReducedMotion ? {} : { y: HOVER_LIFT, transition: { duration: 0.13122 } }}
              transition={prefersReducedMotion ? { duration: 0 } : {
                duration: ANIMATION_DURATION,
                ease: EASE,
                delay: index * STAGGER_DELAY
              }}
              viewport={{ once: true, margin: "0px" }}
              style={{
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

                {/* Category Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {cert.categories.map((category, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-3 py-1 text-xs font-medium rounded-full"
                      style={{
                        background: 'rgba(50, 196, 196, 0.2)',
                        border: '1px solid rgba(50, 196, 196, 0.4)',
                        color: '#32C4C4'
                      }}
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* View Credential Button */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-[197ms] mt-3"
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
                    {cert.credentialId ? 'View Credential' : 'View Course'}
                  </a>
                )}
              </div>
            </motion.div>
          ))}

          {/* Show More/Less Button */}
          {filteredCertifications.length > displayLimit && (
            <div className="col-span-full flex justify-center mt-8">
              <button
                onClick={handleShowMoreToggle}
                className="px-8 py-3 text-base font-semibold rounded-full transition-all duration-[197ms]"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }}
              >
                {showAll
                  ? 'Show Less'
                  : `Show All ${filteredCertifications.length} Courses`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
