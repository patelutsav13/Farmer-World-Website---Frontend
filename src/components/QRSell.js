import React from 'react';
import '../styles/index.css';

const QRSell = () => {
  return (
    <section className="p-5">
      <h2 className="text-2xl mb-4">Sell with QR Code</h2>
      <p>Generate a QR code to sell your farm products.</p>
      <img src="placeholder-qr.png" alt="QR Code" style={{ height: '150px', width: '150px' }} />
      <button className="cta-button mt-4">Generate QR Code</button>
    </section>
  );
};

export default QRSell;