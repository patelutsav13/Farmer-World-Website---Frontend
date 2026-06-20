// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// import img9 from '../assets/products/img9.jpg';
// import img10 from '../assets/products/img10.jpg';
// import img11 from '../assets/products/img11.jpg';
// import img12 from '../assets/products/img12.jpg';
// import img13 from '../assets/products/img13.jpg';
// import img14 from '../assets/products/img14.jpg';
// import img15 from '../assets/products/img15.jpg';
// import img16 from '../assets/products/img16.jpg';
// import img17 from '../assets/products/img17.jpg';
// import img18 from '../assets/products/img18.jpg';
// import img19 from '../assets/products/img19.jpg';
// import img20 from '../assets/products/img20.jpg';
// import img21 from '../assets/products/img21.jpg';
// import img22 from '../assets/products/img22.jpg';
// import img23 from '../assets/products/img23.jpg';
// import img24 from '../assets/products/img24.jpg';

// const Shopping = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [notification, setNotification] = useState({ text: '', type: '' });

//   const sections = [
//     {
//       title: 'Premium Fertilizers',
//       products: [
//         { name: 'Urea Fertilizer (50kg)', price: 280, image: img9 },
//         { name: 'DAP Fertilizer (50kg)', price: 1350, image: img10 },
//         { name: 'Organic Compost', price: 600, image: img11 },
//         { name: 'NPK 10:26:26', price: 1100, image: img12 },
//         { name: 'Zinc Sulphate', price: 180, image: img13 },
//         { name: 'Potash MOP', price: 950, image: img14 },
//         { name: 'Micronutrient Ferti Mix', price: 650, image: img15 },
//         { name: 'Cow Dung Powder', price: 400, image: img16 },
//       ]
//     },
//     {
//       title: 'Organic Farm Medicines',
//       products: [
//         { name: 'Fungal Shield (1L)', price: 350, image: img17 },
//         { name: 'Insect Killer (1L)', price: 420, image: img18 },
//         { name: 'Herbicide Weedout', price: 360, image: img19 },
//         { name: 'Neem Oil (500ml)', price: 180, image: img20 },
//         { name: 'Root Booster', price: 290, image: img21 },
//         { name: 'Bio Pesticide', price: 400, image: img22 },
//         { name: 'Termite Control (500ml)', price: 520, image: img23 },
//         { name: 'Bacterial Buster (2L)', price: 310, image: img24 },
//       ]
//     }
//   ];

//   const handleAddToCart = (product) => {
//     setNotification({ text: '', type: '' });
//     axios.post('http://localhost:5001/api/cart', {
//       productId: product.name,
//       name: product.name,
//       price: product.price
//     }, { withCredentials: true })
//       .then(() => {
//         setNotification({ text: `🛒 ${product.name} successfully added to your cart!`, type: 'success' });
//         setTimeout(() => setNotification({ text: '', type: '' }), 3000);
//       })
//       .catch((err) => {
//         setNotification({ text: `❌ Failed to add to cart: ${err.message}`, type: 'error' });
//       });
//   };

//   const filteredSections = sections.map(section => {
//     const filteredProducts = section.products.filter(p =>
//       p.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     return { ...section, products: filteredProducts };
//   }).filter(section => section.products.length > 0);

//   return (
//     <main className="max-w-7xl mx-auto px-6 py-10 bg-[#fbfdf9] min-h-screen">
//       {/* Top Controls & Navigation */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 pb-6 border-b border-emerald-500/15">
//         <div className="w-full md:w-auto relative">
//           <input
//             type="text"
//             placeholder="Search crop supplies..."
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//             className="w-full md:w-96 pl-12 pr-4 py-3 border-2 border-emerald-500/20 rounded-2xl focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-base font-semibold text-emerald-950 transition-all placeholder-emerald-900/40 bg-white"
//           />
//           <svg className="absolute left-4 top-3.5 h-5 w-5 text-emerald-900/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>

//         <Link to="/cart" className="w-full md:w-auto">
//           <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg shadow-emerald-700/10 hover:shadow-emerald-700/20 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
//             🛒 View Cart Page
//           </button>
//         </Link>
//       </div>

//       {/* Title */}
//       <div className="text-center mb-12">
//         <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">Supplies Store</span>
//         <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f3423] mt-2">Premium Agricultural Store</h2>
//       </div>

//       {/* Inline Toast Notification */}
//       {notification.text && (
//         <div 
//           className={`max-w-xl mx-auto p-4 mb-8 text-center rounded-2xl font-bold text-sm shadow-md transition-all duration-300 border ${
//             notification.type === 'success' 
//               ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20' 
//               : 'bg-red-500/10 text-red-800 border-red-500/20'
//           }`}
//         >
//           {notification.text}
//         </div>
//       )}

//       {/* Categories & Products */}
//       {filteredSections.map((section, idx) => (
//         <section key={idx} className="mb-12">
//           <h3 className="text-2xl font-extrabold text-[#0f3423] mb-6 pl-2 border-l-4 border-emerald-500">{section.title}</h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {section.products.map((product, index) => (
//               <div 
//                 key={index} 
//                 className="bg-white border border-emerald-500/10 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5"
//               >
//                 <div className="h-48 w-full rounded-xl overflow-hidden mb-4 border border-emerald-500/5">
//                   <img 
//                     src={product.image} 
//                     alt={product.name} 
//                     className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
//                   />
//                 </div>
                
//                 <div>
//                   <h4 className="text-xl font-bold text-[#0f3423] leading-snug mb-2">{product.name}</h4>
//                   <p className="text-2xl font-black text-emerald-700 mb-6">₹{product.price.toLocaleString()}</p>
//                 </div>

//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   className="w-full bg-[#f5cf65] hover:bg-[#e0b038] text-emerald-950 font-extrabold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer transform active:scale-95"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>
//       ))}
//     </main>
//   );
// };

// export default Shopping;
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';

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
  const [notification, setNotification] = useState({ text: '', type: '' });

  const sections = [
    {
      title: 'Premium Fertilizers',
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
      title: 'Organic Farm Medicines',
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
    setNotification({ text: '', type: '' });
    axios.post(`${API_BASE_URL}/api/cart`, {
      productId: product.name,
      name: product.name,
      price: product.price
    }, { withCredentials: true })
      .then(() => {
        setNotification({ text: `🛒 ${product.name} successfully added to your cart!`, type: 'success' });
        setTimeout(() => setNotification({ text: '', type: '' }), 3000);
      })
      .catch((err) => {
        setNotification({ text: `❌ Failed to add to cart: ${err.message}`, type: 'error' });
      });
  };

  const filteredSections = sections.map(section => {
    const filteredProducts = section.products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...section, products: filteredProducts };
  }).filter(section => section.products.length > 0);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 bg-[#fbfdf9] min-h-screen">
      {/* Top Controls & Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 pb-6 border-b border-emerald-500/15">
        <div className="w-full md:w-auto relative">
          <input
            type="text"
            placeholder="Search crop supplies..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full md:w-96 pl-12 pr-4 py-3 border-2 border-emerald-500/20 rounded-2xl focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-base font-semibold text-emerald-950 transition-all placeholder-emerald-900/40 bg-white"
          />
          <svg className="absolute left-4 top-3.5 h-5 w-5 text-emerald-900/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <Link to="/cart" className="w-full md:w-auto">
          <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg shadow-emerald-700/10 hover:shadow-emerald-700/20 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
            🛒 View Cart Page
          </button>
        </Link>
      </div>

      {/* Title */}
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">Supplies Store</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f3423] mt-2">Premium Agricultural Store</h2>
      </div>

      {/* Inline Toast Notification */}
      {notification.text && (
        <div 
          className={`max-w-xl mx-auto p-4 mb-8 text-center rounded-2xl font-bold text-sm shadow-md transition-all duration-300 border ${
            notification.type === 'success' 
              ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20' 
              : 'bg-red-500/10 text-red-800 border-red-500/20'
          }`}
        >
          {notification.text}
        </div>
      )}

      {/* Categories & Products */}
      {filteredSections.map((section, idx) => (
        <section key={idx} className="mb-12">
          <h3 className="text-2xl font-extrabold text-[#0f3423] mb-6 pl-2 border-l-4 border-emerald-500">{section.title}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {section.products.map((product, index) => (
              <div 
                key={index} 
                className="bg-white border border-emerald-500/10 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5"
              >
                <div className="h-48 w-full rounded-xl overflow-hidden mb-4 border border-emerald-500/5">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                  />
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-[#0f3423] leading-snug mb-2">{product.name}</h4>
                  <p className="text-2xl font-black text-emerald-700 mb-6">₹{product.price.toLocaleString()}</p>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-[#f5cf65] hover:bg-[#e0b038] text-emerald-950 font-extrabold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer transform active:scale-95"
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
