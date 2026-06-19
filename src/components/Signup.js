import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/index.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' }); // type: 'success' or 'error'
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ text: '', type: '' });

    if (formData.password !== formData.confirmPassword) {
      setStatusMsg({ text: '❌ Passwords do not match. Please verify.', type: 'error' });
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
        setStatusMsg({ text: '✅ Registration successful! Redirecting to login...', type: 'success' });
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setStatusMsg({ text: `❌ ${data.message || 'Registration failed'}`, type: 'error' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setStatusMsg({ text: '🚨 Connection error: Server could not be reached', type: 'error' });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12 fadeInUp">
      <div className="bg-gradient-to-br from-amber-50/70 via-emerald-50/40 to-green-100/60 border-2 border-emerald-500/20 shadow-2xl p-10 rounded-3xl w-full max-w-md backdrop-blur-md relative overflow-hidden">
        {/* Decorative corner blur */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <svg 
              width="54" 
              height="54" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_4px_12px_rgba(82,183,136,0.5)]"
            >
              <path d="M2 22C2 13 8 4 17 2C17 2 13.5 8 13.5 13.5C13.5 19 19 19.5 22 22C13 22 5 20 2 22Z" fill="#52b788" />
              <path d="M13.5 13.5C10 13.5 6 17 5.5 21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-[#0f3423] tracking-tight">Create Profile</h2>
          <p className="text-emerald-950/70 text-sm mt-2">Join us to manage your farm profile, transactions, and auctions</p>
        </div>

        {/* Status Notification */}
        {statusMsg.text && (
          <div 
            className={`p-4 rounded-xl mb-6 text-sm font-semibold transition-all duration-300 ${
              statusMsg.type === 'success' 
                ? 'bg-emerald-500/10 text-emerald-800 border border-emerald-500/20' 
                : 'bg-red-500/10 text-red-800 border border-red-500/20'
            }`}
          >
            {statusMsg.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-emerald-950/80 mb-2">Username</label>
            <input
              type="text"
              name="username"
              placeholder="e.g. John Farmer"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/70 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-emerald-950/80 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@domain.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/70 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-emerald-950/80 mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create strong password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/70 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-emerald-950/80 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/70 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-medium"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-base shadow-lg shadow-emerald-700/20 hover:shadow-xl hover:shadow-emerald-700/30 transform hover:-translate-y-0.5 transition-all duration-300 mt-2 cursor-pointer"
          >
            Register Account
          </button>
        </form>

        {/* Login redirect */}
        <div className="text-center mt-6 pt-6 border-t border-emerald-500/15">
          <p className="text-sm text-emerald-950/60">
            Already have an active profile?{' '}
            <Link to="/login" className="font-bold text-emerald-700 hover:text-emerald-900 transition-colors">
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
