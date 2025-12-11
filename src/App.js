import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import ContactForm from './components/ContactForm';
import PastExperiences from './components/PastExperiences';
import Payment from './components/Payment';
import QRSell from './components/QRSell';
import RiskAssessment from './components/RiskAssessment';
import Schemes from './components/Schemes';
import SellBuy from './components/SellBuy';
import Shopping from './components/Shopping';
import Cart from './components/Cart';
import Trends from './components/Trends';
import WeatherRisk from './components/WeatherRisk';
import Auction from './components/Auction';
import Appointments from './components/Appointments';
import WeathUpdates from './components/WeathUpdates.js';
import Collaboration from './components/Collaboration';
import Dashboard from './components/Dashboard';
import LoanForm from './components/LoanForm';
import LoanReview from './components/LoanReview';
import AuctionApprovalDashboard from './components/AuctionApprovalDashboard';
import LoanApprovalDashboard from './components/LoanApprovalDashboard';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Chatbot from './components/Chatbot';
import ForgotPassword from './components/ForgotPassword.js';
import ResetPassword from './components/ResetPassword.js';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/past-experiences" element={<PastExperiences />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/qr-sell" element={<QRSell />} />
          <Route path="/risk-assessment" element={<RiskAssessment />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/sell-buy" element={<SellBuy />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/weather-risk" element={<WeatherRisk />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/WeathUpdates" element={<WeathUpdates />} />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/loan-form" element={<LoanForm />} />
          <Route path="/review" element={<LoanReview />} />
          <Route path="/loan-approval" element={<LoanApprovalDashboard />} />
          <Route path="/auction-approval" element={<AuctionApprovalDashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/about" element={<div className="p-5"><h2>About</h2><p>FarmerWorld helps farmers optimize their activities.</p></div>} />
          <Route path="/terms" element={<div className="p-5"><h2>Terms of Service</h2><p>Terms coming soon.</p></div>} />
          <Route path="/privacy" element={<div className="p-5"><h2>Privacy Policy</h2><p>Privacy policy coming soon.</p></div>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;