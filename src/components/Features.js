import { Link } from 'react-router-dom';
import '../styles/index.css';
import img32 from '../assets/products/img32.jpg';
import img33 from '../assets/products/img33.jpg';
import img34 from '../assets/products/img34.jpg';


const Features = () => {
  return (
    <section id="features">
      <div className="feature-item">
        <img src = {img32} alt="Weather Insights" className="h-16 w-16" />
        <h3>Weather Insights</h3>
        <p>Get real-time weather updates to optimize your farming activities.</p>
        <Link to="/weather-risk" className="cta-button">Learn More</Link>
      </div>
      <div className="feature-item">
        <img src={img33} alt="Auction" className="h-16 w-16" />
        <h3>Online Auction</h3>
        <p>Participate in auctions for seeds, crops, and farming tools.</p>
        <Link to="/auction" className="cta-button">Join Auction</Link>
      </div>
    </section>
  );
};

export default Features;