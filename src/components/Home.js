import React, { useState, useEffect, useMemo } from 'react';
import Hero from './Hero';
import Features from './Features';
import FeatureGrid from './FeatureGrid';


import img25 from '../assets/products/img25.jpg';
import img26 from '../assets/products/img26.jpg';
import img27 from '../assets/products/img27.jpg';
import img28 from '../assets/products/img28.jpg';
import img29 from '../assets/products/img29.jpg';
import img30 from '../assets/products/img30.jpg';
import img31 from '../assets/products/img31.jpg';
import img39 from '../assets/products/img39.jpg';

import '../styles/index.css';

const Home = () => {
  const arr = useMemo(() => [img25, img26, img27, img28, img29, img30, img31], []);

  const [randomImage, setRandomImage] = useState(arr[0]);

  useEffect(() => {
    const changeImages = () => {
      const randomIndex = Math.floor(Math.random() * arr.length);
      setRandomImage(arr[randomIndex]);
    };

    const interval = setInterval(changeImages, 1500);
    return () => clearInterval(interval);
  }, [arr]);

  return (
    <div>
      <h1 style={{
        color: 'white',
        backgroundColor: '#47a100',
        height: '46px',
        width: '250px',
        textAlign: 'center',
        border: '2px',
        fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
        fontWeight: 'bold',
        margin: '20px auto',
        lineHeight: '46px',
        borderRadius: '6px'
      }}>
        FarmerWorld
      </h1>

      <Hero />

      <img
        src={randomImage}
        alt="Random Farm"
        height={300}
        width={300}
        style={{ display: 'block', margin: '20px auto', borderRadius: '12px' }}
      />

      <Features />
      <FeatureGrid />

      <section id="features">
        <div className="feature-item" style={{
          textAlign: 'center',
          margin: '40px 0',
        }}>
          <img
            src={img39}
            alt="Shopping Site"
            style={{ height: '90px', width: '90px', marginBottom: '10px' }}
          />
          <h3>Shopping Site</h3>
          <p>Get Real and Original Fertilizers and Parts of Machines For Farming.</p>
          <a href="/shopping" className="cta-button" style={{
            display: 'inline-block',
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#27ae60',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            Shop Now
          </a>
        </div>
      </section>

    </div>
  );
};

export default Home;
