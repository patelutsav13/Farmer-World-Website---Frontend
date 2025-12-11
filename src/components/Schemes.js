import React from 'react';
import '../styles/index.css';

const Schemes = () => {
  return (
    <section className="p-5">
      <h2 className="text-2xl mb-4">Government Schemes</h2>
      <div className="feature-grid">
        <div>
          <h3>Crop Insurance</h3>
          <p>Protect your crops with government-backed insurance.</p>
          <a href="/crop-insurance" className="cta-button">Apply Now</a>
        </div>
        <div>
          <h3>Subsidies</h3>
          <p>Access subsidies for fertilizers and equipment.</p>
          <a href="/subsidies" className="cta-button">Learn More</a>
        </div>
      </div>
    </section>
  );
};

export default Schemes;