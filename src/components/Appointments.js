// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Appointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [status, setStatus] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/auction/appointments', {
//           withCredentials: true,
//         });
//         setAppointments(response.data);
//         localStorage.setItem('auctionAppointments', JSON.stringify(response.data));
//       } catch (error) {
//         console.error('Error fetching appointments:', error);
//         const storedAppointments = JSON.parse(localStorage.getItem('auctionAppointments') || '[]');
//         setAppointments(storedAppointments);
//         setStatus('Failed to fetch from server. Showing saved offline records.');
//       }
//     };

//     fetchAppointments();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to cancel this auction booking?")) return;
//     try {
//       setLoading(true);
//       await axios.delete(`http://localhost:5000/api/auction/appointment/${id}`, {
//         withCredentials: true,
//       });
//       const updatedAppointments = appointments.filter((appt) => appt._id !== id);
//       setAppointments(updatedAppointments);
//       localStorage.setItem('auctionAppointments', JSON.stringify(updatedAppointments));
//       setStatus('✅ Appointment cancelled and deleted successfully.');
//     } catch (error) {
//       console.error('Delete Error:', error);
//       setStatus(error.response?.data?.message || '❌ Failed to delete appointment.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="max-w-5xl mx-auto px-6 py-12">
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
//           <h2 className="text-3xl font-extrabold text-[#0f3423] tracking-tight">📋 Booked Auction Appointments</h2>
//           <p className="text-emerald-950/70 text-sm mt-2">Manage and monitor your submitted crop bidding slots</p>
//         </div>

//         <div className="flex justify-between items-center mb-8">
//           <Link to="/auction" className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-md transition-all cursor-pointer">
//             ← Back to Auction Form
//           </Link>
//           <span className="text-sm text-emerald-950/60 font-semibold">Total Bookings: {appointments.length}</span>
//         </div>

//         {status && (
//           <div className={`p-4 rounded-xl mb-6 text-sm font-semibold text-center border transition-all duration-300 ${
//             status.startsWith('✅') 
//               ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20' 
//               : 'bg-red-500/10 text-red-800 border-red-500/20'
//           }`}>
//             {status}
//           </div>
//         )}

//         {appointments.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {appointments.map((appt) => (
//               <div 
//                 key={appt._id} 
//                 className="bg-gradient-to-br from-amber-50/70 via-emerald-50/40 to-green-100/60 border-2 border-emerald-500/20 shadow-lg p-6 rounded-3xl relative flex flex-col justify-between"
//               >
//                 <div className="space-y-3 mb-6">
//                   <div className="flex justify-between items-center border-b border-emerald-500/15 pb-2">
//                     <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
//                       {appt.crop} (Qty: {appt.qunt} KG)
//                     </span>
//                     <span className={`text-xs font-bold px-2 py-0.5 rounded ${
//                       appt.status === 'Approved' ? 'bg-green-100 text-green-800' :
//                       appt.status === 'Rejected' ? 'bg-red-100 text-red-800' :
//                       'bg-yellow-100 text-yellow-800'
//                     }`}>{appt.status}</span>
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-2 text-sm text-emerald-950">
//                     <p><strong>Farmer:</strong> {appt.name}</p>
//                     <p><strong>City/Area:</strong> {appt.city}</p>
//                     <p><strong>Mobile:</strong> {appt.mobile}</p>
//                     <p><strong>Date:</strong> {appt.date}</p>
//                   </div>
//                   <p className="text-xs text-emerald-900/60"><strong>Aadhar ID:</strong> {appt.aadhar}</p>
//                 </div>

//                 <div className="space-y-4">
//                   {/* Status update alert banner */}
//                   <div className="bg-white/80 p-3.5 rounded-xl border border-emerald-500/15 text-xs text-emerald-950 font-semibold leading-relaxed">
//                     📢 We will provide the slot allocation of <strong>{appt.crop}</strong> in <strong>{appt.city}</strong> on <strong>{appt.date}</strong> by message in your user dashboard!
//                   </div>

//                   <button
//                     onClick={() => handleDelete(appt._id)}
//                     className="w-full bg-[#ef4444] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer transform active:scale-95 text-sm"
//                     disabled={loading}
//                   >
//                     Delete / Cancel Booking
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-[#526359] font-medium py-12">No active appointments found. Submit the form to book slots.</p>
//         )}
//       </div>
//     </main>
//   );
// };

// export default Appointments;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auction/appointments`, {
          withCredentials: true,
        });
        setAppointments(response.data);
        localStorage.setItem('auctionAppointments', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching appointments:', error);
        const storedAppointments = JSON.parse(localStorage.getItem('auctionAppointments') || '[]');
        setAppointments(storedAppointments);
        setStatus('Failed to fetch from server. Showing saved offline records.');
      }
    };
    fetchAppointments();
  }, []);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this auction booking?")) return;
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/api/auction/appointment/${id}`, {
        withCredentials: true,
      });
      const updatedAppointments = appointments.filter((appt) => appt._id !== id);
      setAppointments(updatedAppointments);
      localStorage.setItem('auctionAppointments', JSON.stringify(updatedAppointments));
      setStatus('✅ Appointment cancelled and deleted successfully.');
    } catch (error) {
      console.error('Delete Error:', error);
      setStatus(error.response?.data?.message || '❌ Failed to delete appointment.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
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
          <h2 className="text-3xl font-extrabold text-[#0f3423] tracking-tight">📋 Booked Auction Appointments</h2>
          <p className="text-emerald-950/70 text-sm mt-2">Manage and monitor your submitted crop bidding slots</p>
        </div>
        <div className="flex justify-between items-center mb-8">
          <Link to="/auction" className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-md transition-all cursor-pointer">
            ← Back to Auction Form
          </Link>
          <span className="text-sm text-emerald-950/60 font-semibold">Total Bookings: {appointments.length}</span>
        </div>
        {status && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-semibold text-center border transition-all duration-300 ${
            status.startsWith('✅') 
              ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20' 
              : 'bg-red-500/10 text-red-800 border-red-500/20'
          }`}>
            {status}
          </div>
        )}
        {appointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {appointments.map((appt) => (
              <div 
                key={appt._id} 
                className="bg-gradient-to-br from-amber-50/70 via-emerald-50/40 to-green-100/60 border-2 border-emerald-500/20 shadow-lg p-6 rounded-3xl relative flex flex-col justify-between"
              >
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center border-b border-emerald-500/15 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                      {appt.crop} (Qty: {appt.qunt} KG)
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      appt.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      appt.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>{appt.status}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm text-emerald-950">
                    <p><strong>Farmer:</strong> {appt.name}</p>
                    <p><strong>City/Area:</strong> {appt.city}</p>
                    <p><strong>Mobile:</strong> {appt.mobile}</p>
                    <p><strong>Date:</strong> {appt.date}</p>
                  </div>
                  <p className="text-xs text-emerald-900/60"><strong>Aadhar ID:</strong> {appt.aadhar}</p>
                </div>
                <div className="space-y-4">
                  {/* Status update alert banner */}
                  <div className="bg-white/80 p-3.5 rounded-xl border border-emerald-500/15 text-xs text-emerald-950 font-semibold leading-relaxed">
                    📢 We will provide the slot allocation of <strong>{appt.crop}</strong> in <strong>{appt.city}</strong> on <strong>{appt.date}</strong> by message in your user dashboard!
                  </div>
                  <button
                    onClick={() => handleDelete(appt._id)}
                    className="w-full bg-[#ef4444] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer transform active:scale-95 text-sm"
                    disabled={loading}
                  >
                    Delete / Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[#526359] font-medium py-12">No active appointments found. Submit the form to book slots.</p>
        )}
      </div>
    </main>
  );
};
export default Appointments;

