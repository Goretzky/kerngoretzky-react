// Hero.tsx
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="hero relative bg-hero h-screen w-full flex items-center justify-center">
      <div className="text-center text-white relative z-20 hero-text">
        <h1 className="text-4xl md:text-6xl font-bold">Welcome</h1>
        <p className="text-xl">Building amazing web experiences</p>
      </div>
    </section>
  );
};

export default Hero;
