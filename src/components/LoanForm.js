// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const LoanForm = () => {
//   const [form, setForm] = useState({
//     name: '',
//     age: '',
//     occupation: 'Farmer',
//     income: '',
//     bankName: '',
//     branchName: '',
//     pancardFile: '',
//     otherDocsFiles: []
//   });
  
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const incomeOptions = [
//     '0 - 90,000 INR',
//     '90,000 - 130,000 INR',
//     '130,000 - 160,000 INR',
//     '160,000 - 200,000 INR',
//     '200,000 INR & Above',
//   ];
//   const bankOptions = ['Bank of India', 'SBI', 'Punjab National Bank', 'ICICI'];
//   const branchOptions = ['Main Branch', 'City Branch', 'Rural Branch'];

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   // Handle converting selected files to Base64 for storing in DB
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (e.target.name === 'pancardFile') {
//           setForm(prev => ({ ...prev, pancardFile: reader.result }));
//         } else {
//           setForm(prev => ({ ...prev, otherDocsFiles: [reader.result] }));
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');
//     try {
//       await axios.post('http://localhost:5002/api/loan/apply', form, {
//         withCredentials: true,
//       });
//       setMessage('✅ Your loan application was submitted successfully!');
//       setTimeout(() => {
//         navigate('/review');
//       }, 1500);
//     } catch (error) {
//       setMessage('❌ Submission failed: ' + (error.response?.data?.message || error.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-6 py-12 fadeInUp">
//       <div className="bg-white border border-emerald-500/10 shadow-2xl p-8 md:p-12 rounded-3xl relative overflow-hidden">
//         {/* Logo header */}
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
//           <h2 className="text-3xl font-extrabold text-[#0f3423] tracking-tight">Agricultural Loan Application</h2>
//           <p className="text-emerald-950/70 text-sm mt-2">Apply for eco-friendly farming loans with low interest rates & zero collateral</p>
//         </div>

//         {message && (
//           <div 
//             className={`p-4 rounded-xl mb-6 text-sm font-semibold transition-all duration-300 border text-center ${
//               message.startsWith('✅') 
//                 ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20' 
//                 : 'bg-red-500/10 text-red-800 border-red-500/20'
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="bg-gradient-to-br from-amber-50/70 via-emerald-50/40 to-green-100/60 border-2 border-emerald-500/20 shadow-lg p-6 md:p-8 rounded-3xl space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div>
//               <label className="block text-sm font-bold text-emerald-950/80 mb-2">Applicant Full Name</label>
//               <input 
//                 type="text" 
//                 name="name" 
//                 value={form.name} 
//                 onChange={handleChange} 
//                 placeholder="Enter full name"
//                 className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
//                 required 
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-bold text-emerald-950/80 mb-2">Age</label>
//               <input 
//                 type="number" 
//                 name="age" 
//                 value={form.age} 
//                 onChange={handleChange} 
//                 placeholder="Enter age (18+)"
//                 min="18"
//                 max="100"
//                 className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
//                 required 
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div>
//               <label className="block text-sm font-bold text-emerald-950/80 mb-2">Occupation</label>
//               <select 
//                 name="occupation" 
//                 value={form.occupation} 
//                 onChange={handleChange}
//                 className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-emerald-950"
//               >
//                 <option value="Farmer">Farmer / Cultivator</option>
//                 <option value="Trader">Agricultural Trader</option>
//                 <option value="Laborer">Farm Laborer</option>
//                 <option value="Other">Other Allied Services</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-bold text-emerald-950/80 mb-2">Annual Family Income</label>
//               <select 
//                 name="income" 
//                 value={form.income} 
//                 onChange={handleChange} 
//                 className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-emerald-950"
//                 required
//               >
//                 <option value="">Select Income Range</option>
//                 {incomeOptions.map((inc) => <option key={inc} value={inc}>{inc}</option>)}
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div>
//               <label className="block text-sm font-bold text-emerald-950/80 mb-2">Target Bank Name</label>
//               <select 
//                 name="bankName" 
//                 value={form.bankName} 
//                 onChange={handleChange} 
//                 className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-emerald-950"
//                 required
//               >
//                 <option value="">Select Target Bank</option>
//                 {bankOptions.map((bank) => <option key={bank} value={bank}>{bank}</option>)}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-bold text-emerald-950/80 mb-2">Target Bank Branch</label>
//               <select 
//                 name="branchName" 
//                 value={form.branchName} 
//                 onChange={handleChange} 
//                 className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-emerald-950"
//                 required
//               >
//                 <option value="">Select Bank Branch</option>
//                 {branchOptions.map((branch) => <option key={branch} value={branch}>{branch}</option>)}
//               </select>
//             </div>
//           </div>

//           {/* Real-time Document Attachments */}
//           <div className="border-t border-emerald-500/15 pt-5 space-y-4">
//             <h4 className="text-base font-bold text-[#0f3423] mb-2">Document Attachments (Proof Verification)</h4>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div>
//                 <label className="block text-xs font-bold text-emerald-950/80 mb-1.5 uppercase">Applicant PAN Card File</label>
//                 <input 
//                   type="file" 
//                   name="pancardFile" 
//                   onChange={handleFileChange}
//                   accept="image/*,application/pdf"
//                   className="w-full text-sm text-emerald-950 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
//                   required
//                 />
//                 {form.pancardFile && <p className="text-xs text-emerald-700 font-semibold mt-1">✓ PAN Card Loaded</p>}
//               </div>

//               <div>
//                 <label className="block text-xs font-bold text-emerald-950/80 mb-1.5 uppercase">Other Docs (Land Proof / Aadhar)</label>
//                 <input 
//                   type="file" 
//                   name="otherDocsFiles" 
//                   onChange={handleFileChange}
//                   accept="image/*,application/pdf"
//                   className="w-full text-sm text-emerald-950 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
//                   required
//                 />
//                 {form.otherDocsFiles.length > 0 && <p className="text-xs text-emerald-700 font-semibold mt-1">✓ Supporting Docs Loaded</p>}
//               </div>
//             </div>
//           </div>

//           <button 
//             type="submit" 
//             className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-base shadow-lg shadow-emerald-700/20 hover:shadow-xl hover:shadow-emerald-700/30 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
//             disabled={loading}
//           >
//             {loading ? 'Submitting Application...' : 'Submit Loan Application'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoanForm;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';

const LoanForm = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    occupation: 'Farmer',
    income: '',
    bankName: '',
    branchName: '',
    pancardFile: '',
    otherDocsFiles: []
  });
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const incomeOptions = [
    '0 - 90,000 INR',
    '90,000 - 130,000 INR',
    '130,000 - 160,000 INR',
    '160,000 - 200,000 INR',
    '200,000 INR & Above',
  ];
  const bankOptions = ['Bank of India', 'SBI', 'Punjab National Bank', 'ICICI'];
  const branchOptions = ['Main Branch', 'City Branch', 'Rural Branch'];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle converting selected files to Base64 for storing in DB
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (e.target.name === 'pancardFile') {
          setForm(prev => ({ ...prev, pancardFile: reader.result }));
        } else {
          setForm(prev => ({ ...prev, otherDocsFiles: [reader.result] }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.post(`${API_BASE_URL}/api/loan/apply`, form, {
        withCredentials: true,
      });
      setMessage('✅ Your loan application was submitted successfully!');
      setTimeout(() => {
        navigate('/review');
      }, 1500);
    } catch (error) {
      setMessage('❌ Submission failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 fadeInUp">
      <div className="bg-white border border-emerald-500/10 shadow-2xl p-8 md:p-12 rounded-3xl relative overflow-hidden">
        {/* Logo header */}
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
          <h2 className="text-3xl font-extrabold text-[#0f3423] tracking-tight">Agricultural Loan Application</h2>
          <p className="text-emerald-950/70 text-sm mt-2">Apply for eco-friendly farming loans with low interest rates & zero collateral</p>
        </div>

        {message && (
          <div 
            className={`p-4 rounded-xl mb-6 text-sm font-semibold transition-all duration-300 border text-center ${
              message.startsWith('✅') 
                ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20' 
                : 'bg-red-500/10 text-red-800 border-red-500/20'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-amber-50/70 via-emerald-50/40 to-green-100/60 border-2 border-emerald-500/20 shadow-lg p-6 md:p-8 rounded-3xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-emerald-950/80 mb-2">Applicant Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                placeholder="Enter full name"
                className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-emerald-950/80 mb-2">Age</label>
              <input 
                type="number" 
                name="age" 
                value={form.age} 
                onChange={handleChange} 
                placeholder="Enter age (18+)"
                min="18"
                max="100"
                className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium"
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-emerald-950/80 mb-2">Occupation</label>
              <select 
                name="occupation" 
                value={form.occupation} 
                onChange={handleChange}
                className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-emerald-950"
              >
                <option value="Farmer">Farmer / Cultivator</option>
                <option value="Trader">Agricultural Trader</option>
                <option value="Laborer">Farm Laborer</option>
                <option value="Other">Other Allied Services</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-emerald-950/80 mb-2">Annual Family Income</label>
              <select 
                name="income" 
                value={form.income} 
                onChange={handleChange} 
                className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-emerald-950"
                required
              >
                <option value="">Select Income Range</option>
                {incomeOptions.map((inc) => <option key={inc} value={inc}>{inc}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-emerald-950/80 mb-2">Target Bank Name</label>
              <select 
                name="bankName" 
                value={form.bankName} 
                onChange={handleChange} 
                className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-emerald-950"
                required
              >
                <option value="">Select Target Bank</option>
                {bankOptions.map((bank) => <option key={bank} value={bank}>{bank}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-emerald-950/80 mb-2">Target Bank Branch</label>
              <select 
                name="branchName" 
                value={form.branchName} 
                onChange={handleChange} 
                className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white/80 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-emerald-950"
                required
              >
                <option value="">Select Bank Branch</option>
                {branchOptions.map((branch) => <option key={branch} value={branch}>{branch}</option>)}
              </select>
            </div>
          </div>

          {/* Real-time Document Attachments */}
          <div className="border-t border-emerald-500/15 pt-5 space-y-4">
            <h4 className="text-base font-bold text-[#0f3423] mb-2">Document Attachments (Proof Verification)</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-emerald-950/80 mb-1.5 uppercase">Applicant PAN Card File</label>
                <input 
                  type="file" 
                  name="pancardFile" 
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                  className="w-full text-sm text-emerald-950 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
                  required
                />
                {form.pancardFile && <p className="text-xs text-emerald-700 font-semibold mt-1">✓ PAN Card Loaded</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950/80 mb-1.5 uppercase">Other Docs (Land Proof / Aadhar)</label>
                <input 
                  type="file" 
                  name="otherDocsFiles" 
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                  className="w-full text-sm text-emerald-950 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
                  required
                />
                {form.otherDocsFiles.length > 0 && <p className="text-xs text-emerald-700 font-semibold mt-1">✓ Supporting Docs Loaded</p>}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-base shadow-lg shadow-emerald-700/20 hover:shadow-xl hover:shadow-emerald-700/30 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Submitting Application...' : 'Submit Loan Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanForm;
