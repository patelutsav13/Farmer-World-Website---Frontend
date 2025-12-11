

import React, { useState } from 'react';
import '../styles/index.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5003/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user)); // ✅ only after success
        alert('✅ Login successful!');
        navigate('/dashboard');
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('🚨 Server error during login');
    }
  };

  return (
    <section className="form-section p-5">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded w-full mb-4"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Your Password"
          value={formData.password}
          onChange={handleChange}
          className="p-2 border rounded w-full mb-4"
          required
        />
        <button type="submit" className="cta-button">Login</button>
        <p style={{ marginTop: '10px' }}>
          <a href="/forgot-password">Forgot Password?</a>
        </p>

      </form>
    </section>
  );
};

export default Login;
