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

const Home = () => {
  const arr = useMemo(() => [img25, img26, img27, img28, img29, img30, img31], []);
  const [randomImage, setRandomImage] = useState(arr[0]);

  useEffect(() => {
    const changeImages = () => {
      const randomIndex = Math.floor(Math.random() * arr.length);
      setRandomImage(arr[randomIndex]);
    };

    const interval = setInterval(changeImages, 2000);
    return () => clearInterval(interval);
  }, [arr]);

  return (
    <div className="bg-[#fbfdf9] min-h-screen">
      {/* Premium Banner Title */}
      <div className="text-center py-6">
        <span className="inline-block bg-gradient-to-r from-emerald-700 to-green-600 text-white font-extrabold text-2xl tracking-widest px-8 py-3 rounded-full shadow-lg shadow-emerald-700/20 uppercase">
          FarmerWorld Portal
        </span>
      </div>

      <Hero />

      {/* Large Featured Slideshow Banner */}
      <div className="max-w-7xl mx-auto px-6 my-10" data-aos="zoom-in">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">Gallery</span>
          <h2 className="text-2xl font-bold text-[#0f3423] mt-2">Sustainable Farm Environments</h2>
        </div>
        
        <div className="relative h-[380px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-emerald-500/20">
          <img
            src={randomImage}
            alt="Agricultural Gallery Slideshow"
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/20 to-transparent flex items-end p-8">
            <div>
              <span className="bg-[#f5cf65] text-emerald-950 text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">Eco Friendly</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-2 drop-shadow-md">Nurturing Fields With Advanced Precision</h3>
              <p className="text-white/80 text-sm md:text-base mt-1 max-w-xl">Take a glimpse of clean sustainable crop fields powered by our connected agricultural services.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Sections */}
      <div className="bg-gradient-to-b from-[#fbfdf9] via-emerald-50/10 to-[#fbfdf9] pb-12">
        <Features />
        <FeatureGrid />
      </div>
    </div>
  );
};

export default Home;
