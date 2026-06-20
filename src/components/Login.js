// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import '../styles/index.css';

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [statusMsg, setStatusMsg] = useState({ text: '', type: '' }); // type: 'success' or 'error'
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatusMsg({ text: '', type: '' });

//     // Hardcoded Admin Bypass
//     if (formData.email === 'admin@agri.com' && formData.password === 'admin@123') {
//       const adminUser = { username: 'System Administrator', email: 'admin@agri.com', isAdmin: true };
//       localStorage.setItem('user', JSON.stringify(adminUser));
//       setStatusMsg({ text: '✅ Admin authentication success! Opening Admin Workspace...', type: 'success' });
//       setTimeout(() => {
//         navigate('/dashboard');
//       }, 1200);
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:5003/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem('user', JSON.stringify(data.user));
//         setStatusMsg({ text: '✅ Login successful! Redirecting...', type: 'success' });
//         setTimeout(() => {
//           navigate('/dashboard');
//         }, 1200);
//       } else {
//         setStatusMsg({ text: `❌ ${data.message || 'Invalid credentials'}`, type: 'error' });
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setStatusMsg({ text: '🚨 Connection error: Server could not be reached', type: 'error' });
//     }
//   };

//   return (
//     <div className="min-h-[70vh] flex items-center justify-center px-6 py-12 fadeInUp">
//       <div className="bg-gradient-to-br from-amber-50/70 via-emerald-50/40 to-green-100/60 border-2 border-emerald-500/20 shadow-2xl p-10 rounded-3xl w-full max-w-md backdrop-blur-md relative overflow-hidden">
//         {/* Decorative corner blur */}
//         <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

//         {/* Brand header */}
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <svg 
//               width="54" 
//               height="54" 
//               viewBox="0 0 24 24" 
//               fill="none" 
//               xmlns="http://www.w3.org/2000/svg"
//               className="drop-shadow-[0_4px_12px_rgba(82,183,136,0.5)]"
//             >
//               <path d="M2 22C2 13 8 4 17 2C17 2 13.5 8 13.5 13.5C13.5 19 19 19.5 22 22C13 22 5 20 2 22Z" fill="#52b788" />
//               <path d="M13.5 13.5C10 13.5 6 17 5.5 21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-extrabold text-[#0f3423] tracking-tight">Welcome Back</h2>
//           <p className="text-emerald-950/70 text-sm mt-2">Sign in to check auctions, AI reports, and loan status</p>
//         </div>

//         {/* Status Notification */}
//         {statusMsg.text && (
//           <div 
//             className={`p-4 rounded-xl mb-6 text-sm font-semibold transition-all duration-300 ${
//               statusMsg.type === 'success' 
//                 ? 'bg-emerald-500/10 text-emerald-800 border border-emerald-500/20' 
//                 : 'bg-red-500/10 text-red-800 border border-red-500/20'
//             }`}
//           >
//             {statusMsg.text}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-bold text-emerald-950/80 mb-2">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="name@domain.com"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/70 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-medium"
//               required
//             />
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-2">
//               <label className="text-sm font-bold text-emerald-950/80">Security Password</label>
//               <Link to="/forgot-password" className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors">
//                 Forgot Password?
//               </Link>
//             </div>
//             <input
//               type="password"
//               name="password"
//               placeholder="••••••••"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/70 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-medium"
//               required
//             />
//           </div>

//           <button 
//             type="submit" 
//             className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-base shadow-lg shadow-emerald-700/20 hover:shadow-xl hover:shadow-emerald-700/30 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
//           >
//             Sign In Account
//           </button>
//         </form>

//         {/* Register toggle */}
//         <div className="text-center mt-8 pt-6 border-t border-emerald-500/15">
//           <p className="text-sm text-emerald-950/60">
//             Don't have an agricultural profile yet?{' '}
//             <Link to="/signup" className="font-bold text-emerald-700 hover:text-emerald-900 transition-colors">
//               Create Profile
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';
import '../styles/index.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' }); // type: 'success' or 'error'
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ text: '', type: '' });

    // Hardcoded Admin Bypass
    if (formData.email === 'admin@agri.com' && formData.password === 'admin@123') {
      const adminUser = { username: 'System Administrator', email: 'admin@agri.com', isAdmin: true };
      localStorage.setItem('user', JSON.stringify(adminUser));
      setStatusMsg({ text: '✅ Admin authentication success! Opening Admin Workspace...', type: 'success' });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setStatusMsg({ text: '✅ Login successful! Redirecting...', type: 'success' });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1200);
      } else {
        setStatusMsg({ text: `❌ ${data.message || 'Invalid credentials'}`, type: 'error' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setStatusMsg({ text: '🚨 Connection error: Server could not be reached', type: 'error' });
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-12 fadeInUp">
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
          <h2 className="text-3xl font-extrabold text-[#0f3423] tracking-tight">Welcome Back</h2>
          <p className="text-emerald-950/70 text-sm mt-2">Sign in to check auctions, AI reports, and loan status</p>
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
        <form onSubmit={handleSubmit} className="space-y-5">
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
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-emerald-950/80">Security Password</label>
              <Link to="/forgot-password" className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/70 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-medium"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-base shadow-lg shadow-emerald-700/20 hover:shadow-xl hover:shadow-emerald-700/30 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            Sign In Account
          </button>
        </form>

        {/* Register toggle */}
        <div className="text-center mt-8 pt-6 border-t border-emerald-500/15">
          <p className="text-sm text-emerald-950/60">
            Don't have an agricultural profile yet?{' '}
            <Link to="/signup" className="font-bold text-emerald-700 hover:text-emerald-900 transition-colors">
              Create Profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
