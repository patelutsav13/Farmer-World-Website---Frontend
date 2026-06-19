import React, { useState } from 'react';
import heroImage from '../assets/agriculture_3d_hero.png';
import dashboardImage from '../assets/farmer_3d_dashboard.png';
import img37 from '../assets/products/img37.jpg';
import img36 from '../assets/products/img36.jpg';

const Collaboration = () => {
  const [startup, setStartup] = useState('');
  const [details, setDetails] = useState('');

  const showStartupDetails = (value) => {
    setStartup(value);
    const startups = {
      CropX: {
        title: 'CropX Technologies',
        tech: 'IoT Soil Sensors & Dynamic Irrigation Controllers',
        benefits: 'Real-time soil moisture and salinity reporting to optimize water consumption, increase crop yield, and reduce leeching.',
        icon: '🌱'
      },
      AgroStar: {
        title: 'AgroStar Retail Net',
        tech: 'Direct-to-Farmer Mobile E-Commerce & Agronomy Advice',
        benefits: 'Provides direct access to verified organic seeds, fertilizers, and phone consultations with agronomic crop experts.',
        icon: '🚜'
      },
      FarmLogs: {
        title: 'FarmLogs Management',
        tech: 'Satellite Crop Health Analytics & Accounting Panels',
        benefits: 'Allows digital mapping of fields to monitor growth rates via NDIV satellite indices and log budget sheets.',
        icon: '📊'
      },
      JohnDeere: {
        title: 'John Deere Smart Systems',
        tech: 'Autonomous Tractors, Harvesters & GPS Autoshift',
        benefits: 'Implements smart GPS steering controls to reduce field passes, saving fuel, labor, and soil compaction.',
        icon: '⚡'
      },
    };

    if (value && startups[value]) {
      const s = startups[value];
      setDetails(`
        <div class="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-6 rounded-2xl border border-emerald-500/20 shadow-md">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-3xl">${s.icon}</span>
            <h4 class="text-2xl font-black">${s.title}</h4>
          </div>
          <p class="text-emerald-300 font-semibold mb-2"><strong>Core Technology:</strong> ${s.tech}</p>
          <p class="text-white/80 text-sm leading-relaxed"><strong>Key Benefits:</strong> ${s.benefits}</p>
        </div>
      `);
    } else {
      setDetails('<p class="text-emerald-950/60 font-semibold text-center py-6">Select a startup above to load their technologies.</p>');
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 bg-[#fbfdf9] min-h-screen">
      {/* Page Title */}
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">Partnerships</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f3423] mt-2">Agri-Tech Collaborations</h2>
        <p className="text-emerald-950/60 mt-2 text-base md:text-lg">Accelerating sustainable farm growth through global technology partnerships</p>
      </div>

      {/* 3D / Premium Images Grid (3-4 images) */}
      <section className="mb-16">
        <h3 className="text-2xl font-extrabold text-[#0f3423] mb-8 pl-3 border-l-4 border-emerald-500">Agri-Tech Ecosystem Galleries</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-emerald-500/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col">
            <div className="h-48 overflow-hidden bg-emerald-950/5">
              <img src={heroImage} alt="Smart Farm Machinery" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="p-5 flex-grow">
              <h4 className="font-extrabold text-lg text-[#0f3423] mb-2">Smart IoT Farm</h4>
              <p className="text-xs text-emerald-950/70 leading-relaxed">Integrated hardware arrays including automated sprinkler valves and smart drones monitoring canopy rates.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-emerald-500/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col">
            <div className="h-48 overflow-hidden bg-emerald-950/5">
              <img src={dashboardImage} alt="Farm Analytics Hub" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="p-5 flex-grow">
              <h4 className="font-extrabold text-lg text-[#0f3423] mb-2">Data Operations</h4>
              <p className="text-xs text-emerald-950/70 leading-relaxed">Real-time charts tracking soil hydration, temperature scales, market values, and loan approvals.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-emerald-500/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col">
            <div className="h-48 overflow-hidden bg-emerald-950/5">
              <img src={img37} alt="Cooperative Networking" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="p-5 flex-grow">
              <h4 className="font-extrabold text-lg text-[#0f3423] mb-2">Farmer Co-operatives</h4>
              <p className="text-xs text-emerald-950/70 leading-relaxed">Empowering community-driven co-ops to pool buying capabilities and leverage machinery sharing lists.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-emerald-500/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col">
            <div className="h-48 overflow-hidden bg-emerald-950/5">
              <img src={img36} alt="AI Consulting" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="p-5 flex-grow">
              <h4 className="font-extrabold text-lg text-[#0f3423] mb-2">AI Agronomist</h4>
              <p className="text-xs text-emerald-950/70 leading-relaxed">Instant machine learning diagnostics providing organic recommendations to preserve micro-nutrients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Startup selector */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div className="bg-gradient-to-br from-amber-50/70 via-emerald-50/40 to-green-100/60 border-2 border-emerald-500/20 shadow-xl p-8 rounded-3xl">
          <h3 className="text-2xl font-black text-[#0f3423] mb-4">Agri-Tech Startup Portal</h3>
          <p className="text-sm text-emerald-950/70 mb-6 leading-relaxed">
            Select one of our partnered global Agri-Tech startups to learn more about their advanced technologies and solutions.
          </p>
          
          <div>
            <label className="block text-sm font-bold text-[#0f3423] mb-2">Choose Startup</label>
            <select 
              value={startup} 
              onChange={(e) => showStartupDetails(e.target.value)} 
              className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 font-semibold text-[#0f3423]"
            >
              <option value="">-- Select Partner Startup --</option>
              <option value="CropX">CropX Soil Technologies</option>
              <option value="AgroStar">AgroStar Input Network</option>
              <option value="FarmLogs">FarmLogs Fields Analyst</option>
              <option value="JohnDeere">John Deere Automation</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          {details ? (
            <div dangerouslySetInnerHTML={{ __html: details }} className="transition-all duration-300" />
          ) : (
            <div className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-500/15 text-center text-emerald-950/60 font-semibold">
              Select a startup in the left menu to view detailed technical profiles.
            </div>
          )}
        </div>
      </section>

      {/* Value Blocks */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-emerald-500/15 pt-12">
        <div className="bg-white p-8 rounded-3xl border border-emerald-500/10 shadow-md">
          <h3 className="text-2xl font-extrabold text-[#0f3423] mb-4">Benefits of Integration</h3>
          <p className="text-sm text-emerald-950/70 mb-6">By working with tech startups, family farms can unlock advanced precision systems:</p>
          <ul className="space-y-3 text-sm text-emerald-950/80 font-medium">
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-600 font-extrabold">✓</span>
              <span>Increased crop yields based on moisture-sensor algorithms.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-600 font-extrabold">✓</span>
              <span>Access to heavy-duty GPS guided automated harvest vehicles.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-600 font-extrabold">✓</span>
              <span>Reduced waste of pesticides and synthetic nitrogen fertilizers.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-emerald-500/10 shadow-md">
          <h3 className="text-2xl font-extrabold text-[#0f3423] mb-4">Farmer Support & Webinars</h3>
          <p className="text-sm text-emerald-950/70 mb-6">We host collaborative events to guide you through installation processes:</p>
          <ul className="space-y-3 text-sm text-emerald-950/80 font-medium">
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-600 font-extrabold">✓</span>
              <span>Live video tutorials regarding IoT probe calibration.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-600 font-extrabold">✓</span>
              <span>Weekly Q&A webinars hosted by certified agronomic advisors.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-600 font-extrabold">✓</span>
              <span>Free downloadable field diagnostic mapping reports.</span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Collaboration;