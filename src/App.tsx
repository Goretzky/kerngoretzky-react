import React from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";

const App = () => {
  return (
    <div className="bg-gray-900 text-white">
      <Hero /> {/* full width hero */}
      <div id="root">
        <Header />
        <main className="pt-24">
          <About />
          <Projects />
          <Contact />
        </main>
      </div>
  </div>
  
  );
};

export default App;