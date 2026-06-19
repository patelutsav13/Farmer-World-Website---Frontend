import React from 'react';
import img34 from '../assets/products/img34.jpg';
import img35 from '../assets/products/img35.jpg';
import img36 from '../assets/products/img36.jpg';
import img37 from '../assets/products/img37.jpg';
import img38 from '../assets/products/img38.png';
import img40 from '../assets/products/img40.jpg';

const FeatureGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f3423]">Agricultural Tools & Portal</h2>
        <p className="text-emerald-950/60 mt-2 text-base md:text-lg">Deploy interactive data panels, AI models, and community programs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Tool 1 */}
        <div className="bg-gradient-to-br from-white to-emerald-50/20 border border-emerald-500/10 hover:border-emerald-500/40 shadow-lg hover:shadow-xl rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between items-center text-center">
          <div className="p-4 bg-emerald-50 rounded-2xl mb-4">
            <img src={img35} alt="Weather Updates" className="h-16 w-16 object-cover rounded-xl" />
          </div>
          <h3 className="text-2xl font-bold text-[#0f3423] mb-3">Weather Updates</h3>
          <p className="text-emerald-950/70 text-base mb-6 leading-relaxed">
            Detailed satellite forecasting updates, temperature alerts, and localized precipitation maps.
          </p>
          <a href="/WeathUpdates" className="w-full bg-[#2e6f40] hover:bg-emerald-800 text-white font-semibold py-3 px-6 rounded-xl text-center shadow-md transition-all cursor-pointer">
            View Forecasts
          </a>
        </div>

        {/* Tool 2 */}
        <div className="bg-gradient-to-br from-white to-emerald-50/20 border border-emerald-500/10 hover:border-emerald-500/40 shadow-lg hover:shadow-xl rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between items-center text-center">
          <div className="p-4 bg-emerald-50 rounded-2xl mb-4">
            <img src={img36} alt="AI Chatbot" className="h-16 w-16 object-cover rounded-xl" />
          </div>
          <h3 className="text-2xl font-bold text-[#0f3423] mb-3">ChatGPT AI Chatbot</h3>
          <p className="text-emerald-950/70 text-base mb-6 leading-relaxed">
            Get instant support and agronomic crop recommendations from our advanced virtual consultant.
          </p>
          <a href="/chatbot" className="w-full bg-[#2e6f40] hover:bg-emerald-800 text-white font-semibold py-3 px-6 rounded-xl text-center shadow-md transition-all cursor-pointer">
            Start Chat
          </a>
        </div>

        {/* Tool 3 */}
        <div className="bg-gradient-to-br from-white to-emerald-50/20 border border-emerald-500/10 hover:border-emerald-500/40 shadow-lg hover:shadow-xl rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between items-center text-center">
          <div className="p-4 bg-emerald-50 rounded-2xl mb-4">
            <img src={img37} alt="Collaboration" className="h-16 w-16 object-cover rounded-xl" />
          </div>
          <h3 className="text-2xl font-bold text-[#0f3423] mb-3">Community Portal</h3>
          <p className="text-emerald-950/70 text-base mb-6 leading-relaxed">
            Collaborate directly with neighbouring co-ops and group-purchasing resource networks.
          </p>
          <a href="/collaboration" className="w-full bg-[#2e6f40] hover:bg-emerald-800 text-white font-semibold py-3 px-6 rounded-xl text-center shadow-md transition-all cursor-pointer">
            Explore Network
          </a>
        </div>

        {/* Tool 4 */}
        <div className="bg-gradient-to-br from-white to-emerald-50/20 border border-emerald-500/10 hover:border-emerald-500/40 shadow-lg hover:shadow-xl rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between items-center text-center">
          <div className="p-4 bg-emerald-50 rounded-2xl mb-4">
            <img src={img38} alt="Dashboard" className="h-16 w-16 object-cover rounded-xl" />
          </div>
          <h3 className="text-2xl font-bold text-[#0f3423] mb-3">Analytics Dashboard</h3>
          <p className="text-emerald-950/70 text-base mb-6 leading-relaxed">
            Track crop performance metrics, auction bid logs, and loan application approval histories.
          </p>
          <a href="/dashboard" className="w-full bg-[#2e6f40] hover:bg-emerald-800 text-white font-semibold py-3 px-6 rounded-xl text-center shadow-md transition-all cursor-pointer">
            Go to Dashboard
          </a>
        </div>

        {/* Tool 5 */}
        <div className="bg-gradient-to-br from-white to-emerald-50/20 border border-emerald-500/10 hover:border-emerald-500/40 shadow-lg hover:shadow-xl rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between items-center text-center">
          <div className="p-4 bg-emerald-50 rounded-2xl mb-4">
            <img src={img40} alt="Loan Approval" className="h-16 w-16 object-cover rounded-xl" />
          </div>
          <h3 className="text-2xl font-bold text-[#0f3423] mb-3">Financial Assistance</h3>
          <p className="text-emerald-950/70 text-base mb-6 leading-relaxed">
            Fill out structured application forms for low-interest farming loans with document uploads.
          </p>
          <a href="/loan-form" className="w-full bg-[#2e6f40] hover:bg-emerald-800 text-white font-semibold py-3 px-6 rounded-xl text-center shadow-md transition-all cursor-pointer">
            Apply for Loan
          </a>
        </div>

        {/* Tool 6 */}
        <div className="bg-gradient-to-br from-white to-emerald-50/20 border border-emerald-500/10 hover:border-emerald-500/40 shadow-lg hover:shadow-xl rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between items-center text-center">
          <div className="p-4 bg-emerald-50 rounded-2xl mb-4">
            <img src={img34} alt="Risk Assessment" className="h-16 w-16 object-cover rounded-xl" />
          </div>
          <h3 className="text-2xl font-bold text-[#0f3423] mb-3">Risk Assessment</h3>
          <p className="text-emerald-950/70 text-base mb-6 leading-relaxed">
            Analyze soil variables and climate data to generate localized agricultural hazard reports.
          </p>
          <a href="/risk-assessment" className="w-full bg-[#2e6f40] hover:bg-emerald-800 text-white font-semibold py-3 px-6 rounded-xl text-center shadow-md transition-all cursor-pointer">
            Check Hazards
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;