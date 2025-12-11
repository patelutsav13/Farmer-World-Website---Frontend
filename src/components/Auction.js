// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../styles/index.css';

// const Auction = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     city: '',
//     date: '',
//     crop: '',
//     crop_quntity: '',
//     name: '',
//     mobile: '',
//     aadhar: ''
//   });

//   const [status, setStatus] = useState('');
//   const [loading, setLoading] = useState(false);

//   const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata'];
//   const crops = ['Wheat', 'Rice', 'Maize', 'Cotton', 'Soybean', 'Sugarcane', 'Pulses'];

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatus('');

//     // ✅ Fixed: include crop_quntity in validation
//     if (!formData.city || !formData.date || !formData.crop || !formData.crop_quntity || !formData.name || !formData.mobile || !formData.aadhar) {
//       setStatus('Please fill in all fields.');
//       setLoading(false);
//       return;
//     }

//     if (!/^\d{10}$/.test(formData.mobile)) {
//       setStatus('Mobile number must be 10 digits.');
//       setLoading(false);
//       return;
//     }

//     if (!/^\d{12}$/.test(formData.aadhar)) {
//       setStatus('Aadhar number must be 12 digits.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/auction/appointment', formData, {
//         withCredentials: true
//       });

//       const stored = JSON.parse(localStorage.getItem('auctionAppointments') || '[]');
//       const updated = [...stored, response.data.appointment];
//       localStorage.setItem('auctionAppointments', JSON.stringify(updated));

//       setStatus(`✅ Appointment booked! Confirmation ID: ${response.data.appointmentId}`);
//       setFormData({
//         city: '',
//         date: '',
//         crop: '',
//         crop_quntity: '',
//         name: '',
//         mobile: '',
//         aadhar: ''
//       });

//       setTimeout(() => {
//         navigate('/appointments');
//       }, 1000);
//     } catch (error) {
//       console.error('🚨 Submission Error:', error);
//       setStatus(error.response?.data?.message || 'Failed to book appointment.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="p-5">
//       <section className="form-section">
//         <h3>📅 Book Auction Appointment</h3>
//         <form onSubmit={handleSubmit}>
//           <label>Select City:</label>
//           <select name="city" value={formData.city} onChange={handleChange} required>
//             <option value="">-- Select City --</option>
//             {cities.map(city => <option key={city} value={city}>{city}</option>)}
//           </select>

//           <label>Select Auction Date:</label>
//           <input type="date" name="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} required />

//           <label>Select Crop:</label>
//           <select name="crop" value={formData.crop} onChange={handleChange} required>
//             <option value="">-- Select Crop --</option>
//             {crops.map(crop => <option key={crop} value={crop}>{crop}</option>)}
//           </select>

//           <label>Crop Quantity:</label>
//           <input type="text" name="crop_quntity" value={formData.crop_quntity} onChange={handleChange} required />

//           <label>Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} required />

//           <label>Mobile Number:</label>
//           <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />

//           <label>Aadhar Number:</label>
//           <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} required />

//           <button type="submit"  className="cta-button" disabled={loading}>{loading ? 'Submitting...' : 'Book Appointment'}</button>
//         </form>

//         {status && <p className="mt-3">{status}</p>}
//       </section>
//     </main>
//   );
// };

// export default Auction;


// Fill Form For Auction Appointment.

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../styles/index.css';

const Auction = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    city: '',
    date: '',
    crop: '',
    qunt:'',
    name: '',
    mobile: '',
    aadhar: ''
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const cities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Ahmedabad',
    'Chennai',
    'Kolkata'
  ];

  const crops = [
    'Wheat',
    'Rice',
    'Maize',
    'Cotton',
    'Soybean',
    'Sugarcane',
    'Pulses'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    if (!formData.city || !formData.date || !formData.crop ||!formData.qunt || !formData.name || !formData.mobile || !formData.aadhar) {
      setStatus('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      setStatus('Mobile number must be 10 digits.');
      setLoading(false);
      return;
    }

    if (!/^\d{12}$/.test(formData.aadhar)) {
      setStatus('Aadhar number must be 12 digits.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auction/appointment', formData, {
        withCredentials: true,
        headers: {
      'Content-Type': 'application/json' }
      });
      // ✅ Save to localStorage
      const stored = JSON.parse(localStorage.getItem('auctionAppointments') || '[]');
      const updated = [...stored, response.data.appointment];
      localStorage.setItem('auctionAppointments', JSON.stringify(updated));

      setStatus(`Appointment booked! Confirmation ID: ${response.data.appointmentId}`);
      setFormData({
        city: '',
        date: '',
        crop: '',
        qunt:'',
        name: '',
        mobile: '',
        aadhar: ''
      });

      // ✅ Redirect to Appointments page after 1 second
      setTimeout(() => {
        navigate('/appointments');
      }, 1000);

    } catch (error) {
      console.error('Submission Error:', error);
      setStatus(error.response?.data?.message || 'Failed to book appointment.');
    } finally {
      setLoading(false);
    }

    
  };

  return (
    <main className="p-5">
      <section className="form-section">
        <h3>Book Auction Appointment</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="city">Select City:</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="form-section mb-4"
            required
          >
            <option value="">-- Select City --</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <label htmlFor="date">Select Auction Date:</label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="form-section mb-4"
            required
          />

          <label htmlFor="crop">Select Crop:</label>
          <select
            id="crop"
            name="crop"
            value={formData.crop}
            onChange={handleChange}
            className="form-section mb-4"
            required
          >
            <option value="">-- Select Crop --</option>
            {crops.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>

          <label htmlFor="Quntity">Crop Quntity :</label>
          <input
            id="qunt"
            type="number"
            name="qunt"
            value={formData.qunt}
            onChange={handleChange}
            placeholder="Enter Quntity Of Crop in KG"
            className="form-section mb-4"
            required
          />

          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="form-section mb-4"
            required
          />

          <label htmlFor="mobile">Mobile Number:</label>
          <input
            id="mobile"
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter 10-digit mobile number"
            className="form-section mb-4"
            required
          />

          <label htmlFor="aadhar">Aadhar Number:</label>
          <input
            id="aadhar"
            type="text"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            placeholder="Enter 12-digit Aadhar number"
            className="form-section mb-4"
            required
          />

          <button type="submit" className="cta-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Book Appointment'}
          </button>
        </form>

        {status && <p className="mt-4 font-bold">{status}</p>}
      </section>
    </main>
  );
};

export default Auction;