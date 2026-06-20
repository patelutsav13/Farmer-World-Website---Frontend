// import React, { useState } from 'react';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [status, setStatus] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('http://localhost:5003/api/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email })
//       });

//       const data = await res.json();
//       setStatus(data.message);
//     } catch (err) {
//       setStatus('Error sending reset link');
//     }
//   };

//   return (
//     <section className="form-section p-5">
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
//         <button type="submit" className="cta-button">Send Reset Link</button>
//       </form>
//       {status && <p>{status}</p>}
//     </section>
//   );
// };

// export default ForgotPassword;

import React, { useState } from 'react';
import API_BASE_URL from '../apiConfig';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      setStatus(data.message);
    } catch (err) {
      setStatus('Error sending reset link');
    }
  };

  return (
    <section className="form-section p-5">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
        <button type="submit" className="cta-button">Send Reset Link</button>
      </form>
      {status && <p>{status}</p>}
    </section>
  );
};

export default ForgotPassword;
