import React, { useState } from 'react';
import '../styles/index.css';


const WeatherRisk = () => {
  const [temp, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [prediction, setPrediction] = useState('');
  const [crop, setCrop] = useState('wheat');
  const [farmingTips, setFarmingTips] = useState('');

  const predictWeatherRisk = () => {
    const tempNum = Number(temp);
    const humidityNum = Number(humidity);
    const windSpeedNum = Number(windSpeed);

    if (isNaN(tempNum) || isNaN(humidityNum) || isNaN(windSpeedNum)) {
      setPrediction('Please enter valid numbers.');
      return;
    }

    let riskMessage = 'Low risk: Weather conditions are stable.';
    if (tempNum > 40 && humidityNum < 30) {
      riskMessage = 'High risk: Extreme heatwave!';
    } else if (humidityNum > 80 && tempNum > 30) {
      riskMessage = 'Medium risk: High humidity!';
    } else if (windSpeedNum > 60) {
      riskMessage = 'High risk: Strong winds detected!';
    }
    setPrediction(riskMessage);
  };

  const getFarmingTips = () => {
    const tips = {
      wheat: 'Water wheat crops once a week. Avoid waterlogging during the growth stage.',
      rice: 'Ensure fields are flooded. Control pests using organic pesticides.',
      maize: 'Requires moderate watering. Use proper spacing for better yield.',
      cotton: 'Needs warm weather. Protect against pests using neem-based solutions.',
      soybean: 'Avoid overwatering. Rotate crops to maintain soil fertility.',
    };
    setFarmingTips(tips[crop] || 'No tips available for this crop.');
  };

  return (
    <main className="p-5">
      <section className="form-section">
        <h3>Enter Weather Data</h3>
        <label>Temperature (°C):</label>
        <input
          type="number"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          placeholder="e.g., 30"
          className="form-section"
        />
        <label>Humidity (%):</label>
        <input
          type="number"
          value={humidity}
          onChange={(e) => setHumidity(e.target.value)}
          placeholder="e.g., 60"
          className="form-section"
        />
        <label>Wind Speed (km/h):</label>
        <input
          type="number"
          value={windSpeed}
          onChange={(e) => setWindSpeed(e.target.value)}
          placeholder="e.g., 15"
          className="form-section"
        />
        <button onClick={predictWeatherRisk} className="cta-button">Predict Risk</button>
        <p className="font-bold">{prediction}</p>
      </section>
      <section className="form-section">
        <h3>Farmer Assistance</h3>
        <label>Select Your Crop:</label>
        <select value={crop} onChange={(e) => setCrop(e.target.value)} className="form-section">
          <option value="wheat">Wheat</option>
          <option value="rice">Rice</option>
          <option value="maize">Maize</option>
          <option value="cotton">Cotton</option>
          <option value="soybean">Soybean</option>
        </select>
        <button onClick={getFarmingTips} className="cta-button">Get Farming Tips</button>
        <p className="font-bold">{farmingTips}</p>
      </section>
    </main>
  );
};

export default WeatherRisk;