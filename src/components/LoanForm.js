import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoanForm.css';

const LoanForm = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    occupation: 'Farmer',
    income: '',
    bankName: '',
    branchName: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const incomeOptions = [
    '0-90000',
    '90000-130000',
    '130000-160000',
    '160000-200000',
    '200000-up to',
  ];
  const bankOptions = ['Bank of India', 'SBI', 'Punjab National Bank', 'ICICI'];
  const branchOptions = ['Main Branch', 'City Branch', 'Rural Branch'];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post('http://localhost:5002/api/loan/apply', form, {
        withCredentials: true,
      });
      setMessage('✅ Your form submitted!');
      // Redirect to review page after submit
      navigate('/review');
    } catch (error) {
      setMessage('❌ Submission failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="loan-form-container">
      <h2>Loan Application Form</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="loan-form">
        <label>Name:<input type="text" name="name" value={form.name} onChange={handleChange} required /></label>
        <label>Age:<input type="number" name="age" value={form.age} onChange={handleChange} required /></label>
        <label>Occupation:
          <select name="occupation" value={form.occupation} onChange={handleChange}>
            <option>Farmer</option><option>Trader</option><option>Laborer</option><option>Other</option>
          </select>
        </label>
        <label>Income:
          <select name="income" value={form.income} onChange={handleChange} required>
            <option value="">Select Income Range</option>
            {incomeOptions.map((inc) => <option key={inc}>{inc}</option>)}
          </select>
        </label>
        <label>Bank Name:
          <select name="bankName" value={form.bankName} onChange={handleChange} required>
            <option value="">Select Bank</option>
            {bankOptions.map((bank) => <option key={bank}>{bank}</option>)}
          </select>
        </label>
        <label>Branch Name:
          <select name="branchName" value={form.branchName} onChange={handleChange} required>
            <option value="">Select Branch</option>
            {branchOptions.map((branch) => <option key={branch}>{branch}</option>)}
          </select>
        </label>
        <button type="submit" className="submit-btn">Submit Loan Application</button>
      </form>
    </div>
  );
};

export default LoanForm;
