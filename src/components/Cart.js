// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [form, setForm] = useState({
//     name: '',
//     mobile: '',
//     address: '',
//     paymentType: ''
//   });
//   const [status, setStatus] = useState('');

//   const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   useEffect(() => {
//     axios.get('http://localhost:5001/api/cart', { withCredentials: true })
//       .then(res => setCart(res.data.cart))
//       .catch(err => setStatus('Error loading cart: ' + err.message));
//   }, []);

//   const placeOrder = () => {
//     if (!form.name || !form.mobile || !form.address || !form.paymentType) {
//       setStatus('❌ Please fill out all fields including payment type.');
//       return;
//     }

//     const orderData = {
//       ...form,
//       cart,
//       totalAmount: totalPrice
//     };

//     axios.post('http://localhost:5001/api/order', orderData, { withCredentials: true })
//       .then(() => {
//         setStatus('✅ Order placed successfully!');
//         setCart([]);
//         setForm({ name: '', mobile: '', address: '', paymentType: '' });
//       })
//       .catch(err => {
//         setStatus(err.response?.data?.message || '❌ Order failed.');
//       });
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-6 py-12 fadeInUp">
//       <div className="bg-white border border-emerald-500/10 shadow-2xl p-8 md:p-10 rounded-3xl relative overflow-hidden">
//         {/* Header */}
//         <h2 className="text-3xl font-extrabold text-[#0f3423] text-center mb-8 flex items-center justify-center gap-3">
//           <span>🛒</span> Your Shopping Cart
//         </h2>

//         {cart.length === 0 ? (
//           <p className="text-center text-emerald-950/60 font-semibold py-12">Your cart is empty. Explore our shop to add items.</p>
//         ) : (
//           <div className="space-y-4 mb-8">
//             {cart.map((item, i) => (
//               <div key={i} className="flex justify-between items-center p-4 border border-emerald-500/10 rounded-xl bg-emerald-50/10">
//                 <div>
//                   <h4 className="font-bold text-lg text-[#0f3423]">{item.name}</h4>
//                   <p className="text-sm text-emerald-950/60 font-medium">Quantity: {item.quantity}</p>
//                 </div>
//                 <div className="font-extrabold text-lg text-emerald-700">₹{(item.price * item.quantity).toLocaleString()}</div>
//               </div>
//             ))}

//             <div className="flex justify-between items-center p-6 bg-emerald-950 text-white rounded-2xl mt-6">
//               <span className="font-bold text-lg">Total Estimated Cost:</span>
//               <span className="font-black text-2xl text-[#f5cf65]">₹{totalPrice.toLocaleString()}</span>
//             </div>
//           </div>
//         )}

//         {cart.length > 0 && (
//           <div className="mt-10 border-t border-emerald-500/15 pt-8">
//             {/* Delivery Info Form with Dynamic Styling & Logo */}
//             <div className="bg-gradient-to-br from-amber-50/70 via-emerald-50/40 to-green-100/60 border-2 border-emerald-500/20 shadow-xl p-8 rounded-3xl relative">
//               {/* App Logo */}
//               <div className="flex justify-center mb-6">
//                 <svg 
//                   width="44" 
//                   height="44" 
//                   viewBox="0 0 24 24" 
//                   fill="none" 
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="drop-shadow-[0_4px_8px_rgba(82,183,136,0.4)]"
//                 >
//                   <path d="M2 22C2 13 8 4 17 2C17 2 13.5 8 13.5 13.5C13.5 19 19 19.5 22 22C13 22 5 20 2 22Z" fill="#52b788" />
//                   <path d="M13.5 13.5C10 13.5 6 17 5.5 21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
//                 </svg>
//               </div>

//               <h3 className="text-2xl font-black text-[#0f3423] text-center mb-6">Delivery Information</h3>
              
//               <div className="space-y-5">
//                 <div>
//                   <label className="block text-sm font-bold text-emerald-950/80 mb-2">Customer Full Name</label>
//                   <input
//                     type="text"
//                     placeholder="Enter your full name"
//                     value={form.name}
//                     onChange={e => setForm({ ...form, name: e.target.value })}
//                     className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-bold text-emerald-950/80 mb-2">Mobile Number</label>
//                   <input
//                     type="text"
//                     placeholder="Enter 10-digit mobile number"
//                     value={form.mobile}
//                     onChange={e => setForm({ ...form, mobile: e.target.value })}
//                     className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-bold text-emerald-950/80 mb-2">Shipping Address</label>
//                   <textarea
//                     placeholder="Enter complete delivery address"
//                     value={form.address}
//                     onChange={e => setForm({ ...form, address: e.target.value })}
//                     rows="3"
//                     className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-bold text-emerald-950/80 mb-2">Payment Method</label>
//                   <select
//                     value={form.paymentType}
//                     onChange={e => setForm({ ...form, paymentType: e.target.value })}
//                     className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-emerald-950"
//                   >
//                     <option value="">Select Payment Type</option>
//                     <option value="Cash">Cash on Delivery (COD)</option>
//                     <option value="Card">Credit/Debit Card</option>
//                     <option value="Online">UPI / NetBanking</option>
//                   </select>
//                 </div>

//                 <button 
//                   onClick={placeOrder} 
//                   className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-base shadow-lg shadow-emerald-700/20 hover:shadow-xl hover:shadow-emerald-700/30 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
//                 >
//                   Place Secure Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {status && (
//           <div 
//             className={`mt-6 p-4 rounded-xl font-bold text-sm text-center border transition-all duration-300 ${
//               status.startsWith('✅') 
//                 ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20' 
//                 : 'bg-red-500/10 text-red-800 border-red-500/20'
//             }`}
//           >
//             {status}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
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
    axios.get(`${API_BASE_URL}/api/cart`, { withCredentials: true })
      .then(res => setCart(res.data.cart))
      .catch(err => setStatus('Error loading cart: ' + err.message));
  }, []);
  const placeOrder = () => {
    if (!form.name || !form.mobile || !form.address || !form.paymentType) {
      setStatus('❌ Please fill out all fields including payment type.');
      return;
    }
    const orderData = {
      ...form,
      cart,
      totalAmount: totalPrice
    };
    axios.post(`${API_BASE_URL}/api/order`, orderData, { withCredentials: true })
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
    <div className="max-w-4xl mx-auto px-6 py-12 fadeInUp">
      <div className="bg-white border border-emerald-500/10 shadow-2xl p-8 md:p-10 rounded-3xl relative overflow-hidden">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-[#0f3423] text-center mb-8 flex items-center justify-center gap-3">
          <span>🛒</span> Your Shopping Cart
        </h2>
        {cart.length === 0 ? (
          <p className="text-center text-emerald-950/60 font-semibold py-12">Your cart is empty. Explore our shop to add items.</p>
        ) : (
          <div className="space-y-4 mb-8">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between items-center p-4 border border-emerald-500/10 rounded-xl bg-emerald-50/10">
                <div>
                  <h4 className="font-bold text-lg text-[#0f3423]">{item.name}</h4>
                  <p className="text-sm text-emerald-950/60 font-medium">Quantity: {item.quantity}</p>
                </div>
                <div className="font-extrabold text-lg text-emerald-700">₹{(item.price * item.quantity).toLocaleString()}</div>
              </div>
            ))}
            <div className="flex justify-between items-center p-6 bg-emerald-950 text-white rounded-2xl mt-6">
              <span className="font-bold text-lg">Total Estimated Cost:</span>
              <span className="font-black text-2xl text-[#f5cf65]">₹{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        )}
        {cart.length > 0 && (
          <div className="mt-10 border-t border-emerald-500/15 pt-8">
            {/* Delivery Info Form with Dynamic Styling & Logo */}
            <div className="bg-gradient-to-br from-amber-50/70 via-emerald-50/40 to-green-100/60 border-2 border-emerald-500/20 shadow-xl p-8 rounded-3xl relative">
              {/* App Logo */}
              <div className="flex justify-center mb-6">
                <svg 
                  width="44" 
                  height="44" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-[0_4px_8px_rgba(82,183,136,0.4)]"
                >
                  <path d="M2 22C2 13 8 4 17 2C17 2 13.5 8 13.5 13.5C13.5 19 19 19.5 22 22C13 22 5 20 2 22Z" fill="#52b788" />
                  <path d="M13.5 13.5C10 13.5 6 17 5.5 21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-[#0f3423] text-center mb-6">Delivery Information</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-emerald-950/80 mb-2">Customer Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-emerald-950/80 mb-2">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="Enter 10-digit mobile number"
                    value={form.mobile}
                    onChange={e => setForm({ ...form, mobile: e.target.value })}
                    className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-emerald-950/80 mb-2">Shipping Address</label>
                  <textarea
                    placeholder="Enter complete delivery address"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    rows="3"
                    className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-emerald-950/80 mb-2">Payment Method</label>
                  <select
                    value={form.paymentType}
                    onChange={e => setForm({ ...form, paymentType: e.target.value })}
                    className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-emerald-950"
                  >
                    <option value="">Select Payment Type</option>
                    <option value="Cash">Cash on Delivery (COD)</option>
                    <option value="Card">Credit/Debit Card</option>
                    <option value="Online">UPI / NetBanking</option>
                  </select>
                </div>
                <button 
                  onClick={placeOrder} 
                  className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-base shadow-lg shadow-emerald-700/20 hover:shadow-xl hover:shadow-emerald-700/30 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  Place Secure Order
                </button>
              </div>
            </div>
          </div>
        )}
        {status && (
          <div 
            className={`mt-6 p-4 rounded-xl font-bold text-sm text-center border transition-all duration-300 ${
              status.startsWith('✅') 
                ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20' 
                : 'bg-red-500/10 text-red-800 border-red-500/20'
            }`}
          >
            {status}
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
