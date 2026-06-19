import React, { useState } from 'react';
import '../styles/index.css';

const Payment = () => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add payment API integration here
    alert(`Payment of ${amount} submitted!`);
  };

  return (
    <section className="form-section p-5">
      <h2 className="text-2xl mb-4">Make a Payment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded w-full mb-4"
          required
        />
        <button type="submit" className="cta-button">Pay Now</button>
      </form>
    </section>
  );
};

export default Payment;