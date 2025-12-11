import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/terms">Terms of Service</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
      <p>© 2025 Farm Agro Smart. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;