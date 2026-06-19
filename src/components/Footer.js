import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

const Footer = () => {
  return (
    <footer className="bg-[#0f3423] border-t border-emerald-500/25 text-white/90 py-16 px-8 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        {/* Column 1: Logo & Branding */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 22C2 13 8 4 17 2C17 2 13.5 8 13.5 13.5C13.5 19 19 19.5 22 22C13 22 5 20 2 22Z" fill="#52b788" />
              <path d="M13.5 13.5C10 13.5 6 17 5.5 21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-extrabold text-xl tracking-tight text-white">FarmerWorld</span>
          </div>
          <p className="text-emerald-100/70 text-sm leading-relaxed mb-6">
            Connecting growers directly with transparent auction markets, AI-powered agricultural advice, and secure financing.
          </p>
        </div>

        {/* Column 2: Navigate links */}
        <div>
          <h4 className="font-bold text-white text-md tracking-wider uppercase mb-6 border-b border-emerald-500/20 pb-2">
            Navigation
          </h4>
          <ul className="space-y-3 text-sm text-emerald-100/70">
            <li><Link to="/" className="hover:text-amber-300 transition-colors">Home Landing</Link></li>
            <li><Link to="/weather-risk" className="hover:text-amber-300 transition-colors">Weather Risk Analyzer</Link></li>
            <li><Link to="/auction" className="hover:text-amber-300 transition-colors">Crop Auction Hub</Link></li>
            <li><Link to="/collaboration" className="hover:text-amber-300 transition-colors">Collaboration Center</Link></li>
          </ul>
        </div>

        {/* Column 3: Features & Help */}
        <div>
          <h4 className="font-bold text-white text-md tracking-wider uppercase mb-6 border-b border-emerald-500/20 pb-2">
            Features & Tools
          </h4>
          <ul className="space-y-3 text-sm text-emerald-100/70">
            <li><Link to="/shopping" className="hover:text-amber-300 transition-colors">Agriculture E-Shop</Link></li>
            <li><Link to="/chatbot" className="hover:text-amber-300 transition-colors">AI Farmer Chatbot</Link></li>
            <li><Link to="/loan-form" className="hover:text-amber-300 transition-colors">Apply for Loans</Link></li>
            <li><Link to="/dashboard" className="hover:text-amber-300 transition-colors">Farmer Dashboard</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact & Policy */}
        <div>
          <h4 className="font-bold text-white text-md tracking-wider uppercase mb-6 border-b border-emerald-500/20 pb-2">
            Contact & Support
          </h4>
          <p className="text-emerald-100/70 text-sm mb-4">
            <strong>Email:</strong> support@farmerworld.org<br />
            <strong>Helpline:</strong> +91 1800-425-1800
          </p>
          <div className="flex gap-4 text-xs mt-6 text-emerald-100/50">
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-emerald-500/10 mt-12 pt-8 text-center text-xs text-emerald-100/40">
        <p>© 2026 FarmerWorld Organization. All Rights Reserved. Empowering local farming communities globally.</p>
      </div>
    </footer>
  );
};

export default Footer;