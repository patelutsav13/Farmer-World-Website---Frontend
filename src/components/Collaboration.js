import React, { useState } from 'react';
import '../styles/index.css';

const Collaboration = () => {
  const [startup, setStartup] = useState('');
  const [details, setDetails] = useState('');

  const showStartupDetails = () => {
    const startups = {
      CropX: '<h4>CropX</h4><p><strong>Technology:</strong> CropX is a soil sensing technology that helps farmers optimize irrigation and improve water use efficiency.</p><p><strong>Benefits:</strong> CropX provides real-time insights into soil health, reducing water waste and improving crop yield.</p>',
      AgroStar: '<h4>AgroStar</h4><p><strong>Technology:</strong> AgroStar provides a platform that connects farmers with a variety of agricultural products and services.</p><p><strong>Benefits:</strong> Farmers can access trusted products and expert advice, enhancing their productivity and crop quality.</p>',
      FarmLogs: '<h4>FarmLogs</h4><p><strong>Technology:</strong> FarmLogs is a farm management software that helps farmers track their crops, monitor weather, and manage finances.</p><p><strong>Benefits:</strong> It helps farmers make data-driven decisions to improve yields and profitability.</p>',
      JohnDeere: '<h4>John Deere</h4><p><strong>Technology:</strong> John Deere is a leader in manufacturing advanced agricultural machinery, including automated tractors and harvesters.</p><p><strong>Benefits:</strong> John Deere’s innovations help farmers automate their operations, reduce labor costs, and increase efficiency.</p>',
    };
    setDetails(startups[startup] || '<p>Select a startup to learn more.</p>');
  };

  return (
    <main className="p-5">
      <section className="content-section">
        <h3>Choose an Agri-Tech Startup</h3>
        <p>Explore and join Agri-Tech startups that are revolutionizing the agricultural industry.</p>
        <select value={startup} onChange={(e) => { setStartup(e.target.value); showStartupDetails(); }} className="form-section">
          <option value="">Select a Startup</option>
          <option value="CropX">CropX</option>
          <option value="AgroStar">AgroStar</option>
          <option value="FarmLogs">FarmLogs</option>
          <option value="JohnDeere">John Deere</option>
        </select>
        <div dangerouslySetInnerHTML={{ __html: details }} className="mt-4 p-4 bg-gray-100 rounded-md" />
      </section>
      <section className="content-section">
        <h3>Benefits of Agri-Tech Collaboration</h3>
        <p>By collaborating with Agri-Tech startups, farmers can access cutting-edge technologies that enhance crop yields, reduce waste, and streamline operations.</p>
        <ul>
          <li>Improved crop yields through data-driven insights</li>
          <li>Access to advanced machinery and tools</li>
          <li>Automated irrigation systems</li>
          <li>Reduced pesticide and fertilizer usage</li>
        </ul>
      </section>
      <section className="content-section">
        <h3>Resources for Farmers</h3>
        <p>We provide a range of resources to help you get started with Agri-Tech solutions:</p>
        <ul>
          <li>Online tutorials on smart farming techniques</li>
          <li>Webinars with industry experts</li>
          <li>Guides to understanding IoT in farming</li>
          <li>Case studies of successful Agri-Tech implementations</li>
        </ul>
      </section>
    </main>
  );
};

export default Collaboration;