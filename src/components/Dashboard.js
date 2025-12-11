// import React, { useState, useEffect } from 'react';
// import { Chart, registerables } from 'chart.js';
// import { useNavigate } from 'react-router-dom';
// import '../styles/index.css';
// import '../styles/cart.css';



// Chart.register(...registerables);

// const Dashboard = () => {
//   const [farmerName, setFarmerName] = useState('Username');
//   const [farmLocation, setFarmLocation] = useState('Village X');
//   const [favoriteCrop, setFavoriteCrop] = useState('Wheat');
//   const [editMode, setEditMode] = useState(false);
//   const [weatherRisk, setWeatherRisk] = useState('Loading...');
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Load saved user if any
//     const savedUser = JSON.parse(localStorage.getItem('user'));
//     if (savedUser) setFarmerName(savedUser.username || 'John Doe');

//     // Mock weather data
//     setWeatherRisk('Current Temperature: 25.0°C, Sunny');

//     new Chart(document.getElementById('earningsChart'), {
//       type: 'bar',
//       data: {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//         datasets: [{
//           label: 'Earnings (INR)',
//           data: [5000, 7000, 8000, 6500, 9000, 11000],
//           backgroundColor: 'rgba(75, 192, 192, 0.6)'
//         }],
//       },
//     });

//     new Chart(document.getElementById('productsChart'), {
//       type: 'doughnut',
//       data: {
//         labels: ['Wheat', 'Rice', 'Corn', 'Tomatoes'],
//         datasets: [{
//           label: 'Units Sold',
//           data: [150, 200, 180, 220],
//           backgroundColor: ['red', 'blue', 'green', 'orange']
//         }],
//       },
//     });

//     new Chart(document.getElementById('growthChart'), {
//       type: 'line',
//       data: {
//         labels: ['Planting', 'Germination', 'Flowering', 'Matured', 'Harvest'],
//         datasets: [{
//           label: 'Crop Growth (%)',
//           data: [10, 20, 40, 60, 100],
//           borderColor: '#FF5733',
//           backgroundColor: 'rgba(255, 87, 51, 0.2)',
//           fill: true
//         }],
//       },
//     });

//     new window.google.maps.Map(document.getElementById('map'), {
//       center: { lat: -34.397, lng: 150.644 },
//       zoom: 8,
//     });
//   }, []);

//   const logout = () => {
//     localStorage.clear(); // Clear any stored user data
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
//     <main className="p-5">
//       {/* Top-right logout button */}
//       <div className="flex justify-end mb-4">
//         <button
//           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 logout-button"
//           onClick={logout}
//         >
//           Logout
//         </button>
//       </div>

//       <section>
//         <h3>Farmer Profile</h3>
//         <div className="card">
//           {!editMode ? (
//             <>
//               <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Name: <span>{farmerName}</span></h4>
//               <p style={{ fontSize: '16px' }}>Farm Location: <span>{farmLocation}</span></p>
//               <p style={{ fontSize: '16px' }}>Favorite Crop: <span>{favoriteCrop}</span></p>
//               <button className="button" onClick={editProfile}>Edit Profile</button>
//             </>
//           ) : (
//             <div>
//               <input id="editName" defaultValue={farmerName} className="form-section" />
//               <input id="editLocation" defaultValue={farmLocation} className="form-section" />
//               <input id="editCrop" defaultValue={favoriteCrop} className="form-section" />
//               <button className="button" onClick={saveProfile}>Save</button>
//             </div>
//           )}
//         </div>
//       </section>

//       <section className="fadeIn">
//         <h3>Earnings Overview</h3>
//         <canvas id="earningsChart"></canvas>
//       </section>

//       <section className="fadeIn">
//         <h3>Weather Risk Analysis</h3>
//         <p>{weatherRisk}</p>
//       </section>

//       <section className="fadeIn">
//         <h3>Top-Selling Products</h3>
//         <canvas id="productsChart"></canvas>
//       </section>

//       <section className="fadeIn">
//         <h3>Crop Growth Simulation</h3>
//         <canvas id="growthChart"></canvas>
//       </section>

//       <section className="fadeIn">
//         <h3>Your Farm Location</h3>
//         <div id="map"></div>
//       </section>
//     </main>
//   );
// };

// export default Dashboard;








// After Admin Response For Auction and Loan Approve or Reject Massage Store In Dashboard.

// import React, { useState, useEffect } from 'react';
// import { Chart, registerables } from 'chart.js';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/index.css';
// import '../styles/cart.css';

// Chart.register(...registerables);

// const Dashboard = () => {
//   const [farmerName, setFarmerName] = useState('Username');
//   const [farmLocation, setFarmLocation] = useState('Village X');
//   const [favoriteCrop, setFavoriteCrop] = useState('Wheat');
//   const [editMode, setEditMode] = useState(false);
//   const [weatherRisk, setWeatherRisk] = useState('Loading...');
//   const [approvedLoans, setApprovedLoans] = useState([]);
//   const [approvedAuctions, setApprovedAuctions] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem('user'));
//     const username = savedUser?.username || 'John Doe';
//     setFarmerName(username);

//     setWeatherRisk('Current Temperature: 25.0°C, Sunny');

//     new Chart(document.getElementById('earningsChart'), {
//       type: 'bar',
//       data: {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//         datasets: [{
//           label: 'Earnings (INR)',
//           data: [5000, 7000, 8000, 6500, 9000, 11000],
//           backgroundColor: 'rgba(75, 192, 192, 0.6)'
//         }],
//       },
//     });

//     new Chart(document.getElementById('productsChart'), {
//       type: 'doughnut',
//       data: {
//         labels: ['Wheat', 'Rice', 'Corn', 'Tomatoes'],
//         datasets: [{
//           label: 'Units Sold',
//           data: [150, 200, 180, 220],
//           backgroundColor: ['red', 'blue', 'green', 'orange']
//         }],
//       },
//     });

//     new Chart(document.getElementById('growthChart'), {
//       type: 'line',
//       data: {
//         labels: ['Planting', 'Germination', 'Flowering', 'Matured', 'Harvest'],
//         datasets: [{
//           label: 'Crop Growth (%)',
//           data: [10, 20, 40, 60, 100],
//           borderColor: '#FF5733',
//           backgroundColor: 'rgba(255, 87, 51, 0.2)',
//           fill: true
//         }],
//       },
//     });

//     new window.google.maps.Map(document.getElementById('map'), {
//       center: { lat: -34.397, lng: 150.644 },
//       zoom: 8,
//     });

//     // Fetch loan approvals/rejections for logged-in user
//     const fetchApprovedLoans = async () => {
//       try {
//         const approvedRes = await axios.get(`http://localhost:5002/api/loan/forms?username=${username}&status=Approved`);
//         const rejectedRes = await axios.get(`http://localhost:5002/api/loan/forms?username=${username}&status=Rejected`);
//         setApprovedLoans([...approvedRes.data, ...rejectedRes.data]);
//       } catch (error) {
//         console.error('Failed to load loan approvals:', error);
//         setApprovedLoans([]);
//       }
//     };

//     // Fetch auction appointment approvals/rejections for logged-in user
//     const fetchApprovedAuctions = async () => {
//       try {
//         const approvedRes = await axios.get(`http://localhost:5000/api/auction/appointments?username=${username}&status=Approved`);
//         const rejectedRes = await axios.get(`http://localhost:5000/api/auction/appointments?username=${username}&status=Rejected`);
//         setApprovedAuctions([...approvedRes.data, ...rejectedRes.data]);
//       } catch (error) {
//         console.error('Failed to load auction approvals:', error);
//         setApprovedAuctions([]);
//       }
//     };

//     fetchApprovedLoans();
//     fetchApprovedAuctions();
//   }, []);

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
//     <main className="p-5">
//       <div className="flex justify-end mb-4">
//         <button
//           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 logout-button"
//           onClick={logout}
//         >
//           Logout
//         </button>
//       </div>

//       <section>
//         <h3>Farmer Profile</h3>
//         <div className="card">
//           {!editMode ? (
//             <>
//               <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Name: <span>{farmerName}</span></h4>
//               <p style={{ fontSize: '16px' }}>Farm Location: <span>{farmLocation}</span></p>
//               <p style={{ fontSize: '16px' }}>Favorite Crop: <span>{favoriteCrop}</span></p>
//               <button className="button" onClick={editProfile}>Edit Profile</button>
//             </>
//           ) : (
//             <div>
//               <input id="editName" defaultValue={farmerName} className="form-section" />
//               <input id="editLocation" defaultValue={farmLocation} className="form-section" />
//               <input id="editCrop" defaultValue={favoriteCrop} className="form-section" />
//               <button className="button" onClick={saveProfile}>Save</button>
//             </div>
//           )}
//         </div>
//       </section>

//       <section style={{ marginTop: '40px' }}>
//         <h3 style={{ color: '#2980b9', borderBottom: '2px solid #2980b9', paddingBottom: '5px' }}>
//           Loan Approval Decisions
//         </h3>
//         {approvedLoans.length === 0 && <p>No loan approvals or rejections yet.</p>}
//         {approvedLoans.map((loan) => (
//           <div
//             key={loan._id}
//             style={{
//               border: '1px solid #ddd',
//               borderRadius: '8px',
//               padding: '15px',
//               marginBottom: '15px',
//               backgroundColor: '#f9f9f9',
//             }}
//           >
//             <p><strong>Name:</strong> {loan.name || farmerName}</p>
//             <p>
//               <strong>Status:</strong>{' '}
//               <span style={{ color: loan.status === 'Approved' ? 'green' : 'red' }}>{loan.status}</span>
//             </p>
//             <p style={{ color: '#000' }}>
//               <strong>Comments:</strong> {loan.approverComments || 'No comments'}
//             </p>
//           </div>
//         ))}
//       </section>

//       <section style={{ marginTop: '40px' }}>
//         <h3 style={{ color: '#2980b9', borderBottom: '2px solid #2980b9', paddingBottom: '5px' }}>
//           Auction Appointment Decisions
//         </h3>
//         {approvedAuctions.length === 0 && <p>No auction approvals or rejections yet.</p>}
//         {approvedAuctions.map((appt) => (
//           <div
//             key={appt._id}
//             style={{
//               border: '1px solid #ddd',
//               borderRadius: '8px',
//               padding: '15px',
//               marginBottom: '15px',
//               backgroundColor: '#f9f9f9',
//             }}
//           >
//             <p><strong>Name:</strong> {appt.name || farmerName}</p>
//             <p>
//               <strong>Status:</strong>{' '}
//               <span style={{ color: appt.status === 'Approved' ? 'green' : 'red' }}>{appt.status}</span>
//             </p>
//             <p style={{ color: '#000' }}>
//               <strong>Comments:</strong> {appt.approverComments || 'No comments'}
//             </p>
//           </div>
//         ))}
//       </section>

//       <section className="fadeIn" style={{ marginTop: '40px' }}>
//         <h3>Earnings Overview</h3>
//         <canvas id="earningsChart"></canvas>
//       </section>

//       <section className="fadeIn">
//         <h3>Weather Risk Analysis</h3>
//         <p>{weatherRisk}</p>
//       </section>

//       <section className="fadeIn">
//         <h3>Top-Selling Products</h3>
//         <canvas id="productsChart"></canvas>
//       </section>

//       <section className="fadeIn">
//         <h3>Crop Growth Simulation</h3>
//         <canvas id="growthChart"></canvas>
//       </section>

//       <section className="fadeIn">
//         <h3>Your Farm Location</h3>
//         <div id="map"></div>
//       </section>
//     </main>
//   );
// };

// export default Dashboard;





import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/index.css';
import '../styles/cart.css';

Chart.register(...registerables);

const Dashboard = () => {
  const [farmerName, setFarmerName] = useState('Username');
  const [farmLocation, setFarmLocation] = useState('Village X');
  const [favoriteCrop, setFavoriteCrop] = useState('Wheat');
  const [editMode, setEditMode] = useState(false);
  const [weatherRisk, setWeatherRisk] = useState('Loading...');
  const [approvedLoans, setApprovedLoans] = useState([]);
  const [approvedAuctions, setApprovedAuctions] = useState([]);
  const [displayStatus, setDisplayStatus] = useState(null); // null, 'Approved', or 'Rejected'
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const username = savedUser?.username || 'John Doe';
    setFarmerName(username);

    setWeatherRisk('Current Temperature: 25.0°C, Sunny');

    new Chart(document.getElementById('earningsChart'), {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Earnings (INR)',
          data: [5000, 7000, 8000, 6500, 9000, 11000],
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }],
      },
    });

    new Chart(document.getElementById('productsChart'), {
      type: 'doughnut',
      data: {
        labels: ['Wheat', 'Rice', 'Corn', 'Tomatoes'],
        datasets: [{
          label: 'Units Sold',
          data: [150, 200, 180, 220],
          backgroundColor: ['red', 'blue', 'green', 'orange']
        }],
      },
    });

    new Chart(document.getElementById('growthChart'), {
      type: 'line',
      data: {
        labels: ['Planting', 'Germination', 'Flowering', 'Matured', 'Harvest'],
        datasets: [{
          label: 'Crop Growth (%)',
          data: [10, 20, 40, 60, 100],
          borderColor: '#FF5733',
          backgroundColor: 'rgba(255, 87, 51, 0.2)',
          fill: true
        }],
      },
    });

    new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });

    // Fetch loan approvals/rejections for logged-in user
    const fetchApprovedLoans = async () => {
      try {
        const approvedRes = await axios.get(`http://localhost:5002/api/loan/forms?username=${username}&status=Approved`);
        const rejectedRes = await axios.get(`http://localhost:5002/api/loan/forms?username=${username}&status=Rejected`);
        setApprovedLoans([...approvedRes.data, ...rejectedRes.data]);
      } catch (error) {
        console.error('Failed to load loan approvals:', error);
        setApprovedLoans([]);
      }
    };

    // Fetch auction appointment approvals/rejections for logged-in user
    const fetchApprovedAuctions = async () => {
      try {
        const approvedRes = await axios.get(`http://localhost:5000/api/auction/appointments?username=${username}&status=Approved`);
        const rejectedRes = await axios.get(`http://localhost:5000/api/auction/appointments?username=${username}&status=Rejected`);
        setApprovedAuctions([...approvedRes.data, ...rejectedRes.data]);
      } catch (error) {
        console.error('Failed to load auction approvals:', error);
        setApprovedAuctions([]);
      }
    };

    fetchApprovedLoans();
    fetchApprovedAuctions();
  }, []);

  const handleApproveAllLoans = async () => {
    try {
      await axios.put('http://localhost:5002/api/loan/forms/bulk-decision', {
        status: 'Approved',
        approverComments: 'Bulk approval by admin',
      });
      alert('All loan forms approved!');
      const username = JSON.parse(localStorage.getItem('user'))?.username || 'John Doe';
      const approvedRes = await axios.get(`http://localhost:5002/api/loan/forms?username=${username}&status=Approved`);
      const rejectedRes = await axios.get(`http://localhost:5002/api/loan/forms?username=${username}&status=Rejected`);
      setApprovedLoans([...approvedRes.data, ...rejectedRes.data]);
    } catch (error) {
      alert('Failed to approve all loan forms');
    }
  };

  const handleRejectAllLoans = async () => {
    try {
      await axios.put('http://localhost:5002/api/loan/forms/bulk-decision', {
        status: 'Rejected',
        approverComments: 'Bulk rejection by admin',
      });
      alert('All loan forms rejected!');
      const username = JSON.parse(localStorage.getItem('user'))?.username || 'John Doe';
      const approvedRes = await axios.get(`http://localhost:5002/api/loan/forms?username=${username}&status=Approved`);
      const rejectedRes = await axios.get(`http://localhost:5002/api/loan/forms?username=${username}&status=Rejected`);
      setApprovedLoans([...approvedRes.data, ...rejectedRes.data]);
    } catch (error) {
      alert('Failed to reject all loan forms');
    }
  };

  const handleApproveAllAuctions = async () => {
    try {
      await axios.put('http://localhost:5000/api/auction/appointments/bulk-decision', {
        status: 'Approved',
        approverComments: 'Bulk approval by admin',
      });
      alert('All appointments approved!');
      const username = JSON.parse(localStorage.getItem('user'))?.username || 'John Doe';
      const approvedRes = await axios.get(`http://localhost:5000/api/auction/appointments?username=${username}&status=Approved`);
      const rejectedRes = await axios.get(`http://localhost:5000/api/auction/appointments?username=${username}&status=Rejected`);
      setApprovedAuctions([...approvedRes.data, ...rejectedRes.data]);
    } catch (error) {
      alert('Failed to approve all appointments');
    }
  };

  const handleRejectAllAuctions = async () => {
    try {
      await axios.put('http://localhost:5000/api/auction/appointments/bulk-decision', {
        status: 'Rejected',
        approverComments: 'Bulk rejection by admin',
      });
      alert('All appointments rejected!');
      const username = JSON.parse(localStorage.getItem('user'))?.username || 'John Doe';
      const approvedRes = await axios.get(`http://localhost:5000/api/auction/appointments?username=${username}&status=Approved`);
      const rejectedRes = await axios.get(`http://localhost:5000/api/auction/appointments?username=${username}&status=Rejected`);
      setApprovedAuctions([...approvedRes.data, ...rejectedRes.data]);
    } catch (error) {
      alert('Failed to reject all appointments');
    }
  };

  const handleShowApproved = () => {
    setDisplayStatus('Approved');
  };

  const handleShowRejected = () => {
    setDisplayStatus('Rejected');
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
    <main className="p-5">
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 logout-button"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <section>
        <h3>Farmer Profile</h3>
        <div className="card">
          {!editMode ? (
            <>
              <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Name: <span>{farmerName}</span></h4>
              <p style={{ fontSize: '16px' }}>Farm Location: <span>{farmLocation}</span></p>
              <p style={{ fontSize: '16px' }}>Favorite Crop: <span>{favoriteCrop}</span></p>
              <button className="button" onClick={editProfile}>Edit Profile</button>
            </>
          ) : (
            <div>
              <input id="editName" defaultValue={farmerName} className="form-section" />
              <input id="editLocation" defaultValue={farmLocation} className="form-section" />
              <input id="editCrop" defaultValue={favoriteCrop} className="form-section" />
              <button className="button" onClick={saveProfile}>Save</button>
            </div>
          )}
        </div>
      </section>

      <section style={{ marginTop: '40px' }}>
        <h3 style={{ color: '#2980b9', borderBottom: '2px solid #2980b9', paddingBottom: '5px' }}>
          Loan Approval Decisions
        </h3>
        <div style={{ marginBottom: '15px' }}>
          <button
            onClick={handleApproveAllLoans}
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Approve All Loans
          </button>
          <button
            onClick={handleRejectAllLoans}
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Reject All Loans
          </button>
          <button
            onClick={handleShowApproved}
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Approve Details
          </button>
          <button
            onClick={handleShowRejected}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Reject Details
          </button>
        </div>
        {displayStatus === null && <p>Please select Approve Details or Reject Details to view decisions.</p>}
        {displayStatus !== null && approvedLoans.length === 0 && <p>No loan {displayStatus.toLowerCase()} decisions yet.</p>}
        {displayStatus !== null && approvedLoans
          .filter((loan) => loan.status === displayStatus)
          .map((loan) => (
            <div
              key={loan._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <p><strong>Name:</strong> {loan.name || farmerName}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span style={{ color: loan.status === 'Approved' ? 'green' : 'red' }}>{loan.status}</span>
              </p>
              <p style={{ color: '#000' }}>
                <strong>Comments:</strong> {loan.approverComments || 'No comments'}
              </p>
            </div>
          ))}
      </section>

      <section style={{ marginTop: '40px' }}>
        <h3 style={{ color: '#2980b9', borderBottom: '2px solid #2980b9', paddingBottom: '5px' }}>
          Auction Appointment Decisions
        </h3>
        <div style={{ marginBottom: '15px' }}>
          <button
            onClick={handleApproveAllAuctions}
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Approve All Appointments
          </button>
          <button
            onClick={handleRejectAllAuctions}
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Reject All Appointments
          </button>
          <button
            onClick={handleShowApproved}
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Approve Details
          </button>
          <button
            onClick={handleShowRejected}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Reject Details
          </button>
        </div>
        {displayStatus === null && <p>Please select Approve Details or Reject Details to view decisions.</p>}
        {displayStatus !== null && approvedAuctions.length === 0 && <p>No auction {displayStatus.toLowerCase()} decisions yet.</p>}
        {displayStatus !== null && approvedAuctions
          .filter((appt) => appt.status === displayStatus)
          .map((appt) => (
            <div
              key={appt._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <p><strong>Name:</strong> {appt.name || farmerName}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span style={{ color: appt.status === 'Approved' ? 'green' : 'red' }}>{appt.status}</span>
              </p>
              <p style={{ color: '#000' }}>
                <strong>Comments:</strong> {appt.approverComments || 'No comments'}
              </p>
            </div>
          ))}
      </section>

      <section className="fadeIn" style={{ marginTop: '40px' }}>
        <h3>Earnings Overview</h3>
        <canvas id="earningsChart"></canvas>
      </section>

      <section className="fadeIn">
        <h3>Weather Risk Analysis</h3>
        <p>{weatherRisk}</p>
      </section>

      <section className="fadeIn">
        <h3>Top-Selling Products</h3>
        <canvas id="productsChart"></canvas>
      </section>

      <section className="fadeIn">
        <h3>Crop Growth Simulation</h3>
        <canvas id="growthChart"></canvas>
      </section>

      <section className="fadeIn">
        <h3>Your Farm Location</h3>
        <div id="map"></div>
      </section>
    </main>
  );
};

export default Dashboard;