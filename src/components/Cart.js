import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/index.css';
import '../styles/cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    address: '',
    paymentType: ''
  });
  const [status, setStatus] = useState('');

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    axios.get('http://localhost:5001/api/cart', { withCredentials: true })
      .then(res => setCart(res.data.cart))
      .catch(err => setStatus('Error loading cart: ' + err.message));
  }, []);

  const placeOrder = () => {
    if (!form.name || !form.mobile || !form.address || !form.paymentType) {
      setStatus('Please fill out all fields including payment type.');
      return;
    }

    const orderData = {
      ...form,
      cart,
      totalAmount: totalPrice
    };

    axios.post('http://localhost:5001/api/order', orderData, { withCredentials: true })
      .then(() => {
        setStatus('✅ Order placed successfully!');
        setCart([]);
        setForm({ name: '', mobile: '', address: '', paymentType: '' });
      })
      .catch(err => {
        setStatus(err.response?.data?.message || '❌ Order failed.');
      });
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {cart.length === 0 && <p>Cart is empty.</p>}
      {cart.map((item, i) => (
        <div key={i} className="cart-item">
          {item.name} × {item.quantity} = ₹{item.price * item.quantity}
        </div>
      ))}

      {cart.length > 0 && (
        <h4 style={{ marginTop: '20px', fontWeight: 'bold' }}>
          🧾 Total Amount: ₹{totalPrice.toLocaleString()}
        </h4>
      )}

      <h3 style={{ marginTop: '30px', marginBottom: '10px' }}>Place Order</h3>

      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="cart-input"
      />
      <input
        placeholder="Mobile"
        value={form.mobile}
        onChange={e => setForm({ ...form, mobile: e.target.value })}
        className="cart-input"
      />
      <textarea
        placeholder="Address"
        value={form.address}
        onChange={e => setForm({ ...form, address: e.target.value })}
        className="cart-textarea"
      />
      <select
        value={form.paymentType}
        onChange={e => setForm({ ...form, paymentType: e.target.value })}
        className="cart-select"
      >
        <option value="">Select Payment Type</option>
        <option value="Cash">Cash</option>
        <option value="Card">Card</option>
        <option value="Online">Online</option>
      </select>

      <button onClick={placeOrder} className="order-button">
        ✅ Order Now
      </button>

      {status && <p className="order-status">{status}</p>}
    </div>
  );
};

export default Cart;
