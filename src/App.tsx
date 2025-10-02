import React from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Certifications from "./components/Certifications/Certifications";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="bg-gray-900 text-white">
      <Hero /> {/* full width hero */}
      <div id="root">
        <Header />
        <main>
          <About />
          <Projects />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
  </div>

  );
};

export default App;