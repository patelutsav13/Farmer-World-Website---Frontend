
// // Admin Page Who Approve or Reject Appointment With Condition.


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AuctionApprovalDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [decision, setDecision] = useState('Approved');
//   const [comments, setComments] = useState('');

//   useEffect(() => {
//     fetchPendingAppointments();
//   }, []);

//   const fetchPendingAppointments = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/auction/appointments?status=Pending');
//       setAppointments(res.data);
//     } catch (err) {
//       alert('Failed to load appointments');
//     }
//   };

//   const handleSelect = (appointment) => {
//     setSelectedAppointment(appointment);
//     setComments('');
//   };

//   const handleDecisionSubmit = async () => {
//     if (!selectedAppointment) return;
//     try {
//       await axios.put(`http://localhost:5000/api/auction/appointments/${selectedAppointment._id}/decision`, {
//         status: decision,
//         approverComments: comments,
//       });
//       alert(`Appointment ${decision.toLowerCase()}!`);
//       setSelectedAppointment(null);
//       fetchPendingAppointments();
//     } catch (error) {
//       alert('Failed to update appointment');
//     }
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
//       <h2>Auction Appointment Approval Dashboard</h2>

//       {!selectedAppointment && (
//         <>
//           <h3>Pending Appointments</h3>
//           <ul style={{ listStyle: 'none', padding: 0 }}>
//             {appointments.length === 0 && <li>No pending appointments</li>}
//             {appointments.map((appt) => (
//               <li
//                 key={appt._id}
//                 onClick={() => handleSelect(appt)}
//                 style={{
//                   cursor: 'pointer',
//                   border: '1px solid #ccc',
//                   padding: '10px',
//                   marginBottom: '10px',
//                   borderRadius: '5px',
//                 }}
//               >
//                 <strong>{appt.name}</strong> - Crop: {appt.crop} - Date: {appt.date}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {selectedAppointment && (
//         <div>
//           <h3>Review Appointment: {selectedAppointment.name}</h3>
//           <p><b>City:</b> {selectedAppointment.city}</p>
//           <p><b>Date:</b> {selectedAppointment.date}</p>
//           <p><b>Crop:</b> {selectedAppointment.crop}</p>
//           <p><b>Quantity:</b> {selectedAppointment.qunt}</p>
//           <p><b>Mobile:</b> {selectedAppointment.mobile}</p>
//           <p><b>Aadhar:</b> {selectedAppointment.aadhar}</p>

//           <label>
//             Decision:
//             <select value={decision} onChange={e => setDecision(e.target.value)} style={{ marginLeft: '10px' }}>
//               <option value="Approved">Approve</option>
//               <option value="Rejected">Reject</option>
//             </select>
//           </label>

//           <br /><br />

//           <label>
//             Comments:<br />
//             <textarea
//               rows="3"
//               value={comments}
//               onChange={e => setComments(e.target.value)}
//               placeholder="Optional comments for applicant"
//               style={{ width: '100%' }}
//             />
//           </label>

//           <br />

//           <button onClick={handleDecisionSubmit} style={{ marginRight: '10px' }}>
//             Submit Decision
//           </button>
//           <button onClick={() => setSelectedAppointment(null)}>Back</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuctionApprovalDashboard;
// Admin Page Who Approve or Reject Appointment With Condition.


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';

const AuctionApprovalDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [decision, setDecision] = useState('Approved');
  const [comments, setComments] = useState('');

  useEffect(() => {
    fetchPendingAppointments();
  }, []);

  const fetchPendingAppointments = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/auction/appointments?status=Pending`);
      setAppointments(res.data);
    } catch (err) {
      alert('Failed to load appointments');
    }
  };

  const handleSelect = (appointment) => {
    setSelectedAppointment(appointment);
    setComments('');
  };

  const handleDecisionSubmit = async () => {
    if (!selectedAppointment) return;
    try {
      await axios.put(`${API_BASE_URL}/api/auction/appointments/${selectedAppointment._id}/decision`, {
        status: decision,
        approverComments: comments,
      });
      alert(`Appointment ${decision.toLowerCase()}!`);
      setSelectedAppointment(null);
      fetchPendingAppointments();
    } catch (error) {
      alert('Failed to update appointment');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Auction Appointment Approval Dashboard</h2>

      {!selectedAppointment && (
        <>
          <h3>Pending Appointments</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {appointments.length === 0 && <li>No pending appointments</li>}
            {appointments.map((appt) => (
              <li
                key={appt._id}
                onClick={() => handleSelect(appt)}
                style={{
                  cursor: 'pointer',
                  border: '1px solid #ccc',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '5px',
                }}
              >
                <strong>{appt.name}</strong> - Crop: {appt.crop} - Date: {appt.date}
              </li>
            ))}
          </ul>
        </>
      )}

      {selectedAppointment && (
        <div>
          <h3>Review Appointment: {selectedAppointment.name}</h3>
          <p><b>City:</b> {selectedAppointment.city}</p>
          <p><b>Date:</b> {selectedAppointment.date}</p>
          <p><b>Crop:</b> {selectedAppointment.crop}</p>
          <p><b>Quantity:</b> {selectedAppointment.qunt}</p>
          <p><b>Mobile:</b> {selectedAppointment.mobile}</p>
          <p><b>Aadhar:</b> {selectedAppointment.aadhar}</p>

          <label>
            Decision:
            <select value={decision} onChange={e => setDecision(e.target.value)} style={{ marginLeft: '10px' }}>
              <option value="Approved">Approve</option>
              <option value="Rejected">Reject</option>
            </select>
          </label>

          <br /><br />

          <label>
            Comments:<br />
            <textarea
              rows="3"
              value={comments}
              onChange={e => setComments(e.target.value)}
              placeholder="Optional comments for applicant"
              style={{ width: '100%' }}
            />
          </label>

          <br />

          <button onClick={handleDecisionSubmit} style={{ marginRight: '10px' }}>
            Submit Decision
          </button>
          <button onClick={() => setSelectedAppointment(null)}>Back</button>
        </div>
      )}
    </div>
  );
};

export default AuctionApprovalDashboard;
