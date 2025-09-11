// Contact.tsx
import React from "react";

const Contact: React.FC = () => {
  return (
    <section className="contact py-16 px-4 bg-gray-900 text-gray-100">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-md">
          Contact Me
        </h2>
        <p className="text-gray-300 mb-8">
          Feel free to reach out to discuss projects or collaborations.
        </p>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Your Message"
            className="p-3 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={5}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-gray-900 font-semibold py-3 rounded-lg transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
