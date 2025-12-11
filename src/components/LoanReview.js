// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../styles/LoanForm.css'; // reuse same styles or create separate if you want

// const LoanReview = () => {
//   const [formData, setFormData] = useState(null);
//   const [status, setStatus] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchFormData();
//   }, []);

//   const fetchFormData = async () => {
//     try {
//       const res = await axios.get('http://localhost:5002/api/loan/form', { withCredentials: true });
//       setFormData(res.data);
//       setStatus('');
//     } catch {
//       setStatus('❌ No form data found.');
//       setFormData(null);
//     }
//   };

//   const handleUnsubmit = async () => {
//     try {
//       await axios.delete('http://localhost:5002/api/loan/form', { withCredentials: true });
//       setStatus('✅ Form data cleared.');
//       setFormData(null);
//       // Redirect back to form page after clearing
//       navigate('/');
//     } catch {
//       setStatus('❌ Failed to clear form data.');
//     }
//   };

//   if (status) {
//     return (
//       <div className="loan-form-container">
//         <h2>Loan Application Review</h2>
//         <p className="status-message">{status}</p>
//         <button onClick={() => navigate('/')} className="submit-btn">Back to Form</button>
//       </div>
//     );
//   }

//   if (!formData) return <p>Loading...</p>;

//   return (
//     <div className="loan-form-container">
//       <h2>Loan Application Review</h2>
//       <div className="form-data-display">
//         <h1 style={{color:"red"}}>Your Loanform Submited If You Want To Unsubmit Then Click Unsubmit</h1>
//         <p><strong>Name:</strong> {formData.name}</p>
//         <p><strong>Age:</strong> {formData.age}</p>
//         <p><strong>Occupation:</strong> {formData.occupation}</p>
//         <p><strong>Income:</strong> {formData.income}</p>
//         <p><strong>Bank:</strong> {formData.bankName}</p>
//         <p><strong>Branch:</strong> {formData.branchName}</p>
//       </div>
//       <button onClick={handleUnsubmit} className="unsubmit-btn">Unsubmit Form (Clear Data)</button>
//       <h1 style={{color:"blue"}}>After 10 Day In You Mail Approve or Reject Massage Come.</h1>
//     </div>
//   );
// };

// export default LoanReview;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoanForm.css';

const LoanReview = () => {
  const [formData, setFormData] = useState(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const res = await axios.get('http://localhost:5002/api/loan/form', { withCredentials: true });
      setFormData(res.data);
      setStatus('');
    } catch {
      setStatus('❌ No form data found.');
      setFormData(null);
    }
  };

  const handleUnsubmit = async () => {
    try {
      await axios.delete('http://localhost:5002/api/loan/form', { withCredentials: true });
      setStatus('✅ Form data cleared.');
      setFormData(null);
      navigate('/');
    } catch {
      setStatus('❌ Failed to clear form data.');
    }
  };

  if (status) {
    return (
      <div className="loan-form-container">
        <h2>Loan Application Review</h2>
        <p className="status-message">{status}</p>
        <button onClick={() => navigate('/')} className="submit-btn">Back to Form</button>
      </div>
    );
  }

  if (!formData) return <p>Loading...</p>;

  return (
    <div className="loan-form-container">
      <h2>Loan Application Review</h2>
      <div className="form-data-display">
        <h1 style={{color:"red"}}>Your Loanform Submitted. If You Want To Unsubmit Then Click Unsubmit</h1>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Age:</strong> {formData.age}</p>
        <p><strong>Occupation:</strong> {formData.occupation}</p>
        <p><strong>Income:</strong> {formData.income}</p>
        <p><strong>Bank:</strong> {formData.bankName}</p>
        <p><strong>Branch:</strong> {formData.branchName}</p>

        <p><strong>Status:</strong> {formData.status}</p>
        {formData.approverComments && <p><strong>Approver Comments:</strong> {formData.approverComments}</p>}
        {formData.status !== 'Pending' && <p><em>Decision made on: {new Date(formData.approvalDate).toLocaleDateString()}</em></p>}

      </div>
      <button onClick={handleUnsubmit} className="unsubmit-btn">Unsubmit Form (Clear Data)</button>
      <h1 style={{color:"blue"}}>After 10 Days, You Will Receive Approval or Rejection Message via Dashboard.</h1>
    </div>
  );
};

export default LoanReview;
