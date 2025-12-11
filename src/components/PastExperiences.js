import React from 'react';
import '../styles/index.css';

const PastExperiences = () => {
  return (
    <section className="p-5">
      <h2 className="text-2xl mb-4">Past Experiences</h2>
      <div className="feature-grid">
        <div>
          <h3>Farmer Testimonial</h3>
          <p>"Using FarmSmart doubled my crop yield!" - John Doe</p>
        </div>
        <div>
          <h3>Success Story</h3>
          <p>"Sold my produce easily through the platform." - Jane Smith</p>
        </div>
      </div>
    </section>
  );
};

export default PastExperiences;