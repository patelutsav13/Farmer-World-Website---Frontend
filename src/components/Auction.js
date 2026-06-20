// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Auction = () => {
//   const navigate = useNavigate();
  
//   // Available slots fetched from DB
//   const [slots, setSlots] = useState([]);
//   const [selectedSlotId, setSelectedSlotId] = useState('');
  
//   const [formData, setFormData] = useState({
//     city: '',
//     date: '',
//     crop: '',
//     qunt: '',
//     name: '',
//     mobile: '',
//     aadhar: ''
//   });

//   const [status, setStatus] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Fetch slots on load
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/auction/slots')
//       .then(res => {
//         setSlots(res.data);
//       })
//       .catch(err => {
//         console.error('Failed to load slots:', err);
//         setStatus('⚠️ Error loading active auction slots. Please try again.');
//       });
//   }, []);

//   // When a slot is selected, pre-populate associated fields
//   const handleSlotChange = (e) => {
//     const slotId = e.target.value;
//     setSelectedSlotId(slotId);
    
//     if (slotId) {
//       const selected = slots.find(s => s._id === slotId);
//       if (selected) {
//         if (selected.remainingCapacity <= 0) {
//           setStatus('🚨 Warning: This slot is fully booked!');
//         } else {
//           setStatus('');
//         }
//         setFormData(prev => ({
//           ...prev,
//           city: selected.area,
//           crop: selected.crop,
//           date: selected.date
//         }));
//       }
//     } else {
//       setSelectedSlotId('');
//       setStatus('');
//       setFormData(prev => ({
//         ...prev,
//         city: '',
//         crop: '',
//         date: ''
//       }));
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatus('');

//     if (!formData.city || !formData.date || !formData.crop || !formData.qunt || !formData.name || !formData.mobile || !formData.aadhar) {
//       setStatus('⚠️ Please fill in all fields.');
//       setLoading(false);
//       return;
//     }

//     if (!/^\d{10}$/.test(formData.mobile)) {
//       setStatus('⚠️ Mobile number must be 10 digits.');
//       setLoading(false);
//       return;
//     }

//     if (!/^\d{12}$/.test(formData.aadhar)) {
//       setStatus('⚠️ Aadhar number must be 12 digits.');
//       setLoading(false);
//       return;
//     }

//     // Check slot capacity again on client side
//     if (selectedSlotId) {
//       const selected = slots.find(s => s._id === selectedSlotId);
//       if (selected && selected.remainingCapacity <= 0) {
//         setStatus('🚨 This auction slot is full! You cannot book slots that are full.');
//         setLoading(false);
//         return;
//       }
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/auction/appointment', {
//         ...formData,
//         slotId: selectedSlotId
//       }, {
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' }
//       });

//       // Save to localStorage (User's private logs)
//       const stored = JSON.parse(localStorage.getItem('auctionAppointments') || '[]');
//       const updated = [...stored, response.data.appointment];
//       localStorage.setItem('auctionAppointments', JSON.stringify(updated));

//       setStatus(`✅ Appointment booked successfully! Confirmation ID: ${response.data.appointmentId}`);
      
//       setFormData({
//         city: '',
//         date: '',
//         crop: '',
//         qunt: '',
//         name: '',
//         mobile: '',
//         aadhar: ''
//       });
//       setSelectedSlotId('');

//       // Redirect to Appointments page after 1.5 seconds
//       setTimeout(() => {
//         navigate('/appointments');
//       }, 1500);

//     } catch (error) {
//       console.error('Submission Error:', error);
//       setStatus(`❌ ${error.response?.data?.message || 'Failed to book appointment.'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="max-w-4xl mx-auto px-6 py-12">
//       <div className="bg-white border border-emerald-500/10 shadow-2xl p-8 md:p-12 rounded-3xl relative overflow-hidden">
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
//           <h2 className="text-3xl font-extrabold text-[#0f3423] tracking-tight">📅 Book Auction Appointment</h2>
//           <p className="text-emerald-950/70 text-sm mt-2">Book a guaranteed entry slot to bid or sell crops at auction areas</p>
//         </div>

//         {/* Display Active Admin Slots */}
//         <div className="mb-8">
//           <label className="block text-base font-bold text-emerald-950/90 mb-3">Select Scheduled Auction Slot</label>
//           <select
//             value={selectedSlotId}
//             onChange={handleSlotChange}
//             className="w-full p-4 border border-emerald-500/25 rounded-xl bg-emerald-50/10 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-emerald-950"
//           >
//             <option value="">-- Choose an active slot (Prepopulates form) --</option>
//             {slots.map((slot) => {
//               const isFull = slot.remainingCapacity <= 0;
//               return (
//                 <option 
//                   key={slot._id} 
//                   value={slot._id}
//                   className={isFull ? "text-red-500 font-bold" : "text-emerald-950"}
//                 >
//                   {slot.crop} at {slot.area} | {slot.date} @ {slot.time} ({slot.remainingCapacity}/{slot.capacity} slots left) {isFull ? "[FULL]" : ""}
//                 </option>
//               );
//             })}
//           </select>
//         </div>

//         {/* Slot Full Block Warning */}
//         {selectedSlotId && slots.find(s => s._id === selectedSlotId)?.remainingCapacity <= 0 && (
//           <div className="p-4 mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-800 font-extrabold text-sm text-center">
//             ⚠️ This slot is full! Submissions are locked for this slot. Please select another slot.
//           </div>
//         )}

//         {/* Form Container with Slight Creamy/Green Gradient Shading */}
//         <form 
//           onSubmit={handleSubmit} 
//           className={`bg-gradient-to-br from-amber-50/70 via-emerald-50/40 to-green-100/60 border-2 border-emerald-500/20 shadow-lg p-6 md:p-8 rounded-3xl space-y-5 transition-all duration-300 ${
//             selectedSlotId && slots.find(s => s._id === selectedSlotId)?.remainingCapacity <= 0 ? 'opacity-50 pointer-events-none' : ''
//           }`}
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div>
//               <label className="block text-sm font-bold text-emerald-950/80 mb-2">Auction Area / City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 placeholder="e.g. Mumbai"
//                 readOnly={!!selectedSlotId}
//                 className={`w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none text-sm font-medium ${
//                   !!selectedSlotId ? 'bg-emerald-50/40 text-emerald-900/60' : 'focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10'
//                 }`}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-bold text-emerald-950/80 mb-2">Crop Name</label>
//               <input
//                 type="text"
//                 name="crop"
//                 value={formData.crop}
//                 onChange={handleChange}
//                 placeholder="e.g. Wheat"
//                 readOnly={!!selectedSlotId}
//                 className={`w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none text-sm font-medium ${
//                   !!selectedSlotId ? 'bg-emerald-50/40 text-emerald-900/60' : 'focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10'
//                 }`}
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div>
//               <label className="block text-sm font-bold text-emerald-950/80 mb-2">Auction Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 min={new Date().toISOString().split('T')[0]}
//                 readOnly={!!selectedSlotId}
//                 className={`w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none text-sm font-medium ${
//                   !!selectedSlotId ? 'bg-emerald-50/40 text-emerald-900/60' : 'focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10'
//                 }`}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-bold text-emerald-950/80 mb-2">Crop Quantity (in KG)</label>
//               <input
//                 type="number"
//                 name="qunt"
//                 value={formData.qunt}
//                 onChange={handleChange}
//                 placeholder="Enter weight in kg"
//                 className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
//                 required
//               />
//             </div>
//           </div>

//           <div className="border-t border-emerald-500/15 pt-5">
//             <h4 className="text-base font-bold text-[#0f3423] mb-4">Farmer Contact Details</h4>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-bold text-emerald-950/80 mb-2">Your Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter full name"
//                   className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div>
//                   <label className="block text-sm font-bold text-emerald-950/80 mb-2">10-Digit Mobile Number</label>
//                   <input
//                     type="text"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     placeholder="Enter mobile number"
//                     className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-bold text-emerald-950/80 mb-2">12-Digit Aadhar Number</label>
//                   <input
//                     type="text"
//                     name="aadhar"
//                     value={formData.aadhar}
//                     onChange={handleChange}
//                     placeholder="Enter Aadhar number"
//                     className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <button 
//             type="submit" 
//             className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-base shadow-lg shadow-emerald-700/20 hover:shadow-xl hover:shadow-emerald-700/30 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
//             disabled={loading}
//           >
//             {loading ? 'Submitting Request...' : 'Book Auction Appointment Slot'}
//           </button>
//         </form>

//         {status && (
//           <div 
//             className={`mt-6 p-4 rounded-xl font-bold text-sm text-center border transition-all duration-300 ${
//               status.startsWith('✅') 
//                 ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20' 
//                 : status.startsWith('⚠️') || status.startsWith('🚨')
//                 ? 'bg-red-500/10 text-red-800 border-red-500/20'
//                 : 'bg-emerald-50/50 text-[#0f3423] border-emerald-500/20'
//             }`}
//           >
//             {status}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// };

// export default Auction;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';
const Auction = () => {
  const navigate = useNavigate();
  
  // Available slots fetched from DB
  const [slots, setSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState('');
  
  const [formData, setFormData] = useState({
    city: '',
    date: '',
    crop: '',
    qunt: '',
    name: '',
    mobile: '',
    aadhar: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  // Fetch slots on load
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/auction/slots`)
      .then(res => {
        setSlots(res.data);
      })
      .catch(err => {
        console.error('Failed to load slots:', err);
        setStatus('⚠️ Error loading active auction slots. Please try again.');
      });
  }, []);
  // When a slot is selected, pre-populate associated fields
  const handleSlotChange = (e) => {
    const slotId = e.target.value;
    setSelectedSlotId(slotId);
    
    if (slotId) {
      const selected = slots.find(s => s._id === slotId);
      if (selected) {
        if (selected.remainingCapacity <= 0) {
          setStatus('🚨 Warning: This slot is fully booked!');
        } else {
          setStatus('');
        }
        setFormData(prev => ({
          ...prev,
          city: selected.area,
          crop: selected.crop,
          date: selected.date
        }));
      }
    } else {
      setSelectedSlotId('');
      setStatus('');
      setFormData(prev => ({
        ...prev,
        city: '',
        crop: '',
        date: ''
      }));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    if (!formData.city || !formData.date || !formData.crop || !formData.qunt || !formData.name || !formData.mobile || !formData.aadhar) {
      setStatus('⚠️ Please fill in all fields.');
      setLoading(false);
      return;
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      setStatus('⚠️ Mobile number must be 10 digits.');
      setLoading(false);
      return;
    }
    if (!/^\d{12}$/.test(formData.aadhar)) {
      setStatus('⚠️ Aadhar number must be 12 digits.');
      setLoading(false);
      return;
    }
    // Check slot capacity again on client side
    if (selectedSlotId) {
      const selected = slots.find(s => s._id === selectedSlotId);
      if (selected && selected.remainingCapacity <= 0) {
        setStatus('🚨 This auction slot is full! You cannot book slots that are full.');
        setLoading(false);
        return;
      }
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auction/appointment`, {
        ...formData,
        slotId: selectedSlotId
      }, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });
      // Save to localStorage (User's private logs)
      const stored = JSON.parse(localStorage.getItem('auctionAppointments') || '[]');
      const updated = [...stored, response.data.appointment];
      localStorage.setItem('auctionAppointments', JSON.stringify(updated));
      setStatus(`✅ Appointment booked successfully! Confirmation ID: ${response.data.appointmentId}`);
      
      setFormData({
        city: '',
        date: '',
        crop: '',
        qunt: '',
        name: '',
        mobile: '',
        aadhar: ''
      });
      setSelectedSlotId('');
      // Redirect to Appointments page after 1.5 seconds
      setTimeout(() => {
        navigate('/appointments');
      }, 1500);
    } catch (error) {
      console.error('Submission Error:', error);
      setStatus(`❌ ${error.response?.data?.message || 'Failed to book appointment.'}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white border border-emerald-500/10 shadow-2xl p-8 md:p-12 rounded-3xl relative overflow-hidden">
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
          <h2 className="text-3xl font-extrabold text-[#0f3423] tracking-tight">📅 Book Auction Appointment</h2>
          <p className="text-emerald-950/70 text-sm mt-2">Book a guaranteed entry slot to bid or sell crops at auction areas</p>
        </div>
        {/* Display Active Admin Slots */}
        <div className="mb-8">
          <label className="block text-base font-bold text-emerald-950/90 mb-3">Select Scheduled Auction Slot</label>
          <select
            value={selectedSlotId}
            onChange={handleSlotChange}
            className="w-full p-4 border border-emerald-500/25 rounded-xl bg-emerald-50/10 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-emerald-950"
          >
            <option value="">-- Choose an active slot (Prepopulates form) --</option>
            {slots.map((slot) => {
              const isFull = slot.remainingCapacity <= 0;
              return (
                <option 
                  key={slot._id} 
                  value={slot._id}
                  className={isFull ? "text-red-500 font-bold" : "text-emerald-950"}
                >
                  {slot.crop} at {slot.area} | {slot.date} @ {slot.time} ({slot.remainingCapacity}/{slot.capacity} slots left) {isFull ? "[FULL]" : ""}
                </option>
              );
            })}
          </select>
        </div>
        {/* Slot Full Block Warning */}
        {selectedSlotId && slots.find(s => s._id === selectedSlotId)?.remainingCapacity <= 0 && (
          <div className="p-4 mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-800 font-extrabold text-sm text-center">
            ⚠️ This slot is full! Submissions are locked for this slot. Please select another slot.
          </div>
        )}
        {/* Form Container with Slight Creamy/Green Gradient Shading */}
        <form 
          onSubmit={handleSubmit} 
          className={`bg-gradient-to-br from-amber-50/70 via-emerald-50/40 to-green-100/60 border-2 border-emerald-500/20 shadow-lg p-6 md:p-8 rounded-3xl space-y-5 transition-all duration-300 ${
            selectedSlotId && slots.find(s => s._id === selectedSlotId)?.remainingCapacity <= 0 ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-emerald-950/80 mb-2">Auction Area / City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Mumbai"
                readOnly={!!selectedSlotId}
                className={`w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none text-sm font-medium ${
                  !!selectedSlotId ? 'bg-emerald-50/40 text-emerald-900/60' : 'focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10'
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-emerald-950/80 mb-2">Crop Name</label>
              <input
                type="text"
                name="crop"
                value={formData.crop}
                onChange={handleChange}
                placeholder="e.g. Wheat"
                readOnly={!!selectedSlotId}
                className={`w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none text-sm font-medium ${
                  !!selectedSlotId ? 'bg-emerald-50/40 text-emerald-900/60' : 'focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10'
                }`}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-emerald-950/80 mb-2">Auction Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                readOnly={!!selectedSlotId}
                className={`w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none text-sm font-medium ${
                  !!selectedSlotId ? 'bg-emerald-50/40 text-emerald-900/60' : 'focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10'
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-emerald-950/80 mb-2">Crop Quantity (in KG)</label>
              <input
                type="number"
                name="qunt"
                value={formData.qunt}
                onChange={handleChange}
                placeholder="Enter weight in kg"
                className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
                required
              />
            </div>
          </div>
          <div className="border-t border-emerald-500/15 pt-5">
            <h4 className="text-base font-bold text-[#0f3423] mb-4">Farmer Contact Details</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-emerald-950/80 mb-2">Your Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-emerald-950/80 mb-2">10-Digit Mobile Number</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-emerald-950/80 mb-2">12-Digit Aadhar Number</label>
                  <input
                    type="text"
                    name="aadhar"
                    value={formData.aadhar}
                    onChange={handleChange}
                    placeholder="Enter Aadhar number"
                    className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-base shadow-lg shadow-emerald-700/20 hover:shadow-xl hover:shadow-emerald-700/30 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Submitting Request...' : 'Book Auction Appointment Slot'}
          </button>
        </form>
        {status && (
          <div 
            className={`mt-6 p-4 rounded-xl font-bold text-sm text-center border transition-all duration-300 ${
              status.startsWith('✅') 
                ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20' 
                : status.startsWith('⚠️') || status.startsWith('🚨')
                ? 'bg-red-500/10 text-red-800 border-red-500/20'
                : 'bg-emerald-50/50 text-[#0f3423] border-emerald-500/20'
            }`}
          >
            {status}
          </div>
        )}
      </div>
    </main>
  );
};
export default Auction;
