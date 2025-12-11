import React from 'react';
import '../styles/index.css';
import'../styles/LoanForm.css';
import img35 from '../assets/products/img35.jpg';
import img36 from '../assets/products/img36.jpg';
import img37 from '../assets/products/img37.jpg';
import img38 from '../assets/products/img38.png';
import img40 from '../assets/products/img40.jpg';

const FeatureGrid = () => {
  return (
    <section className="feature-grid">
      <div>
        <img src={img35} alt="Banking" style={{ height: '90px', width: '90px' }} />
        <h3>Weather Updates</h3>
        <p>Manage your farm finances seamlessly.</p>
        <a href="/WeathUpdates" className="cta-button">Weather Updates</a>
      </div>
      <div>
        <img src={img36} alt="Chatbot" style={{ height: '90px', width: '90px' }} />
        <h3>AI Chatbot</h3>
        <p>Get instant support and farm advice through our chatbot.</p>
        <a href="/chatbot" className="cta-button">Chatbot</a>
      </div>
      <div>
        <img src={img37} alt="Collaboration" style={{ height: '90px', width: '90px' }} />
        <h3>Collaboration</h3>
        <p>Collaborate with other farmers for better productivity.</p>
        <a href="/collaboration" className="cta-button">Collaboration</a>
      </div>
      <div>
        <img src={img38} alt="Dashboard" style={{ height: '90px', width: '90px' }} />
        <h3>Dashboard</h3>
        <p>Track your farm’s progress with real-time data.</p>
        <a href="/dashboard" className="cta-button">Dashboard</a>
      </div>
      <div>
        <img src={img40} alt="Dashboard" style={{ height: '90px', width: '90px' }} />
        <h3>Loan Approval</h3>
        <p>Fill Form Of Appley For Loan.</p>
        <a href="/loan-form" className="cta-button">Apply for Loan</a>

      </div>
    </section>
  );
};

export default FeatureGrid;