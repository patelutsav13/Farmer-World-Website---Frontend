import { Link } from 'react-router-dom';
import '../styles/index.css';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/weather-risk">Weather Risk</Link>
      <Link to="/auction">Auction</Link>
      <Link to="/collaboration">Collaboration</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/chatbot">Chatbot</Link>
      <Link to="/loan-approval">Loan Approval Dashboard</Link>
      <Link to="/auction-approval">Auction Approval Dashboard</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/about">About</Link>
    </nav>
  );
};

export default Navbar;