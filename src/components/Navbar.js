import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/index.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.isAdmin || user?.email === 'admin@agri.com';
  const dashboardLabel = isAdmin ? "Admin Panel" : "Dashboard";

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center py-4 px-10 bg-emerald-950/90 border-b border-emerald-500/20 sticky top-0 z-50 backdrop-blur-md">
      {/* Brand logo container */}
      <NavLink to="/" className="brand-container flex items-center gap-3 no-underline">
        {/* Premium SVG Leaf Logo */}
        <svg 
          width="36" 
          height="36" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_8px_rgba(82,183,136,0.4)]"
        >
          <path 
            d="M2 22C2 13 8 4 17 2C17 2 13.5 8 13.5 13.5C13.5 19 19 19.5 22 22C13 22 5 20 2 22Z" 
            fill="#52b788" 
          />
          <path 
            d="M13.5 13.5C10 13.5 6 17 5.5 21" 
            stroke="#ffffff" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
          />
        </svg>
        <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-[#52b788] bg-clip-text text-transparent">FarmerWorld</span>
      </NavLink>

      {/* Hamburger menu button for small screens */}
      <button className="hamburger-btn block lg:hidden text-white bg-transparent border-none cursor-pointer p-2" onClick={toggleMenu} aria-label="Toggle Navigation Menu">
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {isOpen ? (
            <line x1="18" y1="6" x2="6" y2="18"></line>
          ) : (
            <>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </>
          )}
        </svg>
      </button>

      {/* Navigation menu list */}
      <div className={`nav-menu flex items-center gap-2 lg:gap-3 ${isOpen ? 'mobile-open active-mobile' : ''}`}>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>Home</NavLink>
        <NavLink to="/weather-risk" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>Weather Risk</NavLink>
        <NavLink to="/auction" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>Auction</NavLink>
        <NavLink to="/collaboration" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>Collaboration</NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>{dashboardLabel}</NavLink>
        <NavLink to="/shopping" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>Shop</NavLink>
        <NavLink to="/chatbot" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>AI Chatbot</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>About Us</NavLink>
        
        {user ? (
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-red-500/40 hover:border-red-500 hover:bg-red-500/10 text-red-200 hover:text-white rounded-xl transition-all duration-300 font-semibold text-sm"
          >
            {/* Exit Icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </button>
        ) : (
          <NavLink 
            to="/login" 
            className={({ isActive }) => isActive ? "active" : ""} 
            onClick={() => setIsOpen(false)} 
            style={{ border: '1px solid rgba(82, 183, 136, 0.4)', borderRadius: '6px' }}
          >
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;