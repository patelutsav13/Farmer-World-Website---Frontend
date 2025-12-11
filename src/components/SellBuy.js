import React, { useState } from 'react';
import '../styles/index.css';

const SellBuy = () => {
  const [product, setProduct] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API call to list product
    alert(`Listed product: ${product}`);
  };

  return (
    <section className="form-section p-5">
      <h2 className="text-2xl mb-4">Buy/Sell Products</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="product"
          placeholder="Product Name (e.g., Wheat)"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="p-2 border rounded w-full mb-4"
          required
        />
        <button type="submit" className="cta-button">List Product</button>
      </form>
      <div className="mt-4">
        <h3>Available Products</h3>
        <p>Wheat - $10/kg</p>
        <p>Rice - $12/kg</p>
      </div>
    </section>
  );
};

export default SellBuy;