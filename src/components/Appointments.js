// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import '../styles/index.css';


// const Appointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [status, setStatus] = useState('');

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
//         setStatus('Failed to fetch from server. Showing saved data.');
//       }
//     };

//     fetchAppointments();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/auction/appointment/${id}`, {
//         withCredentials: true,
//       });
//       const updatedAppointments = appointments.filter((appt) => appt.id !== id);
//       setAppointments(updatedAppointments);
//       localStorage.setItem('auctionAppointments', JSON.stringify(updatedAppointments));
//       setStatus('Appointment deleted successfully.');
//     } catch (error) {
//       console.error('Delete Error:', error);
//       setStatus(error.response?.data?.message || 'Error deleting appointment.');
//     }
//   };

//   return (
//     <main className="p-5">
//       <section className="appointments-container">
//         <h1>All Appointments</h1>
//         <Link to="/auction" className="cta-button mb-4">
//           Back to Auction
//         </Link>
//         {status && <p className="status-message">{status}</p>}

//         {appointments.length > 0 ? (
//           appointments.map((appointment) => (
//             <div key={appointment.id} className="appointment-card">
//               <p><strong>Name:</strong> {appointment.name}</p>
//               <p><strong>City:</strong> {appointment.city}</p>
//               <p><strong>Date:</strong> {appointment.date}</p>
//               <p><strong>Crop:</strong> {appointment.crop}</p>
//               <p><strong>Crop Quntity:</strong> {appointment.crop_quntity}</p>
//               <p><strong>Mobile:</strong> {appointment.mobile}</p>
//               <p><strong>Aadhar:</strong> {appointment.aadhar}</p>
//               <button
//                 onClick={() => handleDelete(appointment.id)}
//                 className="cta-button mt-2"
//                 style={{ backgroundColor: '#d32f2f' }}
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No appointments found.</p>
//         )}
//       </section>
//     </main>
//   );
// };

// export default Appointments;







// After Fill Up Form For Auction Then Show Form Details On This Page.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/index.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auction/appointments', {
          withCredentials: true,
        });
        setAppointments(response.data);
        localStorage.setItem('auctionAppointments', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching appointments:', error);
        const storedAppointments = JSON.parse(localStorage.getItem('auctionAppointments') || '[]');
        setAppointments(storedAppointments);
        setStatus('Failed to fetch from server. Showing saved data.');
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auction/appointment/${id}`, {
        withCredentials: true,
      });
      const updatedAppointments = appointments.filter((appt) => appt._id !== id);
      setAppointments(updatedAppointments);
      localStorage.setItem('auctionAppointments', JSON.stringify(updatedAppointments));
      setStatus('Appointment deleted successfully.');
    } catch (error) {
      console.error('Delete Error:', error);
      setStatus(error.response?.data?.message || 'Error deleting appointment.');
    }
  };

  return (
    <main className="p-5">
      <section className="appointments-container">
        <h1>All Appointments</h1>
        <Link to="/auction" className="cta-button mb-4">
          Back to Auction
        </Link>
        {status && <p className="status-message">{status}</p>}

        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment._id} className="appointment-card">
              <p><strong>Name:</strong> {appointment.name}</p>
              <p><strong>City:</strong> {appointment.city}</p>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Crop:</strong> {appointment.crop}</p>
              <p><strong>Crop Quntity:</strong> {appointment.qunt}</p>
              <p><strong>Mobile:</strong> {appointment.mobile}</p>
              <p><strong>Aadhar:</strong> {appointment.aadhar}</p>
              <button
                onClick={() => handleDelete(appointment._id)}
                className="cta-button mt-2"
                style={{ backgroundColor: '#d32f2f' }}
              >
                Delete
              </button>
              <h1 style={{color:"blue"}}>We Will Provide Slot Of {appointment.crop} In {appointment.city} On {appointment.date} By Massage In Your Dashboard</h1>
            </div>
          ))
        ) : (
          <p>No appointments found.</p>
        )}
      </section>
    </main>
  );
};

export default Appointments;   
