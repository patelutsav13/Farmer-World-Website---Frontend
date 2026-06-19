import React, { useState, useEffect } from 'react';
import axiosReal from 'axios';
import { useNavigate } from 'react-router-dom';

const LoanReview = () => {
  const [formData, setFormData] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const res = await axiosReal.get('http://localhost:5002/api/loan/form', { withCredentials: true });
      setFormData(res.data);
      setStatus('');
    } catch {
      setStatus('❌ No form data found.');
      setFormData(null);
    }
  };

  const handleUnsubmit = async () => {
    if (!window.confirm("Are you sure you want to unsubmit your loan application? This will permanently delete your records.")) return;
    try {
      setLoading(true);
      await axiosReal.delete('http://localhost:5002/api/loan/form', { withCredentials: true });
      setStatus('✅ Loan application data cleared successfully.');
      setFormData(null);
      setTimeout(() => {
        navigate('/loan-form');
      }, 1500);
    } catch {
      setStatus('❌ Failed to clear form data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 fadeInUp">
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
          <h2 className="text-3xl font-extrabold text-[#0f3423] tracking-tight">Loan Application Review</h2>
          <p className="text-emerald-950/70 text-sm mt-2">Check the details of your submitted loan application below</p>
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

        {formData ? (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-amber-50/70 via-emerald-50/40 to-green-100/60 border-2 border-emerald-500/20 shadow-lg p-6 md:p-8 rounded-3xl space-y-4">
              <h3 className="text-xl font-bold text-red-700 text-center mb-4">
                ⚠️ Your Loanform has been submitted.
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-emerald-950">
                <p className="p-3 bg-white/60 rounded-xl"><strong>Name:</strong> {formData.name}</p>
                <p className="p-3 bg-white/60 rounded-xl"><strong>Age:</strong> {formData.age}</p>
                <p className="p-3 bg-white/60 rounded-xl"><strong>Occupation:</strong> {formData.occupation}</p>
                <p className="p-3 bg-white/60 rounded-xl"><strong>Annual Income:</strong> {formData.income}</p>
                <p className="p-3 bg-white/60 rounded-xl"><strong>Selected Bank:</strong> {formData.bankName}</p>
                <p className="p-3 bg-white/60 rounded-xl"><strong>Bank Branch:</strong> {formData.branchName}</p>
                <p className="p-3 bg-white/60 rounded-xl"><strong>Approval Status:</strong> {formData.status}</p>
              </div>

              {formData.approverComments && (
                <div className="p-4 bg-emerald-900 text-white rounded-2xl text-xs font-semibold">
                  <strong>Officer Review Comments:</strong> {formData.approverComments}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-500/10 p-4 rounded-2xl text-center text-sm font-semibold text-emerald-950">
                📢 After review, you will receive approval status and officer comments inside your User Dashboard!
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleUnsubmit} 
                  className="flex-grow bg-[#ef4444] hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer transform active:scale-95 text-center"
                  disabled={loading}
                >
                  Unsubmit Form (Clear Data)
                </button>
                <button 
                  onClick={() => navigate('/loan-form')} 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer text-center"
                >
                  Apply Again
                </button>
              </div>
            </div>
          </div>
        ) : (
          !status && <p className="text-center py-12 text-[#526359] font-semibold">Loading your loan application details...</p>
        )}
      </div>
    </div>
  );
};

export default LoanReview;
