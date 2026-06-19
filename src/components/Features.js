import React from 'react';
import { Link } from 'react-router-dom';
import img32 from '../assets/products/img32.jpg';
import img33 from '../assets/products/img33.jpg';
import img39 from '../assets/products/img39.jpg';

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f3423]">Core Services</h2>
        <p className="text-emerald-950/60 mt-2 text-base md:text-lg">Explore our fundamental digital tools designed for active farmers</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-gradient-to-br from-white to-emerald-50/20 border border-emerald-500/10 hover:border-emerald-500/40 shadow-lg hover:shadow-xl rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between items-center text-center">
          <div className="p-4 bg-emerald-50 rounded-2xl mb-4">
            <img src={img32} alt="Weather Insights" className="h-16 w-16 object-cover rounded-xl" />
          </div>
          <h3 className="text-2xl font-bold text-[#0f3423] mb-3">Weather Insights</h3>
          <p className="text-emerald-950/70 text-base mb-6 leading-relaxed">
            Get localized, real-time weather alerts and warnings to optimize planting and sowing times.
          </p>
          <Link to="/weather-risk" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl text-center shadow-md shadow-emerald-700/10 transition-all cursor-pointer">
            Learn More
          </Link>
        </div>

        {/* Feature 2 */}
        <div className="bg-gradient-to-br from-white to-emerald-50/20 border border-emerald-500/10 hover:border-emerald-500/40 shadow-lg hover:shadow-xl rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between items-center text-center">
          <div className="p-4 bg-emerald-50 rounded-2xl mb-4">
            <img src={img33} alt="Auction" className="h-16 w-16 object-cover rounded-xl" />
          </div>
          <h3 className="text-2xl font-bold text-[#0f3423] mb-3">Online Auction</h3>
          <p className="text-emerald-950/70 text-base mb-6 leading-relaxed">
            Participate in modern digital bidding for fresh seeds, crops, and heavy machinery parts.
          </p>
          <Link to="/auction" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl text-center shadow-md shadow-emerald-700/10 transition-all cursor-pointer">
            Join Auction
          </Link>
        </div>

        {/* Feature 3 */}
        <div className="bg-gradient-to-br from-white to-emerald-50/20 border border-emerald-500/10 hover:border-emerald-500/40 shadow-lg hover:shadow-xl rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between items-center text-center">
          <div className="p-4 bg-emerald-50 rounded-2xl mb-4">
            <img src={img39} alt="Shopping Site" className="h-16 w-16 object-cover rounded-xl" />
          </div>
          <h3 className="text-2xl font-bold text-[#0f3423] mb-3">Shop Essentials</h3>
          <p className="text-emerald-950/70 text-base mb-6 leading-relaxed">
            Purchase verified fertilizers, organic seeds, and heavy-duty tool sets directly from sellers.
          </p>
          <Link to="/shopping" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl text-center shadow-md shadow-emerald-700/10 transition-all cursor-pointer">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;