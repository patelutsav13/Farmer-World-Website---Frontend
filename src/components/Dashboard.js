// import React, { useState, useEffect, useRef } from 'react';
// import { Chart, registerables } from 'chart.js';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/index.css';
// import '../styles/dashboard.css';
// import farmerAvatar from '../assets/farmer_3d_dashboard.png';

// Chart.register(...registerables);

// const Dashboard = () => {
//   const navigate = useNavigate();
  
//   // Identify role
//   const savedUser = JSON.parse(localStorage.getItem('user'));
//   const username = savedUser?.username || 'John Doe';
//   const email = savedUser?.email || '';
//   const isAdmin = savedUser?.isAdmin || email === 'admin@agri.com';

//   // Navigation tab state (Dynamic based on role)
//   const [activeTab, setActiveTab] = useState(isAdmin ? 'admin_info' : 'profile');

//   // Profile fields state
//   const [farmerName, setFarmerName] = useState(username);
//   const [farmLocation, setFarmLocation] = useState('Village X');
//   const [favoriteCrop, setFavoriteCrop] = useState('Wheat');
//   const [editMode, setEditMode] = useState(false);
//   const [weatherRisk, setWeatherRisk] = useState('Loading...');

//   // User details state (for standard user checks)
//   const [myLoans, setMyLoans] = useState([]);
//   const [myAuctions, setMyAuctions] = useState([]);

//   // Pending elements state (for Administrator desk)
//   const [pendingLoans, setPendingLoans] = useState([]);
//   const [pendingAuctions, setPendingAuctions] = useState([]);
//   const [selectedLoan, setSelectedLoan] = useState(null);
//   const [selectedAuction, setSelectedAuction] = useState(null);

//   // Input states for decisions
//   const [loanDecision, setLoanDecision] = useState('Approved');
//   const [loanComments, setLoanComments] = useState('');
//   const [aucDecision, setAucDecision] = useState('Approved');
//   const [aucComments, setAucComments] = useState('');

//   // Admin Slot Manager State
//   const [slotArea, setSlotArea] = useState('');
//   const [slotCrop, setSlotCrop] = useState('');
//   const [slotDate, setSlotDate] = useState('');
//   const [slotTime, setSlotTime] = useState('');
//   const [slotCapacity, setSlotCapacity] = useState(20);
//   const [slotMsg, setSlotMsg] = useState('');
//   const [allSlots, setAllSlots] = useState([]);

//   // Total system metrics (for admin view)
//   const [metrics, setMetrics] = useState({
//     totalLoans: 0,
//     totalAuctions: 0,
//     pendingLoansCount: 0,
//     pendingAuctionsCount: 0
//   });

//   // Chart references to prevent canvas reuse issues
//   const chartsRef = useRef({
//     shoppingChart: null,
//     loanRatioChart: null,
//     auctionRatioChart: null
//   });

//   useEffect(() => {
//     setFarmerName(username);
//     setWeatherRisk('25.8°C, Humid Air (Low risk for current crops)');

//     if (isAdmin) {
//       fetchAdminData();
//     } else {
//       fetchUserData();
//     }
//   }, [username, isAdmin]);

//   // Fetch admin review list, slots and system logs
//   const fetchAdminData = async () => {
//     try {
//       // Fetch pending loans
//       const pendingLoansRes = await axios.get('http://localhost:5002/api/loan/forms?status=Pending');
//       setPendingLoans(pendingLoansRes.data);

//       // Fetch pending auctions
//       const pendingAuctionsRes = await axios.get('http://localhost:5000/api/auction/appointments?status=Pending');
//       setPendingAuctions(pendingAuctionsRes.data);

//       // Fetch active slots
//       const slotsRes = await axios.get('http://localhost:5000/api/auction/slots');
//       setAllSlots(slotsRes.data);

//       // Fetch all to compile metrics
//       const allApprovedLoans = await axios.get('http://localhost:5002/api/loan/forms?status=Approved');
//       const allRejectedLoans = await axios.get('http://localhost:5002/api/loan/forms?status=Rejected');
//       const allApprovedAuc = await axios.get('http://localhost:5000/api/auction/appointments?status=Approved');
//       const allRejectedAuc = await axios.get('http://localhost:5000/api/auction/appointments?status=Rejected');

//       const totalL = pendingLoansRes.data.length + allApprovedLoans.data.length + allRejectedLoans.data.length;
//       const totalA = pendingAuctionsRes.data.length + allApprovedAuc.data.length + allRejectedAuc.data.length;

//       setMetrics({
//         totalLoans: totalL,
//         totalAuctions: totalA,
//         pendingLoansCount: pendingLoansRes.data.length,
//         pendingAuctionsCount: pendingAuctionsRes.data.length
//       });
//     } catch (err) {
//       console.error('Failed to load admin data desk:', err);
//     }
//   };

//   // Fetch standard user active records
//   const fetchUserData = async () => {
//     try {
//       const appLoans = await axios.get(`http://localhost:5002/api/loan/forms?username=${username}&status=Approved`);
//       const rejLoans = await axios.get(`http://localhost:5002/api/loan/forms?username=${username}&status=Rejected`);
//       const penLoans = await axios.get(`http://localhost:5002/api/loan/forms?username=${username}&status=Pending`);
//       setMyLoans([...appLoans.data, ...rejLoans.data, ...penLoans.data]);

//       const appAuc = await axios.get(`http://localhost:5000/api/auction/appointments?username=${username}&status=Approved`);
//       const rejAuc = await axios.get(`http://localhost:5000/api/auction/appointments?username=${username}&status=Rejected`);
//       const penAuc = await axios.get(`http://localhost:5000/api/auction/appointments?username=${username}&status=Pending`);
//       setMyAuctions([...appAuc.data, ...rejAuc.data, ...penAuc.data]);
//     } catch (err) {
//       console.error('Failed to load user applications status:', err);
//     }
//   };

//   // Render analytics graphs on tab switch
//   useEffect(() => {
//     if (activeTab === 'analytics') {
//       if (chartsRef.current.shoppingChart) chartsRef.current.shoppingChart.destroy();
//       if (chartsRef.current.loanRatioChart) chartsRef.current.loanRatioChart.destroy();
//       if (chartsRef.current.auctionRatioChart) chartsRef.current.auctionRatioChart.destroy();

//       // Render Sales Graph
//       const ctxShop = document.getElementById('shoppingSalesChart');
//       if (ctxShop) {
//         chartsRef.current.shoppingChart = new Chart(ctxShop, {
//           type: 'bar',
//           data: {
//             labels: ['Organic Seeds', 'NPK Fertilizers', 'Sprayer Pumps', 'Rotavators', 'Farm Boots'],
//             datasets: [{
//               label: 'Items Sold (Qty)',
//               data: [340, 495, 120, 55, 230],
//               backgroundColor: 'rgba(82, 183, 136, 0.75)',
//               borderColor: '#1b4d36',
//               borderWidth: 1.5,
//               borderRadius: 6
//             }]
//           },
//           options: {
//             responsive: true,
//             plugins: { legend: { display: false } }
//           }
//         });
//       }

//       // Render Loan Approval Ratio
//       const ctxLoan = document.getElementById('loanRatioChart');
//       if (ctxLoan) {
//         chartsRef.current.loanRatioChart = new Chart(ctxLoan, {
//           type: 'doughnut',
//           data: {
//             labels: ['Approved', 'Rejected', 'Pending'],
//             datasets: [{
//               data: isAdmin 
//                 ? [15, 5, pendingLoans.length || 2] 
//                 : [
//                     myLoans.filter(l => l.status === 'Approved').length || 1, 
//                     myLoans.filter(l => l.status === 'Rejected').length || 0,
//                     myLoans.filter(l => l.status === 'Pending').length || 0
//                   ],
//               backgroundColor: ['#2e6f40', '#ef4444', '#f5cf65'],
//               borderWidth: 2
//             }]
//           },
//           options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
//         });
//       }

//       // Render Auction Appointment Ratio
//       const ctxAuction = document.getElementById('auctionRatioChart');
//       if (ctxAuction) {
//         chartsRef.current.auctionRatioChart = new Chart(ctxAuction, {
//           type: 'pie',
//           data: {
//             labels: ['Approved', 'Rejected', 'Pending'],
//             datasets: [{
//               data: isAdmin
//                 ? [12, 4, pendingAuctions.length || 3]
//                 : [
//                     myAuctions.filter(a => a.status === 'Approved').length || 1, 
//                     myAuctions.filter(a => a.status === 'Rejected').length || 0,
//                     myAuctions.filter(a => a.status === 'Pending').length || 0
//                   ],
//               backgroundColor: ['#52b788', '#f87171', '#fcd34d'],
//               borderWidth: 2
//             }]
//           },
//           options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
//         });
//       }
//     }
//   }, [activeTab, pendingLoans, pendingAuctions, myLoans, myAuctions, isAdmin]);

//   // Submit slot creation (Admin action)
//   const handleCreateSlot = async (e) => {
//     e.preventDefault();
//     setSlotMsg('');
//     if (!slotArea || !slotCrop || !slotDate || !slotTime || !slotCapacity) {
//       setSlotMsg('⚠️ Please fill out all slot fields.');
//       return;
//     }
//     try {
//       await axios.post('http://localhost:5000/api/auction/slots', {
//         area: slotArea,
//         crop: slotCrop,
//         date: slotDate,
//         time: slotTime,
//         capacity: Number(slotCapacity)
//       });
//       setSlotMsg('✅ Auction slot created successfully!');
//       setSlotArea('');
//       setSlotCrop('');
//       setSlotDate('');
//       setSlotTime('');
//       setSlotCapacity(20);
//       fetchAdminData();
//     } catch (err) {
//       console.error(err);
//       setSlotMsg('❌ Failed to create slot.');
//     }
//   };

//   // Submit individual loan decision
//   const handleLoanDecisionSubmit = async () => {
//     if (!selectedLoan) return;
//     try {
//       await axios.put(`http://localhost:5002/api/loan/forms/${selectedLoan._id}/decision`, {
//         status: loanDecision,
//         approverComments: loanComments,
//       });
//       alert(`✅ Loan application ${loanDecision.toLowerCase()} successfully!`);
//       setSelectedLoan(null);
//       fetchAdminData();
//     } catch (err) {
//       alert('❌ Failed to update loan status.');
//     }
//   };

//   // Submit individual auction slot decision
//   const handleAuctionDecisionSubmit = async () => {
//     if (!selectedAuction) return;
//     try {
//       await axios.put(`http://localhost:5000/api/auction/appointments/${selectedAuction._id}/decision`, {
//         status: aucDecision,
//         approverComments: aucComments,
//       });
//       alert(`✅ Auction Appointment ${aucDecision.toLowerCase()} successfully!`);
//       setSelectedAuction(null);
//       fetchAdminData();
//     } catch (err) {
//       alert('❌ Failed to update appointment status.');
//     }
//   };

//   // Bulk actions desk
//   const handleApproveAllLoans = async () => {
//     try {
//       await axios.put('http://localhost:5002/api/loan/forms/bulk-decision', { status: 'Approved', approverComments: 'Approved by admin bulk execution.' });
//       alert('All pending loan applications approved!');
//       fetchAdminData();
//     } catch (err) {
//       alert('Failed bulk action execution.');
//     }
//   };

//   const handleRejectAllLoans = async () => {
//     try {
//       await axios.put('http://localhost:5002/api/loan/forms/bulk-decision', { status: 'Rejected', approverComments: 'Rejected by admin bulk execution.' });
//       alert('All pending loan applications rejected!');
//       fetchAdminData();
//     } catch (err) {
//       alert('Failed bulk action execution.');
//     }
//   };

//   const handleApproveAllAuctions = async () => {
//     try {
//       await axios.put('http://localhost:5000/api/auction/appointments/bulk-decision', { status: 'Approved', approverComments: 'Approved by admin bulk slot allocation.' });
//       alert('All appointments approved!');
//       fetchAdminData();
//     } catch (err) {
//       alert('Failed bulk action execution.');
//     }
//   };

//   const handleRejectAllAuctions = async () => {
//     try {
//       await axios.put('http://localhost:5000/api/auction/appointments/bulk-decision', { status: 'Rejected', approverComments: 'Rejected by admin bulk slot allocation.' });
//       alert('All appointments rejected!');
//       fetchAdminData();
//     } catch (err) {
//       alert('Failed bulk action execution.');
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     alert("Logged out successfully");
//     navigate('/login');
//   };

//   const editProfile = () => setEditMode(true);
//   const saveProfile = () => {
//     setFarmerName(document.getElementById('editName').value);
//     setFarmLocation(document.getElementById('editLocation').value);
//     setFavoriteCrop(document.getElementById('editCrop').value);
//     setEditMode(false);
//   };

//   return (
//     <div className="dashboard-wrapper">
//       {/* Workspace Left Sidebar */}
//       <aside className="dashboard-sidebar">
//         <div className="sidebar-brand">
//           <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M2 22C2 13 8 4 17 2C17 2 13.5 8 13.5 13.5C13.5 19 19 19.5 22 22C13 22 5 20 2 22Z" fill="#f5cf65" />
//             <path d="M13.5 13.5C10 13.5 6 17 5.5 21" stroke="#ffffff" strokeWidth="1.5" />
//           </svg>
//           <span>{isAdmin ? 'Admin Portal' : 'Farmer Portal'}</span>
//         </div>

//         <div className="sidebar-menu">
//           {/* Admin Specific Links */}
//           {isAdmin ? (
//             <>
//               <button 
//                 className={`sidebar-link ${activeTab === 'admin_info' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('admin_info')}
//               >
//                 Overview Desk
//               </button>
//               <button 
//                 className={`sidebar-link ${activeTab === 'slots_manager' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('slots_manager')}
//               >
//                 Auction Slots Manager
//               </button>
//               <button 
//                 className={`sidebar-link ${activeTab === 'analytics' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('analytics')}
//               >
//                 System Analytics
//               </button>
//               <button 
//                 className={`sidebar-link ${activeTab === 'loan_manager' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('loan_manager')}
//               >
//                 Review Loans ({pendingLoans.length})
//               </button>
//               <button 
//                 className={`sidebar-link ${activeTab === 'auction_manager' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('auction_manager')}
//               >
//                 Review Auctions ({pendingAuctions.length})
//               </button>
//               <button 
//                 className={`sidebar-link ${activeTab === 'bulk_control' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('bulk_control')}
//               >
//                 Bulk Operations
//               </button>
//             </>
//           ) : (
//             // Standard User Specific Links
//             <>
//               <button 
//                 className={`sidebar-link ${activeTab === 'profile' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('profile')}
//               >
//                 My Profile
//               </button>
//               <button 
//                 className={`sidebar-link ${activeTab === 'analytics' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('analytics')}
//               >
//                 My Analytics
//               </button>
//               <button 
//                 className={`sidebar-link ${activeTab === 'history' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('history')}
//               >
//                 Applications Status
//               </button>
//             </>
//           )}
//         </div>

//         <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
//           <button className="logout-button w-full" onClick={logout}>
//             Sign Out
//           </button>
//         </div>
//       </aside>

//       {/* Main Content Workspace */}
//       <main className="dashboard-main">
        
//         {/* ================= ADMIN VIEWPORTS ================= */}
//         {isAdmin && (
//           <>
//             {/* View Tab: Admin Overview */}
//             <div className={`tab-pane ${activeTab === 'admin_info' ? 'active' : ''}`}>
//               <h1 className="text-4xl font-extrabold text-[#0f3423] mb-8">Administrator Dashboard</h1>
//               <div className="profile-card-v2 mb-10">
//                 <div className="profile-avatar-box">
//                   <img src={farmerAvatar} alt="Admin profile avatar" />
//                 </div>
//                 <div className="profile-details">
//                   <h2>Welcome back, System Admin!</h2>
//                   <p><strong>Security Role:</strong> Database & Records Verification Officer</p>
//                   <p><strong>Email Address:</strong> admin@agri.com</p>
//                   <p><strong>System Status:</strong> All microservices are active & connected to MongoDB</p>
//                 </div>
//               </div>

//               {/* System Metrics */}
//               <div className="stats-grid">
//                 <div className="stat-card">
//                   <h4>Total Loan Requests</h4>
//                   <div className="stat-value text-emerald-700">{metrics.totalLoans}</div>
//                   <div className="stat-label">All recorded applicants</div>
//                 </div>
//                 <div className="stat-card">
//                   <h4>Pending Loans</h4>
//                   <div className="stat-value text-amber-500">{metrics.pendingLoansCount}</div>
//                   <div className="stat-label">Require decision reviews</div>
//                 </div>
//                 <div className="stat-card">
//                   <h4>Pending Slots</h4>
//                   <div className="stat-value text-amber-500">{metrics.pendingAuctionsCount}</div>
//                   <div className="stat-label">Auction scheduling queue</div>
//                 </div>
//               </div>
//             </div>

//             {/* View Tab: Admin Auction Slots Manager */}
//             <div className={`tab-pane ${activeTab === 'slots_manager' ? 'active' : ''}`}>
//               <h1 className="text-4xl font-extrabold text-[#0f3423] mb-8">Auction Area Slots Creator</h1>
              
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//                 {/* Form to Create Slot */}
//                 <div className="bg-white p-8 rounded-3xl border border-emerald-500/10 shadow-lg">
//                   <h3 className="text-2xl font-bold text-[#0f3423] mb-6 pl-2 border-l-4 border-emerald-500">Create Scheduled Slot</h3>
                  
//                   {slotMsg && (
//                     <div className={`p-4 mb-4 rounded-xl text-center font-bold text-sm ${slotMsg.startsWith('✅') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
//                       {slotMsg}
//                     </div>
//                   )}

//                   <form onSubmit={handleCreateSlot} className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-bold text-emerald-950 mb-1.5">Auction Area Name (City)</label>
//                       <input 
//                         type="text" 
//                         value={slotArea}
//                         onChange={e => setSlotArea(e.target.value)}
//                         placeholder="e.g. Mumbai, Delhi, Village Gate"
//                         className="w-full p-3.5 border border-emerald-500/20 rounded-xl bg-emerald-50/10 text-sm focus:outline-none focus:border-emerald-600"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-bold text-emerald-950 mb-1.5">Crop Name</label>
//                       <input 
//                         type="text" 
//                         value={slotCrop}
//                         onChange={e => setSlotCrop(e.target.value)}
//                         placeholder="e.g. Rice, Wheat, Sugarcane"
//                         className="w-full p-3.5 border border-emerald-500/20 rounded-xl bg-emerald-50/10 text-sm focus:outline-none focus:border-emerald-600"
//                         required
//                       />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-bold text-emerald-950 mb-1.5">Auction Date</label>
//                         <input 
//                           type="date" 
//                           value={slotDate}
//                           onChange={e => setSlotDate(e.target.value)}
//                           className="w-full p-3.5 border border-emerald-500/20 rounded-xl bg-emerald-50/10 text-sm focus:outline-none focus:border-emerald-600"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-bold text-emerald-950 mb-1.5">Auction Time</label>
//                         <input 
//                           type="time" 
//                           value={slotTime}
//                           onChange={e => setSlotTime(e.target.value)}
//                           className="w-full p-3.5 border border-emerald-500/20 rounded-xl bg-emerald-50/10 text-sm focus:outline-none focus:border-emerald-600"
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-bold text-emerald-950 mb-1.5">Maximum Booking Capacity (Persons)</label>
//                       <input 
//                         type="number" 
//                         value={slotCapacity}
//                         onChange={e => setSlotCapacity(e.target.value)}
//                         placeholder="Default 20"
//                         className="w-full p-3.5 border border-emerald-500/20 rounded-xl bg-emerald-50/10 text-sm focus:outline-none focus:border-emerald-600"
//                         required
//                       />
//                     </div>
//                     <button type="submit" className="w-full bg-[#2e6f40] hover:bg-emerald-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md">
//                       Add Scheduled Slot
//                     </button>
//                   </form>
//                 </div>

//                 {/* Display active slots */}
//                 <div className="bg-white p-8 rounded-3xl border border-emerald-500/10 shadow-lg max-h-[550px] overflow-y-auto">
//                   <h3 className="text-2xl font-bold text-[#0f3423] mb-6 pl-2 border-l-4 border-emerald-500">Active Scheduled Slots</h3>
//                   {allSlots.length === 0 ? (
//                     <p className="text-[#526359] text-center font-medium">No slots created yet. Add a slot to show here.</p>
//                   ) : (
//                     <div className="space-y-4">
//                       {allSlots.map((slot) => (
//                         <div key={slot._id} className="p-4 border border-emerald-500/10 bg-emerald-50/5 rounded-2xl flex flex-col justify-between">
//                           <div className="flex justify-between items-center mb-2">
//                             <span className="font-extrabold text-[#0f3423] text-lg">{slot.crop}</span>
//                             <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
//                               Cap: {slot.capacity} | Left: {slot.remainingCapacity}
//                             </span>
//                           </div>
//                           <p className="text-sm text-emerald-950/70"><strong>Area:</strong> {slot.area}</p>
//                           <p className="text-sm text-emerald-950/70"><strong>Schedule:</strong> {slot.date} @ {slot.time}</p>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* View Tab: Loan Review Desk */}
//             <div className={`tab-pane ${activeTab === 'loan_manager' ? 'active' : ''}`}>
//               <h1 className="text-4xl font-extrabold text-[#0f3423] mb-8">Loan Applications Desk</h1>
              
//               {!selectedLoan ? (
//                 <div className="dashboard-section">
//                   <h3>Applications Awaiting Review</h3>
//                   {pendingLoans.length === 0 ? (
//                     <p style={{ color: 'var(--text-muted)' }}>All loan forms reviewed. No pending tasks.</p>
//                   ) : (
//                     pendingLoans.map((loan) => (
//                       <div 
//                         key={loan._id} 
//                         className="decision-card-v2 cursor-pointer hover:bg-emerald-50/20"
//                         onClick={() => { setSelectedLoan(loan); setLoanComments(''); }}
//                         title="Click to review details"
//                       >
//                         <div className="decision-info">
//                           <p className="font-bold text-[#0f3423]">{loan.name}</p>
//                           <p className="text-sm">Income: {loan.income} | Bank: {loan.bankName}</p>
//                         </div>
//                         <span className="status-badge-v2 pending">{loan.status}</span>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               ) : (
//                 <div className="bg-white p-8 rounded-3xl border border-emerald-500/10 shadow-lg max-w-2xl">
//                   <h3 className="text-2xl font-bold text-[#0f3423] mb-6">Review Application: {selectedLoan.name}</h3>
//                   <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
//                     <p><strong>Age:</strong> {selectedLoan.age}</p>
//                     <p><strong>Occupation:</strong> {selectedLoan.occupation}</p>
//                     <p><strong>Annual Income:</strong> {selectedLoan.income}</p>
//                     <p><strong>Selected Bank:</strong> {selectedLoan.bankName}</p>
//                     <p><strong>Bank Branch:</strong> {selectedLoan.branchName}</p>
//                   </div>

//                   {/* Document Attachments Rendering */}
//                   <div className="border-t border-b border-emerald-500/10 py-5 my-5 space-y-4">
//                     <h4 className="font-extrabold text-emerald-950 text-sm uppercase">Applicant File Attachments</h4>
//                     {selectedLoan.pancardFile ? (
//                       <div className="p-3 border border-emerald-500/15 rounded-xl bg-emerald-50/10 flex flex-col items-center">
//                         <p className="text-xs font-bold text-[#0f3423] mb-2">PAN Card ID Proof</p>
//                         {selectedLoan.pancardFile.startsWith('data:image') ? (
//                           <img src={selectedLoan.pancardFile} alt="PAN Card" className="max-h-64 object-contain rounded-lg shadow-sm" />
//                         ) : (
//                           <a href={selectedLoan.pancardFile} download="pancard_document" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded text-xs">
//                             📥 Download PAN Card Document
//                           </a>
//                         )}
//                       </div>
//                     ) : (
//                       <p className="text-xs text-red-500">No PAN Card uploaded.</p>
//                     )}

//                     {selectedLoan.otherDocsFiles && selectedLoan.otherDocsFiles.length > 0 && selectedLoan.otherDocsFiles[0] ? (
//                       <div className="p-3 border border-emerald-500/15 rounded-xl bg-emerald-50/10 flex flex-col items-center">
//                         <p className="text-xs font-bold text-[#0f3423] mb-2">Supporting Land / Bank Proof</p>
//                         {selectedLoan.otherDocsFiles[0].startsWith('data:image') ? (
//                           <img src={selectedLoan.otherDocsFiles[0]} alt="Supporting Document" className="max-h-64 object-contain rounded-lg shadow-sm" />
//                         ) : (
//                           <a href={selectedLoan.otherDocsFiles[0]} download="supporting_document" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded text-xs">
//                             📥 Download Supporting Document
//                           </a>
//                         )}
//                       </div>
//                     ) : (
//                       <p className="text-xs text-red-500">No Supporting Documents uploaded.</p>
//                     )}
//                   </div>

//                   <div className="form-group">
//                     <label>Officer Decision</label>
//                     <select value={loanDecision} onChange={e => setLoanDecision(e.target.value)}>
//                       <option value="Approved">Approve Application</option>
//                       <option value="Rejected">Reject Application</option>
//                     </select>
//                   </div>

//                   <div className="form-group">
//                     <label>Review Remarks / Comments</label>
//                     <textarea 
//                       value={loanComments}
//                       onChange={e => setLoanComments(e.target.value)}
//                       placeholder="Input comments regarding the review decision"
//                       rows="3"
//                     />
//                   </div>

//                   <div className="flex gap-4 mt-6">
//                     <button className="cta-button flex-grow" onClick={handleLoanDecisionSubmit}>
//                       Submit Decision
//                     </button>
//                     <button className="cta-button secondary" onClick={() => setSelectedLoan(null)}>
//                       Back to List
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* View Tab: Auction Review Desk */}
//             <div className={`tab-pane ${activeTab === 'auction_manager' ? 'active' : ''}`}>
//               <h1 className="text-4xl font-extrabold text-[#0f3423] mb-8">Auction Scheduling Desk</h1>

//               {!selectedAuction ? (
//                 <div className="dashboard-section">
//                   <h3>Scheduling Requests Awaiting Review</h3>
//                   {pendingAuctions.length === 0 ? (
//                     <p style={{ color: 'var(--text-muted)' }}>All scheduling slots allocated. No pending reviews.</p>
//                   ) : (
//                     pendingAuctions.map((appt) => (
//                       <div 
//                         key={appt._id} 
//                         className="decision-card-v2 cursor-pointer hover:bg-emerald-50/20"
//                         onClick={() => { setSelectedAuction(appt); setAucComments(''); }}
//                         title="Click to review slot allocation"
//                       >
//                         <div className="decision-info">
//                           <p className="font-bold text-[#0f3423]">{appt.name}</p>
//                           <p className="text-sm">Scheduled Date: {appt.date} | Crop: {appt.crop} (Qty: {appt.qunt})</p>
//                         </div>
//                         <span className="status-badge-v2 pending">{appt.status}</span>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               ) : (
//                 <div className="bg-white p-8 rounded-3xl border border-emerald-500/10 shadow-lg max-w-2xl">
//                   <h3 className="text-2xl font-bold text-[#0f3423] mb-6">Review Appointment: {selectedAuction.name}</h3>
//                   <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
//                     <p><strong>Scheduled Date:</strong> {selectedAuction.date}</p>
//                     <p><strong>Target Crop:</strong> {selectedAuction.crop}</p>
//                     <p><strong>Quantity:</strong> {selectedAuction.qunt} Quintals</p>
//                     <p><strong>Mobile:</strong> {selectedAuction.mobile}</p>
//                     <p><strong>Aadhar Identification:</strong> {selectedAuction.aadhar}</p>
//                   </div>

//                   <div className="form-group">
//                     <label>Scheduling Status</label>
//                     <select value={aucDecision} onChange={e => setAucDecision(e.target.value)}>
//                       <option value="Approved">Approve / Allocate Slot</option>
//                       <option value="Rejected">Reject Request</option>
//                     </select>
//                   </div>

//                   <div className="form-group">
//                     <label>Scheduling Comments</label>
//                     <textarea 
//                       value={aucComments}
//                       onChange={e => setAucComments(e.target.value)}
//                       placeholder="Input remarks regarding scheduled slots"
//                       rows="3"
//                     />
//                   </div>

//                   <div className="flex gap-4 mt-6">
//                     <button className="cta-button flex-grow" onClick={handleAuctionDecisionSubmit}>
//                       Submit Decision
//                     </button>
//                     <button className="cta-button secondary" onClick={() => setSelectedAuction(null)}>
//                       Back to List
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* View Tab: Admin Bulk Operations */}
//             <div className={`tab-pane ${activeTab === 'bulk_control' ? 'active' : ''}`}>
//               <h1 className="text-4xl font-extrabold text-[#0f3423] mb-8">Bulk Operations Desk</h1>
//               <p className="text-emerald-950/60 mb-8">Execute bulk batch allocation decisions for pending queues.</p>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                 <div className="bg-white p-8 rounded-3xl border border-emerald-500/10 shadow-lg">
//                   <h3 className="text-xl font-bold text-[#0f3423] mb-4">Batch Loan Verification</h3>
//                   <p className="text-sm text-emerald-950/70 mb-6">Allocate approval decisions to all pending loan forms in one batch execution.</p>
//                   <div className="flex gap-4">
//                     <button onClick={handleApproveAllLoans} className="cta-button flex-grow" style={{ backgroundColor: '#2e6f40' }}>
//                       Bulk Approve
//                     </button>
//                     <button onClick={handleRejectAllLoans} className="cta-button secondary text-red-600 hover:bg-red-50" style={{ borderColor: '#ef4444', color: '#ef4444' }}>
//                       Bulk Reject
//                     </button>
//                   </div>
//                 </div>

//                 <div className="bg-white p-8 rounded-3xl border border-emerald-500/10 shadow-lg">
//                   <h3 className="text-xl font-bold text-[#0f3423] mb-4">Batch Auction Scheduling</h3>
//                   <p className="text-sm text-emerald-950/70 mb-6">Allocate slots and approve all pending slot reservation requests at once.</p>
//                   <div className="flex gap-4">
//                     <button onClick={handleApproveAllAuctions} className="cta-button flex-grow" style={{ backgroundColor: '#2e6f40' }}>
//                       Bulk Approve
//                     </button>
//                     <button onClick={handleRejectAllAuctions} className="cta-button secondary text-red-600 hover:bg-red-50" style={{ borderColor: '#ef4444', color: '#ef4444' }}>
//                       Bulk Reject
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         {/* ================= USER VIEWPORTS ================= */}
//         {!isAdmin && (
//           <>
//             {/* View Tab: Profile */}
//             <div className={`tab-pane ${activeTab === 'profile' ? 'active' : ''}`}>
//               <h1 className="text-4xl font-extrabold text-[#0f3423] mb-8">Farmer Profile</h1>
//               <div className="profile-card-v2 mb-10">
//                 <div className="profile-avatar-box">
//                   <img src={farmerAvatar} alt="Farmer profile avatar" />
//                 </div>
//                 <div className="profile-details">
//                   {!editMode ? (
//                     <>
//                       <h2>Welcome back, {farmerName}!</h2>
//                       <p><strong>Primary Farm Location:</strong> {farmLocation}</p>
//                       <p><strong>Preferred Cultivation Crop:</strong> {favoriteCrop}</p>
//                       <button className="cta-button mt-6" onClick={editProfile}>
//                         Edit Settings
//                       </button>
//                     </>
//                   ) : (
//                     <div className="profile-edit-form">
//                       <h2>Edit Profile</h2>
//                       <input id="editName" defaultValue={farmerName} placeholder="Farmer Name" />
//                       <input id="editLocation" defaultValue={farmLocation} placeholder="Farm Location" />
//                       <input id="editCrop" defaultValue={favoriteCrop} placeholder="Favorite Crop" />
//                       <div className="flex gap-3 mt-4">
//                         <button className="cta-button" onClick={saveProfile}>Save</button>
//                         <button className="cta-button secondary" onClick={() => setEditMode(false)}>Cancel</button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Quick Metrics */}
//               <div className="stats-grid">
//                 <div className="stat-card">
//                   <h4>Alerts & Temperature</h4>
//                   <div className="stat-value text-emerald-600">25.5°C</div>
//                   <div className="stat-label">Optimal climate index</div>
//                 </div>
//                 <div className="stat-card">
//                   <h4>My Submitted Loans</h4>
//                   <div className="stat-value text-[#1b4d36]">{myLoans.length}</div>
//                   <div className="stat-label">Applications sent</div>
//                 </div>
//                 <div className="stat-card">
//                   <h4>My Auction Slots</h4>
//                   <div className="stat-value text-amber-500">{myAuctions.length}</div>
//                   <div className="stat-label">Bids registered</div>
//                 </div>
//               </div>
//             </div>

//             {/* View Tab: Application logs */}
//             <div className={`tab-pane ${activeTab === 'history' ? 'active' : ''}`}>
//               <h1 className="text-4xl font-extrabold text-[#0f3423] mb-8">My Applications & Scheduling Requests</h1>
              
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//                 {/* User Loan application list */}
//                 <div className="dashboard-section bg-white p-6 rounded-3xl border border-emerald-500/10 shadow-md">
//                   <h3 className="text-xl font-bold text-[#0f3423] mb-4 pl-2 border-l-4 border-emerald-500">My Loan Applications</h3>
//                   {myLoans.length === 0 ? (
//                     <p style={{ color: 'var(--text-muted)' }}>You have not submitted any loan forms yet.</p>
//                   ) : (
//                     <div className="space-y-4">
//                       {myLoans.map((loan) => (
//                         <div key={loan._id} className="decision-card-v2 p-4 border border-emerald-500/10 rounded-2xl flex justify-between items-center">
//                           <div className="decision-info">
//                             <p className="font-bold text-[#0f3423]">{loan.bankName} - {loan.branchName}</p>
//                             <p className="text-sm font-semibold text-emerald-800 mt-1">Status: {loan.status}</p>
//                             <p className="text-xs text-emerald-950/60 mt-1 bg-emerald-50/50 p-2 rounded-lg border border-emerald-500/5">
//                               <strong>Officer Comments:</strong> {loan.approverComments || 'Awaiting document verification.'}
//                             </p>
//                           </div>
//                           <span className={`status-badge-v2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
//                             loan.status === 'Approved' ? 'bg-green-100 text-green-800 border border-green-200' :
//                             loan.status === 'Rejected' ? 'bg-red-100 text-red-800 border border-red-200' :
//                             'bg-yellow-100 text-yellow-800 border border-yellow-200'
//                           }`}>{loan.status}</span>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* User Auction slot list */}
//                 <div className="dashboard-section bg-white p-6 rounded-3xl border border-emerald-500/10 shadow-md">
//                   <h3 className="text-xl font-bold text-[#0f3423] mb-4 pl-2 border-l-4 border-emerald-500">My Scheduled Bids / Appointments</h3>
//                   {myAuctions.length === 0 ? (
//                     <p style={{ color: 'var(--text-muted)' }}>You have no scheduled auction slots.</p>
//                   ) : (
//                     <div className="space-y-4">
//                       {myAuctions.map((appt) => (
//                         <div key={appt._id} className="decision-card-v2 p-4 border border-emerald-500/10 rounded-2xl flex justify-between items-center">
//                           <div className="decision-info">
//                             <p className="font-bold text-[#0f3423]">{appt.crop} (Qty: {appt.qunt} KG)</p>
//                             <p className="text-sm font-semibold text-emerald-800 mt-1">Status: {appt.status}</p>
//                             <p className="text-xs text-emerald-950/60 mt-1 bg-emerald-50/50 p-2 rounded-lg border border-emerald-500/5">
//                               <strong>Officer Comments:</strong> {appt.approverComments || 'Awaiting slot reservation check.'}
//                             </p>
//                           </div>
//                           <span className={`status-badge-v2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
//                             appt.status === 'Approved' ? 'bg-green-100 text-green-800 border border-green-200' :
//                             appt.status === 'Rejected' ? 'bg-red-100 text-red-800 border border-red-200' :
//                             'bg-yellow-100 text-yellow-800 border border-yellow-200'
//                           }`}>{appt.status}</span>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         {/* ================= BOTH ROLES VIEWPORTS ================= */}
//         {/* View Tab: Analytics */}
//         <div className={`tab-pane ${activeTab === 'analytics' ? 'active' : ''}`}>
//           <h1 className="text-4xl font-extrabold text-[#0f3423] mb-8">Performance & Insights</h1>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
//             <div className="bg-white p-6 rounded-3xl border border-emerald-500/10 shadow-lg">
//               <h3 className="text-lg font-bold text-[#0f3423] mb-4 border-l-4 border-emerald-500 pl-3">Shopping Sales (Popular Items)</h3>
//               <canvas id="shoppingSalesChart"></canvas>
//             </div>
//             <div className="bg-white p-6 rounded-3xl border border-emerald-500/10 shadow-lg">
//               <h3 className="text-lg font-bold text-[#0f3423] mb-4 border-l-4 border-emerald-500 pl-3">AI Weather Risk Analysis</h3>
//               <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-500/10 text-[#0f3423]">
//                 <p className="font-bold text-lg">{weatherRisk}</p>
//                 <p className="text-sm text-emerald-950/70 mt-2 leading-relaxed">
//                   No frost warnings for the next 7 days. Precipitation index is low (10%). Soil moisture is optimal for crop rotation. Consult the Collaboration page to share resources.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-white p-6 rounded-3xl border border-emerald-500/10 shadow-lg">
//               <h3 className="text-lg font-bold text-[#0f3423] mb-4 border-l-4 border-emerald-500 pl-3">Loan Approval Ratio</h3>
//               <div style={{ maxWidth: '300px', margin: '0 auto' }}>
//                 <canvas id="loanRatioChart"></canvas>
//               </div>
//             </div>
//             <div className="bg-white p-6 rounded-3xl border border-emerald-500/10 shadow-lg">
//               <h3 className="text-lg font-bold text-[#0f3423] mb-4 border-l-4 border-emerald-500 pl-3">Auction Appointment Ratio</h3>
//               <div style={{ maxWidth: '300px', margin: '0 auto' }}>
//                 <canvas id="auctionRatioChart"></canvas>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import '../styles/index.css';
import '../styles/dashboard.css';
import farmerAvatar from '../assets/farmer_3d_dashboard.png';
Chart.register(...registerables);
const Dashboard = () => {
  const navigate = useNavigate();
  
  // Identify role
  const savedUser = JSON.parse(localStorage.getItem('user'));
  const username = savedUser?.username || 'John Doe';
  const email = savedUser?.email || '';
  const isAdmin = savedUser?.isAdmin || email === 'admin@agri.com';
  // Navigation tab state (Dynamic based on role)
  const [activeTab, setActiveTab] = useState(isAdmin ? 'admin_info' : 'profile');
  // Profile fields state
  const [farmerName, setFarmerName] = useState(username);
  const [farmLocation, setFarmLocation] = useState('Village X');
  const [favoriteCrop, setFavoriteCrop] = useState('Wheat');
  const [editMode, setEditMode] = useState(false);
  const [weatherRisk, setWeatherRisk] = useState('Loading...');
  // User details state (for standard user checks)
  const [myLoans, setMyLoans] = useState([]);
  const [myAuctions, setMyAuctions] = useState([]);
  // Pending elements state (for Administrator desk)
  const [pendingLoans, setPendingLoans] = useState([]);
  const [pendingAuctions, setPendingAuctions] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [selectedAuction, setSelectedAuction] = useState(null);
  // Input states for decisions
  const [loanDecision, setLoanDecision] = useState('Approved');
  const [loanComments, setLoanComments] = useState('');
  const [aucDecision, setAucDecision] = useState('Approved');
  const [aucComments, setAucComments] = useState('');
  // Admin Slot Manager State
  const [slotArea, setSlotArea] = useState('');
  const [slotCrop, setSlotCrop] = useState('');
  const [slotDate, setSlotDate] = useState('');
  const [slotTime, setSlotTime] = useState('');
  const [slotCapacity, setSlotCapacity] = useState(20);
  const [slotMsg, setSlotMsg] = useState('');
  const [allSlots, setAllSlots] = useState([]);
  // Total system metrics (for admin view)
  const [metrics, setMetrics] = useState({
    totalLoans: 0,
    totalAuctions: 0,
    pendingLoansCount: 0,
    pendingAuctionsCount: 0
  });
  // Chart references to prevent canvas reuse issues
  const chartsRef = useRef({
    shoppingChart: null,
    loanRatioChart: null,
    auctionRatioChart: null
  });
  useEffect(() => {
    setFarmerName(username);
    setWeatherRisk('25.8°C, Humid Air (Low risk for current crops)');
    if (isAdmin) {
      fetchAdminData();
    } else {
      fetchUserData();
    }
  }, [username, isAdmin]);
  // Fetch admin review list, slots and system logs
  const fetchAdminData = async () => {
    try {
      // Fetch pending loans
      const pendingLoansRes = await axios.get(`${API_BASE_URL}/api/loan/forms?status=Pending`);
      setPendingLoans(pendingLoansRes.data);
      // Fetch pending auctions
      const pendingAuctionsRes = await axios.get(`${API_BASE_URL}/api/auction/appointments?status=Pending`);
      setPendingAuctions(pendingAuctionsRes.data);
      // Fetch active slots
      const slotsRes = await axios.get(`${API_BASE_URL}/api/auction/slots`);
      setAllSlots(slotsRes.data);
      // Fetch all to compile metrics
      const allApprovedLoans = await axios.get(`${API_BASE_URL}/api/loan/forms?status=Approved`);
      const allRejectedLoans = await axios.get(`${API_BASE_URL}/api/loan/forms?status=Rejected`);
      const allApprovedAuc = await axios.get(`${API_BASE_URL}/api/auction/appointments?status=Approved`);
      const allRejectedAuc = await axios.get(`${API_BASE_URL}/api/auction/appointments?status=Rejected`);
      const totalL = pendingLoansRes.data.length + allApprovedLoans.data.length + allRejectedLoans.data.length;
      const totalA = pendingAuctionsRes.data.length + allApprovedAuc.data.length + allRejectedAuc.data.length;
      setMetrics({
        totalLoans: totalL,
        totalAuctions: totalA,
        pendingLoansCount: pendingLoansRes.data.length,
        pendingAuctionsCount: pendingAuctionsRes.data.length
      });
    } catch (err) {
      console.error('Failed to load admin data desk:', err);
    }
  };
  // Fetch standard user active records
  const fetchUserData = async () => {
    try {
      const appLoans = await axios.get(`${API_BASE_URL}/api/loan/forms?username=${username}&status=Approved`);
      const rejLoans = await axios.get(`${API_BASE_URL}/api/loan/forms?username=${username}&status=Rejected`);
      const penLoans = await axios.get(`${API_BASE_URL}/api/loan/forms?username=${username}&status=Pending`);
      setMyLoans([...appLoans.data, ...rejLoans.data, ...penLoans.data]);
      const appAuc = await axios.get(`${API_BASE_URL}/api/auction/appointments?username=${username}&status=Approved`);
      const rejAuc = await axios.get(`${API_BASE_URL}/api/auction/appointments?username=${username}&status=Rejected`);
      const penAuc = await axios.get(`${API_BASE_URL}/api/auction/appointments?username=${username}&status=Pending`);
      setMyAuctions([...appAuc.data, ...rejAuc.data, ...penAuc.data]);
    } catch (err) {
      console.error('Failed to load user applications status:', err);
    }
  };
  // Render analytics graphs on tab switch
  useEffect(() => {
    if (activeTab === 'analytics') {
      if (chartsRef.current.shoppingChart) chartsRef.current.shoppingChart.destroy();
      if (chartsRef.current.loanRatioChart) chartsRef.current.loanRatioChart.destroy();
      if (chartsRef.current.auctionRatioChart) chartsRef.current.auctionRatioChart.destroy();
      // Render Sales Graph
      const ctxShop = document.getElementById('shoppingSalesChart');
      if (ctxShop) {
        chartsRef.current.shoppingChart = new Chart(ctxShop, {
          type: 'bar',
          data: {
            labels: ['Organic Seeds', 'NPK Fertilizers', 'Sprayer Pumps', 'Rotavators', 'Farm Boots'],
            datasets: [{
              label: 'Items Sold (Qty)',
              data: [340, 495, 120, 55, 230],
              backgroundColor: 'rgba(82, 183, 136, 0.75)',
              borderColor: '#1b4d36',
              borderWidth: 1.5,
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } }
          }
        });
      }
      // Render Loan Approval Ratio
      const ctxLoan = document.getElementById('loanRatioChart');
      if (ctxLoan) {
        chartsRef.current.loanRatioChart = new Chart(ctxLoan, {
          type: 'doughnut',
          data: {
            labels: ['Approved', 'Rejected', 'Pending'],
            datasets: [{
              data: isAdmin 
                ? [15, 5, pendingLoans.length || 2] 
                : [
                    myLoans.filter(l => l.status === 'Approved').length || 1, 
                    myLoans.filter(l => l.status === 'Rejected').length || 0,
                    myLoans.filter(l => l.status === 'Pending').length || 0
                  ],
              backgroundColor: ['#2e6f40', '#ef4444', '#f5cf65'],
              borderWidth: 2
            }]
          },
          options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
        });
      }
      // Render Auction Appointment Ratio
      const ctxAuction = document.getElementById('auctionRatioChart');
      if (ctxAuction) {
        chartsRef.current.auctionRatioChart = new Chart(ctxAuction, {
          type: 'pie',
          data: {
            labels: ['Approved', 'Rejected', 'Pending'],
            datasets: [{
              data: isAdmin
                ? [12, 4, pendingAuctions.length || 3]
                : [
                    myAuctions.filter(a => a.status === 'Approved').length || 1, 
                    myAuctions.filter(a => a.status === 'Rejected').length || 0,
                    myAuctions.filter(a => a.status === 'Pending').length || 0
                  ],
              backgroundColor: ['#52b788', '#f87171', '#fcd34d'],
              borderWidth: 2
            }]
          },
          options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
        });
      }
    }
  }, [activeTab, pendingLoans, pendingAuctions, myLoans, myAuctions, isAdmin]);
  // Submit slot creation (Admin action)
  const handleCreateSlot = async (e) => {
    e.preventDefault();
    setSlotMsg('');
    if (!slotArea || !slotCrop || !slotDate || !slotTime || !slotCapacity) {
      setSlotMsg('⚠️ Please fill out all slot fields.');
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/api/auction/slots`, {
        area: slotArea,
        crop: slotCrop,
        date: slotDate,
        time: slotTime,
        capacity: Number(slotCapacity)
      });
      setSlotMsg('✅ Auction slot created successfully!');
      setSlotArea('');
      setSlotCrop('');
      setSlotDate('');
      setSlotTime('');
      setSlotCapacity(20);
      fetchAdminData();
    } catch (err) {
      console.error(err);
      setSlotMsg('❌ Failed to create slot.');
    }
  };
  // Submit individual loan decision
  const handleLoanDecisionSubmit = async () => {
    if (!selectedLoan) return;
    try {
      await axios.put(`${API_BASE_URL}/api/loan/forms/${selectedLoan._id}/decision`, {
        status: loanDecision,
        approverComments: loanComments,
      });
      alert(`✅ Loan application ${loanDecision.toLowerCase()} successfully!`);
      setSelectedLoan(null);
      fetchAdminData();
    } catch (err) {
      alert('❌ Failed to update loan status.');
    }
  };
  // Submit individual auction slot decision
  const handleAuctionDecisionSubmit = async () => {
    if (!selectedAuction) return;
    try {
      await axios.put(`${API_BASE_URL}/api/auction/appointments/${selectedAuction._id}/decision`, {
        status: aucDecision,
        approverComments: aucComments,
      });
      alert(`✅ Auction Appointment ${aucDecision.toLowerCase()} successfully!`);
      setSelectedAuction(null);
      fetchAdminData();
    } catch (err) {
      alert('❌ Failed to update appointment status.');
    }
  };
  // Bulk actions desk
  const handleApproveAllLoans = async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/loan/forms/bulk-decision`, { status: 'Approved', approverComments: 'Approved by admin bulk execution.' });
      alert('All pending loan applications approved!');
      fetchAdminData();
    } catch (err) {
      alert('Failed bulk action execution.');
    }
  };
  const handleRejectAllLoans = async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/loan/forms/bulk-decision`, { status: 'Rejected', approverComments: 'Rejected by admin bulk execution.' });
      alert('All pending loan applications rejected!');
      fetchAdminData();
    } catch (err) {
      alert('Failed bulk action execution.');
    }
  };
  const handleApproveAllAuctions = async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/auction/appointments/bulk-decision`, { status: 'Approved', approverComments: 'Approved by admin bulk slot allocation.' });
      alert('All appointments approved!');
      fetchAdminData();
    } catch (err) {
      alert('Failed bulk action execution.');
    }
  };
  const handleRejectAllAuctions = async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/auction/appointments/bulk-decision`, { status: 'Rejected', approverComments: 'Rejected by admin bulk slot allocation.' });
      alert('All appointments rejected!');
      fetchAdminData();
    } catch (err) {
      alert('Failed bulk action execution.');
    }
  };
  const logout = () => {
    localStorage.clear();
    alert("Logged out successfully");
    navigate('/login');
  };
  const editProfile = () => setEditMode(true);
  const saveProfile = () => {
    setFarmerName(document.getElementById('editName').value);
    setFarmLocation(document.getElementById('editLocation').value);
    setFavoriteCrop(document.getElementById('editCrop').value);
    setEditMode(false);
  };
  return (
    <div className="dashboard-wrapper">
      {/* Workspace Left Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 22C2 13 8 4 17 2C17 2 13.5 8 13.5 13.5C13.5 19 19 19.5 22 22C13 22 5 20 2 22Z" fill="#f5cf65" />
            <path d="M13.5 13.5C10 13.5 6 17 5.5 21" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
          <span>{isAdmin ? 'Admin Portal' : 'Farmer Portal'}</span>
        </div>
        <div className="sidebar-menu">
          {/* Admin Specific Links */}
          {isAdmin ? (
            <>
              <button 
                className={`sidebar-link ${activeTab === 'admin_info' ? 'active' : ''}`}
                onClick={() => setActiveTab('admin_info')}
              >
                Overview Desk
              </button>
              <button 
                className={`sidebar-link ${activeTab === 'slots_manager' ? 'active' : ''}`}
                onClick={() => setActiveTab('slots_manager')}
              >
                Auction Slots Manager
              </button>
              <button 
                className={`sidebar-link ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                System Analytics
              </button>
              <button 
                className={`sidebar-link ${activeTab === 'loan_manager' ? 'active' : ''}`}
                onClick={() => setActiveTab('loan_manager')}
              >
                Review Loans ({pendingLoans.length})
              </button>
              <button 
                className={`sidebar-link ${activeTab === 'auction_manager' ? 'active' : ''}`}
                onClick={() => setActiveTab('auction_manager')}
              >
                Review Auctions ({pendingAuctions.length})
              </button>
              <button 
                className={`sidebar-link ${activeTab === 'bulk_control' ? 'active' : ''}`}
                onClick={() => setActiveTab('bulk_control')}
              >
                Bulk Operations
              </button>
            </>
          ) : (
            // Standard User Specific Links
            <>
              <button 
                className={`sidebar-link ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                My Profile
              </button>
              <button 
                className={`sidebar-link ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                My Analytics
              </button>
              <button 
                className={`sidebar-link ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                Applications Status
              </button>
            </>
          )}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <button className="logout-button w-full" onClick={logout}>
            Sign Out
          </button>
        </div>
      </aside>
      {/* Main Content Workspace */}
      <main className="dashboard-main">
        
        {/* ================= ADMIN VIEWPORTS ================= */}
        {isAdmin && (
          <>
            {/* View Tab: Admin Overview */}
            <div className={`tab-pane ${activeTab === 'admin_info' ? 'active' : ''}`}>
              <h1 className="text-4xl font-extrabold text-[#0f3423] mb-8">Administrator Dashboard</h1>
              <div className="profile-card-v2 mb-10">
                <div className="profile-avatar-box">
                  <img src={farmerAvatar} alt="Admin profile avatar" />
                </div>
                <div className="profile-details">
                  <h2>Welcome back, System Admin!</h2>
                  <p><strong>Security Role:</strong> Database & Records Verification Officer</p>
                  <p><strong>Email Address:</strong> admin@agri.com</p>
                  <p><strong>System Status:</strong> All microservices are active & connected to MongoDB</p>
                </div>
              </div>
              {/* System Metrics */}
              <div className="stats-grid">
                <div className="stat-card">
                  <h4>Total Loan Requests</h4>
                  <div className="stat-value text-emerald-700">{metrics.totalLoans}</div>
                  <div className="stat-label">All recorded applicants</div>
                </div>
                <div className="stat-card">
                  <h4>Pending Loans</h4>
                  <div className="stat-value text-amber-500">{metrics.pendingLoansCount}</div>
                  <div className="stat-label">Require decision reviews</div>
                </div>
                <div className="stat-card">
                  <h4>Pending Slots</h4>
                  <div className="stat-value text-amber-500">{metrics.pendingAuctionsCount}</div>
                  <div className="stat-label">Auction scheduling queue</div>
                </div>
              </div>
            </div>
            {/* View Tab: Admin Auction Slots Manager */}
            <div className={`tab-pane ${activeTab === 'slots_manager' ? 'active' : ''}`}>
              <h1 className="text-4xl font-extrabold text-[#0f3423] mb-8">Auction Area Slots Creator</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Form to Create Slot */}
                <div className="bg-white p-8 rounded-3xl border border-emerald-500/10 shadow-lg">
                  <h3 className="text-2xl font-bold text-[#0f3423] mb-6 pl-2 border-l-4 border-emerald-500">Create Scheduled Slot</h3>
                  
                  {slotMsg && (
                    <div className={`p-4 mb-4 rounded-xl text-center font-bold text-sm ${slotMsg.startsWith('✅') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {slotMsg}
                    </div>
                  )}
                  <form onSubmit={handleCreateSlot} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-emerald-950 mb-1.5">Auction Area Name (City)</label>
                      <input 
                        type="text" 
                        value={slotArea}
                        onChange={e => setSlotArea(e.target.value)}
                        placeholder="e.g. Mumbai, Delhi, Village Gate"
                        className="w-full p-3.5 border border-emerald-500/20 rounded-xl bg-emerald-50/10 text-sm focus:outline-none focus:border-emerald-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-emerald-950 mb-1.5">Crop Name</label>
                      <input 
                        type="text" 
                        value={slotCrop}
                        onChange={e => setSlotCrop(e.target.value)}
                        placeholder="e.g. Rice, Wheat, Sugarcane"
                        className="w-full p-3.5 border border-emerald-500/20 rounded-xl bg-emerald-50/10 text-sm focus:outline-none focus:border-emerald-600"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-emerald-950 mb-1.5">Auction Date</label>
                        <input 
                          type="date" 
                          value={slotDate}
                          onChange={e => setSlotDate(e.target.value)}
                          className="w-full p-3.5 border border-emerald-500/20 rounded-xl bg-emerald-50/10 text-sm focus:outline-none focus:border-emerald-600"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-emerald-950 mb-1.5">Auction Time</label>
                        <input 
                          type="time" 
                          value={slotTime}
                          onChange={e => setSlotTime(e.target.value)}
                          className="w-full p-3.5 border border-emerald-500/20 rounded-xl bg-emerald-50/10 text-sm focus:outline-none focus:border-emerald-600"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-emerald-950 mb-1.5">Maximum Booking Capacity (Persons)</label>
                      <input 
                        type="number" 
                        value={slotCapacity}
                        onChange={e => setSlotCapacity(e.target.value)}
                        placeholder="Default 20"
                        className="w-full p-3.5 border border-emerald-500/20 rounded-xl bg-emerald-50/10 text-sm focus:outline-none focus:border-emerald-600"
                        required
                      />
                    </div>
                    <button type="submit" className="w-full bg-[#2e6f40] hover:bg-emerald-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md">
                      Add Scheduled Slot
                    </button>
                  </form>
                </div>
                {/* Display active slots */}
                <div className="bg-white p-8 rounded-3xl border border-emerald-500/10 shadow-lg max-h-[550px] overflow-y-auto">
                  <h3 className="text-2xl font-bold text-[#0f3423] mb-6 pl-2 border-l-4 border-emerald-500">Active Scheduled Slots</h3>
                  {allSlots.length === 0 ? (
                    <p className="text-[#526359] text-center font-medium">No slots created yet. Add a slot to show here.</p>
                  ) : (
                    <div className="space-y-4">
                      {allSlots.map((slot) => (
                        <div key={slot._id} className="p-4 border border-emerald-500/10 bg-emerald-50/5 rounded-2xl flex flex-col justify-between">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-extrabold text-[#0f3423] text-lg">{slot.crop}</span>
                            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
                              Cap: {slot.capacity} | Left: {slot.remainingCapacity}
                            </span>
                          </div>
                          <p className="text-sm text-emerald-950/70"><strong>Area:</strong> {slot.area}</p>
                          <p className="text-sm text-emerald-950/70"><strong>Schedule:</strong> {slot.date} @ {slot.time}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* View Tab: Loan Review Desk */}
            <div className={`tab-pane ${activeTab === 'loan_manager' ? 'active' : ''}`}>
              <h1 className="text-4xl font-extrabold text-[#0f3423] mb-8">Loan Applications Desk</h1>
              
              {!selectedLoan ? (
                <div className="dashboard-section">
                  <h3>Applications Awaiting Review</h3>
                  {pendingLoans.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>All loan forms reviewed. No pending tasks.</p>
                  ) : (
                    pendingLoans.map((loan) => (
                      <div 
                        key={loan._id} 
                        className="decision-card-v2 cursor-pointer hover:bg-emerald-50/20"
                        onClick={() => { setSelectedLoan(loan); setLoanComments(''); }}
                        title="Click to review details"
                      >
                        <div className="decision-info">
                          <p className="font-bold text-[#0f3423]">{loan.name}</p>
                          <p className="text-sm">Income: {loan.income} | Bank: {loan.bankName}</p>
                        </div>
                        <span className="status-badge-v2 pending">{loan.status}</span>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-3xl border border-emerald-500/10 shadow-lg max-w-2xl">
                  <h3 className="text-2xl font-bold text-[#0f3423] mb-6">Review Application: {selectedLoan.name}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <p><strong>Age:</strong> {selectedLoan.age}</p>
                    <p><strong>Occupation:</strong> {selectedLoan.occupation}</p>
                    <p><strong>Annual Income:</strong> {selectedLoan.income}</p>
                    <p><strong>Selected Bank:</strong> {selectedLoan.bankName}</p>
                    <p><strong>Bank Branch:</strong> {selectedLoan.branchName}</p>
                  </div>
                  {/* Document Attachments Rendering */}
                  <div className="border-t border-b border-emerald-500/10 py-5 my-5 space-y-4">
                    <h4 className="font-extrabold text-emerald-950 text-sm uppercase">Applicant File Attachments</h4>
                    {selectedLoan.pancardFile ? (
                      <div className="p-3 border border-emerald-500/15 rounded-xl bg-emerald-50/10 flex flex-col items-center">
                        <p className="text-xs font-bold text-[#0f3423] mb-2">PAN Card ID Proof</p>
                        {selectedLoan.pancardFile.startsWith('data:image') ? (
                          <img src={selectedLoan.pancardFile} alt="PAN Card" className="max-h-64 object-contain rounded-lg shadow-sm" />
                        ) : (
                          <a href={selectedLoan.pancardFile} download="pancard_document" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded text-xs">
                            📥 Download PAN Card Document
                          </a>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-red-500">No PAN Card uploaded.</p>
                    )}
                    {selectedLoan.otherDocsFiles && selectedLoan.otherDocsFiles.length > 0 && selectedLoan.otherDocsFiles[0] ? (
                      <div className="p-3 border border-emerald-500/15 rounded-xl bg-emerald-50/10 flex flex-col items-center">
                        <p className="text-xs font-bold text-[#0f3423] mb-2">Supporting Land / Bank Proof</p>
                        {selectedLoan.otherDocsFiles[0].startsWith('data:image') ? (
                          <img src={selectedLoan.otherDocsFiles[0]} alt="Supporting Document" className="max-h-64 object-contain rounded-lg shadow-sm" />
                        ) : (
                          <a href={selectedLoan.otherDocsFiles[0]} download="supporting_document" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded text-xs">
                            📥 Download Supporting Document
                          </a>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-red-500">No Supporting Documents uploaded.</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Officer Decision</label>
                    <select value={loanDecision} onChange={e => setLoanDecision(e.target.value)}>
                      <option value="Approved">Approve Application</option>
                      <option value="Rejected">Reject Application</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Review Remarks / Comments</label>
                    <textarea 
                      value={loanComments}
                      onChange={e => setLoanComments(e.target.value)}
                      placeholder="Input comments regarding the review decision"
                      rows="3"
                    />
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button className="cta-button flex-grow" onClick={handleLoanDecisionSubmit}>
                      Submit Decision
                    </button>
                    <button className="cta-button secondary" onClick={() => setSelectedLoan(null)}>
                      Back to List
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* View Tab: Auction Review Desk */}
            <div className={`tab-pane ${activeTab === 'auction_manager' ? 'active' : ''}`}>
              <h1 className="text-4xl font-extrabold text-[#0f3423] mb-8">Auction Scheduling Desk</h1>
              {!selectedAuction ? (
                <div className="dashboard-section">
                  <h3>Scheduling Requests Awaiting Review</h3>
                  {pendingAuctions.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>All scheduling slots allocated. No pending reviews.</p>
                  ) : (
                    pendingAuctions.map((appt) => (
                      <div 
                        key={appt._id} 
                        className="decision-card-v2 cursor-pointer hover:bg-emerald-50/20"
                        onClick={() => { setSelectedAuction(appt); setAucComments(''); }}
                        title="Click to review slot allocation"
                      >
                        <div className="decision-info">
                          <p className="font-bold text-[#0f3423]">{appt.name}</p>
                          <p className="text-sm">Scheduled Date: {appt.date} | Crop: {appt.crop} (Qty: {appt.qunt})</p>
                        </div>
                        <span className="status-badge-v2 pending">{appt.status}</span>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-3xl border border-emerald-500/10 shadow-lg max-w-2xl">
                  <h3 className="text-2xl font-bold text-[#0f3423] mb-6">Review Appointment: {selectedAuction.name}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <p><strong>Scheduled Date:</strong> {selectedAuction.date}</p>
                    <p><strong>Target Crop:</strong> {selectedAuction.crop}</p>
                    <p><strong>Quantity:</strong> {selectedAuction.qunt} Quintals</p>
                    <p><strong>Mobile:</strong> {selectedAuction.mobile}</p>
                    <p><strong>Aadhar Identification:</strong> {selectedAuction.aadhar}</p>
                  </div>
                  <div className="form-group">
                    <label>Scheduling Status</label>
                    <select value={aucDecision} onChange={e => setAucDecision(e.target.value)}>
                      <option value="Approved">Approve / Allocate Slot</option>
                      <option value="Rejected">Reject Request</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Scheduling Comments</label>
                    <textarea 
                      value={aucComments}
                      onChange={e => setAucComments(e.target.value)}
                      placeholder="Input remarks regarding scheduled slots"
                      rows="3"
                    />
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button className="cta-button flex-grow" onClick={handleAuctionDecisionSubmit}>
                      Submit Decision
                    </button>
                    <button className="cta-button secondary" onClick={() => setSelectedAuction(null)}>
                      Back to List
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* View Tab: Admin Bulk Operations */}
            <div className={`tab-pane ${activeTab === 'bulk_control' ? 'active' : ''}`}>
              <h1 className="text-4xl font-extrabold text-[#0f3423] mb-8">Bulk Operations Desk</h1>
              <p className="text-emerald-950/60 mb-8">Execute bulk batch allocation decisions for pending queues.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-white p-8 rounded-3xl border border-emerald-500/10 shadow-lg">
                  <h3 className="text-xl font-bold text-[#0f3423] mb-4">Batch Loan Verification</h3>
                  <p className="text-sm text-emerald-950/70 mb-6">Allocate approval decisions to all pending loan forms in one batch execution.</p>
                  <div className="flex gap-4">
                    <button onClick={handleApproveAllLoans} className="cta-button flex-grow" style={{ backgroundColor: '#2e6f40' }}>
                      Bulk Approve
                    </button>
                    <button onClick={handleRejectAllLoans} className="cta-button secondary text-red-600 hover:bg-red-50" style={{ borderColor: '#ef4444', color: '#ef4444' }}>
                      Bulk Reject
                    </button>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-emerald-500/10 shadow-lg">
                  <h3 className="text-xl font-bold text-[#0f3423] mb-4">Batch Auction Scheduling</h3>
                  <p className="text-sm text-emerald-950/70 mb-6">Allocate slots and approve all pending slot reservation requests at once.</p>
                  <div className="flex gap-4">
                    <button onClick={handleApproveAllAuctions} className="cta-button flex-grow" style={{ backgroundColor: '#2e6f40' }}>
                      Bulk Approve
                    </button>
                    <button onClick={handleRejectAllAuctions} className="cta-button secondary text-red-600 hover:bg-red-50" style={{ borderColor: '#ef4444', color: '#ef4444' }}>
                      Bulk Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {/* ================= USER VIEWPORTS ================= */}
        {!isAdmin && (
          <>
            {/* View Tab: Profile */}
            <div className={`tab-pane ${activeTab === 'profile' ? 'active' : ''}`}>
              <h1 className="text-4xl font-extrabold text-[#0f3423] mb-8">Farmer Profile</h1>
              <div className="profile-card-v2 mb-10">
                <div className="profile-avatar-box">
                  <img src={farmerAvatar} alt="Farmer profile avatar" />
                </div>
                <div className="profile-details">
                  {!editMode ? (
                    <>
                      <h2>Welcome back, {farmerName}!</h2>
                      <p><strong>Primary Farm Location:</strong> {farmLocation}</p>
                      <p><strong>Preferred Cultivation Crop:</strong> {favoriteCrop}</p>
                      <button className="cta-button mt-6" onClick={editProfile}>
                        Edit Settings
                      </button>
                    </>
                  ) : (
                    <div className="profile-edit-form">
                      <h2>Edit Profile</h2>
                      <input id="editName" defaultValue={farmerName} placeholder="Farmer Name" />
                      <input id="editLocation" defaultValue={farmLocation} placeholder="Farm Location" />
                      <input id="editCrop" defaultValue={favoriteCrop} placeholder="Favorite Crop" />
                      <div className="flex gap-3 mt-4">
                        <button className="cta-button" onClick={saveProfile}>Save</button>
                        <button className="cta-button secondary" onClick={() => setEditMode(false)}>Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Quick Metrics */}
              <div className="stats-grid">
                <div className="stat-card">
                  <h4>Alerts & Temperature</h4>
                  <div className="stat-value text-emerald-600">25.5°C</div>
                  <div className="stat-label">Optimal climate index</div>
                </div>
                <div className="stat-card">
                  <h4>My Submitted Loans</h4>
                  <div className="stat-value text-[#1b4d36]">{myLoans.length}</div>
                  <div className="stat-label">Applications sent</div>
                </div>
                <div className="stat-card">
                  <h4>My Auction Slots</h4>
                  <div className="stat-value text-amber-500">{myAuctions.length}</div>
                  <div className="stat-label">Bids registered</div>
                </div>
              </div>
            </div>
            {/* View Tab: Application logs */}
            <div className={`tab-pane ${activeTab === 'history' ? 'active' : ''}`}>
              <h1 className="text-4xl font-extrabold text-[#0f3423] mb-8">My Applications & Scheduling Requests</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* User Loan application list */}
                <div className="dashboard-section bg-white p-6 rounded-3xl border border-emerald-500/10 shadow-md">
                  <h3 className="text-xl font-bold text-[#0f3423] mb-4 pl-2 border-l-4 border-emerald-500">My Loan Applications</h3>
                  {myLoans.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>You have not submitted any loan forms yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {myLoans.map((loan) => (
                        <div key={loan._id} className="decision-card-v2 p-4 border border-emerald-500/10 rounded-2xl flex justify-between items-center">
                          <div className="decision-info">
                            <p className="font-bold text-[#0f3423]">{loan.bankName} - {loan.branchName}</p>
                            <p className="text-sm font-semibold text-emerald-800 mt-1">Status: {loan.status}</p>
                            <p className="text-xs text-emerald-950/60 mt-1 bg-emerald-50/50 p-2 rounded-lg border border-emerald-500/5">
                              <strong>Officer Comments:</strong> {loan.approverComments || 'Awaiting document verification.'}
                            </p>
                          </div>
                          <span className={`status-badge-v2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                            loan.status === 'Approved' ? 'bg-green-100 text-green-800 border border-green-200' :
                            loan.status === 'Rejected' ? 'bg-red-100 text-red-800 border border-red-200' :
                            'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          }`}>{loan.status}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* User Auction slot list */}
                <div className="dashboard-section bg-white p-6 rounded-3xl border border-emerald-500/10 shadow-md">
                  <h3 className="text-xl font-bold text-[#0f3423] mb-4 pl-2 border-l-4 border-emerald-500">My Scheduled Bids / Appointments</h3>
                  {myAuctions.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>You have no scheduled auction slots.</p>
                  ) : (
                    <div className="space-y-4">
                      {myAuctions.map((appt) => (
                        <div key={appt._id} className="decision-card-v2 p-4 border border-emerald-500/10 rounded-2xl flex justify-between items-center">
                          <div className="decision-info">
                            <p className="font-bold text-[#0f3423]">{appt.crop} (Qty: {appt.qunt} KG)</p>
                            <p className="text-sm font-semibold text-emerald-800 mt-1">Status: {appt.status}</p>
                            <p className="text-xs text-emerald-950/60 mt-1 bg-emerald-50/50 p-2 rounded-lg border border-emerald-500/5">
                              <strong>Officer Comments:</strong> {appt.approverComments || 'Awaiting slot reservation check.'}
                            </p>
                          </div>
                          <span className={`status-badge-v2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                            appt.status === 'Approved' ? 'bg-green-100 text-green-800 border border-green-200' :
                            appt.status === 'Rejected' ? 'bg-red-100 text-red-800 border border-red-200' :
                            'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          }`}>{appt.status}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {/* ================= BOTH ROLES VIEWPORTS ================= */}
        {/* View Tab: Analytics */}
        <div className={`tab-pane ${activeTab === 'analytics' ? 'active' : ''}`}>
          <h1 className="text-4xl font-extrabold text-[#0f3423] mb-8">Performance & Insights</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white p-6 rounded-3xl border border-emerald-500/10 shadow-lg">
              <h3 className="text-lg font-bold text-[#0f3423] mb-4 border-l-4 border-emerald-500 pl-3">Shopping Sales (Popular Items)</h3>
              <canvas id="shoppingSalesChart"></canvas>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-emerald-500/10 shadow-lg">
              <h3 className="text-lg font-bold text-[#0f3423] mb-4 border-l-4 border-emerald-500 pl-3">AI Weather Risk Analysis</h3>
              <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-500/10 text-[#0f3423]">
                <p className="font-bold text-lg">{weatherRisk}</p>
                <p className="text-sm text-emerald-950/70 mt-2 leading-relaxed">
                  No frost warnings for the next 7 days. Precipitation index is low (10%). Soil moisture is optimal for crop rotation. Consult the Collaboration page to share resources.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-emerald-500/10 shadow-lg">
              <h3 className="text-lg font-bold text-[#0f3423] mb-4 border-l-4 border-emerald-500 pl-3">Loan Approval Ratio</h3>
              <div style={{ maxWidth: '300px', margin: '0 auto' }}>
                <canvas id="loanRatioChart"></canvas>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-emerald-500/10 shadow-lg">
              <h3 className="text-lg font-bold text-[#0f3423] mb-4 border-l-4 border-emerald-500 pl-3">Auction Appointment Ratio</h3>
              <div style={{ maxWidth: '300px', margin: '0 auto' }}>
                <canvas id="auctionRatioChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
