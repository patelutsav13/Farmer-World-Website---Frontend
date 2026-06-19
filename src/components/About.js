import React from 'react';
import '../styles/index.css';
import aboutHeroImg from '../assets/agriculture_3d_hero.png';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 fadeInUp">
      {/* Page Title Header */}
      <div className="text-center mb-16">
        <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">Empowering Agriculture</span>
        <h1 className="text-5xl font-extrabold mt-3 mb-6 text-[#0f3423] tracking-tight">
          About <span>FarmerWorld</span>
        </h1>
        <p className="text-lg text-emerald-950/70 max-w-2xl mx-auto leading-relaxed">
          We bridge the gap between traditional agricultural expertise and cutting-edge digital intelligence, creating a thriving ecosystem for modern farmers.
        </p>
      </div>

      {/* Grid: Story Description & Render */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        <div data-aos="fade-right">
          <h2 className="text-3xl font-bold text-[#0f3423] mb-6 border-l-4 border-emerald-500 pl-4">
            Our Mission & Purpose
          </h2>
          <p className="text-emerald-950/80 mb-6 leading-relaxed text-base">
            FarmerWorld started with a simple vision: to make smart farming technology accessible to every cultivator. We believe that by providing real-time AI weather risk assessments, secure financing options, and transparent bidding environments, we can help reduce crop loss and increase farmer revenue globally.
          </p>
          <p className="text-emerald-950/80 leading-relaxed text-base">
            From smart crop suggestions to active collaboration hubs, our platform empowers communities to share machinery, consult soil data, and trade goods directly without middlemen.
          </p>
        </div>
        <div className="flex justify-center float-slow" data-aos="fade-left">
          <img 
            src={aboutHeroImg} 
            alt="3D Smart Farm render representing sustainable agriculture" 
            className="w-11/12 h-auto drop-shadow-2xl rounded-2xl"
          />
        </div>
      </div>

      {/* Grid: Core Values Cards */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-[#0f3423] text-center mb-12">
          Our Core Pillars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-emerald-500/10 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0f3423] mb-4">Transparency</h3>
            <p className="text-emerald-950/70 text-sm leading-relaxed">
              Transparent peer-to-peer crop auction bidding ensures farmers receive fair value for their efforts without hidden charges.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-emerald-500/10 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0f3423] mb-4">Security</h3>
            <p className="text-emerald-950/70 text-sm leading-relaxed">
              Strict document verification systems and robust bank API portals protect user identities, purchases, and loan applications.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-emerald-500/10 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0f3423] mb-4">Community Support</h3>
            <p className="text-emerald-950/70 text-sm leading-relaxed">
              Our integrated AI chatbot and collaborative sharing tools keep growers connected to professional crop analysts 24/7.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="bg-[#0f3423] rounded-3xl p-12 text-white shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          <div>
            <h4 className="text-4xl font-extrabold text-amber-300">10k+</h4>
            <p className="text-emerald-200 text-sm mt-1">Active Farmers</p>
          </div>
          <div>
            <h4 className="text-4xl font-extrabold text-amber-300">98%</h4>
            <p className="text-emerald-200 text-sm mt-1">Loan Approval Rate</p>
          </div>
          <div>
            <h4 className="text-4xl font-extrabold text-amber-300">5M+</h4>
            <p className="text-emerald-200 text-sm mt-1">Crops Traded (INR)</p>
          </div>
          <div>
            <h4 className="text-4xl font-extrabold text-amber-300">12h</h4>
            <p className="text-emerald-200 text-sm mt-1">Avg. Settlement Time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
