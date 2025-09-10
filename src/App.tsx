import React from "react";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";

const App = () => {
  return (
    <div className="bg-gray-900">
      <Header />
      <main className="pt-24">
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  );
};

export default App;
