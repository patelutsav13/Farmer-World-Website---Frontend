
import React, { useState } from 'react';
import '../styles/index.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:5003/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Signup successful');
        navigate('/login');
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('🚨 Server error during signup');
    }
  };

  return (
    <section className="form-section p-5">
      <h2 className="text-2xl mb-4">Signup</h2>
      <form onSubmit={handleSubmit} style={{"textAlign":'center'}}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="p-2 border rounded w-full mb-4" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border rounded w-full mb-4" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="p-2 border rounded w-full mb-4" required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="p-2 border rounded w-full mb-4" required />
        <button type="submit" className="cta-button">Signup</button>
      </form>
    </section>
  );
};

export default Signup;
