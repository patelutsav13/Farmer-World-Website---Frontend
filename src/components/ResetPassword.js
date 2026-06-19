import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5003/api/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      setStatus(data.message);
      if (res.ok) {
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      setStatus('Error resetting password');
    }
  };

  return (
    <section className="form-section p-5">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" required />
        <button type="submit" className="cta-button">Reset Password</button>
      </form>
      {status && <p>{status}</p>}
    </section>
  );
};

export default ResetPassword;
