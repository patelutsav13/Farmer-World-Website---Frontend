import React from 'react';
import '../styles/index.css';

const RiskAssessment = () => {
  return (
    <section className="p-5">
      <h2 className="text-2xl mb-4">Risk Assessment</h2>
      <div className="feature-grid">
        <div>
          <h3>Weather Risk</h3>
          <p>Analyze potential weather impacts on your crops.</p>
          <a href="/weather-risk" className="cta-button">Assess Now</a>
        </div>
        <div>
          <h3>Market Risk</h3>
          <p>Evaluate market trends for your produce.</p>
          <a href="/market-risk" className="cta-button">Assess Now</a>
        </div>
      </div>
    </section>
  );
};

export default RiskAssessment;