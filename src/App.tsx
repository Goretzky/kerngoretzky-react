import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Certifications from "./components/Certifications/Certifications";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import DebugBadge from "./components/DebugBadge/DebugBadge";

const App = () => {
  return (
    <div className="bg-gray-900 text-white w-full">
      <Header />
      <Hero /> {/* full width hero */}
      <main>
        <About />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <DebugBadge />
    </div>
  );
};

export default App;