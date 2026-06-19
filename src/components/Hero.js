import React from 'react';
import '../styles/index.css';
import heroImage from '../assets/agriculture_3d_hero.png';

const Hero = () => {
  return (
    <section id="hero" className="fadeInUp">
      <div className="hero-content">
        <div className="hero-text" data-aos="fade-right">
          <h1>Smarter Farming, <br /><span>Better Yields</span></h1>
          <p>
            Connect directly with verified auctions, get real-time AI weather and risk insights, apply for agricultural loans, and shop top-grade essentials. All in one sustainable digital ecosystem.
          </p>
          <div className="flex gap-4 justify-start">
            <a href="#features" className="cta-button">Explore Features</a>
            <a href="/shopping" className="cta-button secondary" style={{ marginLeft: '12px' }}>Visit Shop</a>
          </div>
        </div>
        <div className="hero-image-container float-slow" data-aos="fade-left">
          <img src={heroImage} alt="Premium 3D Smart Farm illustration" />
        </div>
      </div>
    </section>
  );
};

export default Hero;