import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoanApprovalDashboard = () => {
  const [loanForms, setLoanForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [decision, setDecision] = useState('Approved');
  const [comments, setComments] = useState('');

  useEffect(() => {
    fetchPendingForms();
  }, []);

  const fetchPendingForms = async () => {
    try {
      const res = await axios.get('http://localhost:5002/api/loan/forms?status=Pending');
      setLoanForms(res.data);
    } catch (err) {
      alert('Failed to load loan forms');
    }
  };

  const handleSelectForm = (form) => {
    setSelectedForm(form);
    setComments('');
  };

  const handleDecisionSubmit = async () => {
    if (!selectedForm) return;
    try {
      await axios.put(`http://localhost:5002/api/loan/forms/${selectedForm._id}/decision`, {
        status: decision,
        approverComments: comments,
      });
      alert(`Loan ${decision.toLowerCase()}!`);
      setSelectedForm(null);
      fetchPendingForms();
    } catch (error) {
      alert('Failed to update loan form');
    }
  };

  return (
    <>
      <style>{`
        .loan-dashboard * {
          box-sizing: border-box;
          text-align: center;
          color:green;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-weight:'bold';
        }
        .loan-dashboard h2 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 25px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .loan-dashboard h3 {
          color: #34495e;
          margin-bottom: 15px;
        }
        .loan-dashboard ul {
          list-style-type: none;
          padding: 0;
          margin: 0 0 20px 0;
        }
        .loan-dashboard li {
          background: #ecf0f1;
          margin-bottom: 10px;
          padding: 15px 20px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }
        .loan-dashboard li:hover {
          background: #d0d7de;
        }
        .loan-dashboard strong {
          font-weight: 600;
        }
        .loan-dashboard label {
          display: block;
          margin: 15px 0 5px;
          font-weight: 600;
          color: #2c3e50;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .loan-dashboard select,
        .loan-dashboard textarea {
          width: 100%;
          padding: 8px 12px;
          border-radius: 5px;
          border: 1px solid #bdc3c7;
          font-size: 1rem;
          resize: vertical;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          transition: border-color 0.3s ease;
          color: #333;
        }
        .loan-dashboard select:focus,
        .loan-dashboard textarea:focus {
          border-color: #2980b9;
          outline: none;
        }
        .loan-dashboard button {
          margin-top: 15px;
          padding: 10px 20px;
          font-weight: 600;
          font-size: 1rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          color: white;
          background-color: #2980b9;
          margin-right: 10px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .loan-dashboard button:hover {
          background-color: #1c5980;
        }
        .loan-dashboard button:last-child {
          background-color: #95a5a6;
        }
        .loan-dashboard button:last-child:hover {
          background-color: #7f8c8d;
        }
      `}</style>

      <div className="loan-dashboard">
        <h2>Loan Approval Dashboard</h2>

        {!selectedForm && (
          <>
            <h3>Pending Loan Applications</h3>
            <ul>
              {loanForms.length === 0 && <li>No pending loan forms</li>}
              {loanForms.map(form => (
                <li
                  key={form._id}
                  onClick={() => handleSelectForm(form)}
                  title="Click to review this loan application"
                >
                  <strong>{form.name}</strong> - Income: {form.income} - Status: {form.status}
                </li>
              ))}
            </ul>
          </>
        )}

        {selectedForm && (
          <div>
            <h3>Review Loan Form: {selectedForm.name}</h3>
            <p><strong>Age:</strong> {selectedForm.age}</p>
            <p><strong>Occupation:</strong> {selectedForm.occupation}</p>
            <p><strong>Income:</strong> {selectedForm.income}</p>
            <p><strong>Bank:</strong> {selectedForm.bankName}</p>
            <p><strong>Branch:</strong> {selectedForm.branchName}</p>

            <label htmlFor="decision">Decision:</label>
            <select
              id="decision"
              value={decision}
              onChange={e => setDecision(e.target.value)}
            >
              <option value="Approved">Approve</option>
              <option value="Rejected">Reject</option>
            </select>

            <label htmlFor="comments">Comments:</label>
            <textarea
              id="comments"
              rows="3"
              value={comments}
              onChange={e => setComments(e.target.value)}
              placeholder="Optional comments for the applicant"
            />

            <button onClick={handleDecisionSubmit}>Submit Decision</button>
            <button onClick={() => setSelectedForm(null)}>Back</button>
          </div>
        )}
      </div>
    </>
  );
};

export default LoanApprovalDashboard;
