import React, { useState } from 'react';
import '../styles/index.css';
import '../styles/shopping.css';
import '../styles/cart.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

import img1 from '../assets/products/img1.jpg';
import img2 from '../assets/products/img2.jpg';
import img3 from '../assets/products/img3.jpg';
import img4 from '../assets/products/img4.jpg';
import img5 from '../assets/products/img5.jpg';
import img6 from '../assets/products/img6.jpg';
import img7 from '../assets/products/img7.jpg';
import img8 from '../assets/products/img8.jpg';
import img9 from '../assets/products/img9.jpg';
import img10 from '../assets/products/img10.jpg';
import img11 from '../assets/products/img11.jpg';
import img12 from '../assets/products/img12.jpg';
import img13 from '../assets/products/img13.jpg';
import img14 from '../assets/products/img14.jpg';
import img15 from '../assets/products/img15.jpg';
import img16 from '../assets/products/img16.jpg';
import img17 from '../assets/products/img17.jpg';
import img18 from '../assets/products/img18.jpg';
import img19 from '../assets/products/img19.jpg';
import img20 from '../assets/products/img20.jpg';
import img21 from '../assets/products/img21.jpg';
import img22 from '../assets/products/img22.jpg';
import img23 from '../assets/products/img23.jpg';
import img24 from '../assets/products/img24.jpg';

const Shopping = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const sections = [

    {
      title: 'Fertilizers',
      products: [
        { name: 'Urea Fertilizer (50kg)', price: 280, image: img9 },
        { name: 'DAP Fertilizer (50kg)', price: 1350, image: img10 },
        { name: 'Organic Compost', price: 600, image: img11 },
        { name: 'NPK 10:26:26', price: 1100, image: img12 },
        { name: 'Zinc Sulphate', price: 180, image: img13 },
        { name: 'Potash MOP', price: 950, image: img14 },
        { name: 'Micronutrient Ferti Mix', price: 650, image: img15 },
        { name: 'Cow Dung Powder', price: 400, image: img16 },
      ]
    },
    {
      title: 'Farm Medicines',
      products: [
        { name: 'Fungal Shield (1L)', price: 350, image: img17 },
        { name: 'Insect Killer (1L)', price: 420, image: img18 },
        { name: 'Herbicide Weedout', price: 360, image: img19 },
        { name: 'Neem Oil (500ml)', price: 180, image: img20 },
        { name: 'Root Booster', price: 290, image: img21 },
        { name: 'Bio Pesticide', price: 400, image: img22 },
        { name: 'Termite Control (500ml)', price: 520, image: img23 },
        { name: 'Bacterial Buster (2L)', price: 310, image: img24 },
      ]
    }
  ];

  const handleAddToCart = (product) => {
    axios.post('http://localhost:5001/api/cart', {
      productId: product.name,
      name: product.name,
      price: product.price
    }, { withCredentials: true })
      .then(() => alert(`${product.name} added to cart!`))
      .catch((err) => alert("Error adding to cart: " + err.message));
  };

  const filteredSections = sections.map(section => {
    const filteredProducts = section.products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...section, products: filteredProducts };
  }).filter(section => section.products.length > 0); // only sections with results

  return (
    <main className="p-5">
      {/* Top Right Cart & Search */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          style={{color:'blue' , height:'40px',width:'500px' ,fontFamily:'verdana',fontSize:'21px',fontWeight:'bold', marginRight:'20px'}}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-64"
        />

        <Link to="/cart">
          <button className="cart-button">
            🛒 View Cart
          </button>
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Farm Supplies Store</h2>

      {filteredSections.map((section, idx) => (
        <section key={idx} className="mb-10">
          <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
          <div className="product-grid">
            {section.products.map((product, index) => (
              <div key={index} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <h4 className="product-name">{product.name}</h4>
                <p className="product-price">₹{product.price.toLocaleString()}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="buy-button"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default Shopping;
