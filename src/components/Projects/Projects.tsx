// Projects.tsx
import React from "react";

const projects = [
  { title: "Project One", description: "A brief description of Project One." },
  { title: "Project Two", description: "A brief description of Project Two." },
  { title: "Project Three", description: "A brief description of Project Three." },
];

const Projects: React.FC = () => {
  return (
    <section className="projects py-16 px-4 bg-gray-800 text-gray-100">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white drop-shadow-md">
        Projects
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
          >
            <h3 className="text-2xl font-semibold mb-2 text-white">
              {project.title}
            </h3>
            <p className="text-gray-200">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
