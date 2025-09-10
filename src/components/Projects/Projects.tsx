import React from "react";

const projectList = [
  { title: "Portfolio Website", description: "This portfolio website built with React & Tailwind CSS.", link: "#" },
  { title: "SwiftUI Quiz App", description: "A multiplication quiz app with customizable settings.", link: "#" },
  { title: "Moonshot Project", description: "iOS app project from 100 Days of SwiftUI.", link: "#" },
];

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-8">
      <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projectList.map((project, i) => (
          <a
            key={i}
            href={project.link}
            className="bg-gray-700 rounded-xl p-6 hover:bg-gradient-to-r from-purple-600 to-pink-500 transform hover:scale-105 transition duration-300 shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
            <p>{project.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
