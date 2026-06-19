import React from 'react';
import '../styles/index.css';

const Trends = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-extrabold text-[#0f3423] mb-6">Market Trends</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-emerald-500/10 shadow-md">
          <h3 className="text-xl font-bold text-[#0f3423] mb-3">Crop Prices</h3>
          <p className="text-emerald-950/80 mb-2">Wheat: ₹2,400/Quintal (Up 5%)</p>
          <p className="text-emerald-950/80 mb-2">Rice: ₹2,100/Quintal (Down 2%)</p>
          <p className="text-emerald-950/80">Cotton: ₹6,500/Quintal (Up 8%)</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-emerald-500/10 shadow-md">
          <h3 className="text-xl font-bold text-[#0f3423] mb-3">Demand Forecast</h3>
          <p className="text-emerald-950/80 mb-2">High demand for organic basmati rice and high-yield milling grains.</p>
          <p className="text-[#526359] text-sm mt-4">Updated 10 minutes ago from national market APIs.</p>
        </div>
      </div>
    </section>
  );
};

export default Trends;