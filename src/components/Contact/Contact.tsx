import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
      <p className="text-lg mb-6 text-center max-w-md">
        Want to work together or just say hi? Send me a message!
      </p>
      <form className="flex flex-col w-full max-w-md">
        <input
          type="text"
          placeholder="Name"
          className="mb-4 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-pink-500 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="mb-4 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-pink-500 focus:outline-none"
        />
        <textarea
          placeholder="Message"
          className="mb-4 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-pink-500 focus:outline-none"
        />
        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
