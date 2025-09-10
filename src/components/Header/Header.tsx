import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-6 text-white fixed w-full z-10 shadow-lg">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kern Goretzky</h1>
        <ul className="flex space-x-6">
          <li><a href="#about" className="hover:text-yellow-300 transition">About</a></li>
          <li><a href="#projects" className="hover:text-yellow-300 transition">Projects</a></li>
          <li><a href="#contact" className="hover:text-yellow-300 transition">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
