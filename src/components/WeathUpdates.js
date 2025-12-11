import React, { useState } from 'react';
import axios from 'axios';
import '../styles/index.css';

const WeathUpdates = () => {
  const [location, setLocation] = useState('');
  const [weatherInfo, setWeatherInfo] = useState('');

  const getWeather = async () => {
    try {
      const apiKey = 'c4f6ac9d78d4b15274d8d0fb5f7b040a'; 
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      const data = response.data;
      setWeatherInfo(`Weather in ${location}: ${data.weather[0].description}, ${data.main.temp}°C, ${data.main.humidity} % ,  ${data.wind.speed} Km`);
    } catch (error) {
      console.error('Error fetching weather:', error.response || error.message);
      setWeatherInfo('Weather information not available for this location.');
    }
  };

  return (
    <main className="p-5">
      <section className="form-section" id="weatherUpdates">
        <h3>Weather Updates</h3>
        <p>Get the latest weather conditions for your area.</p>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your Location"
        />
        <button onClick={getWeather}>Get Weather</button>
        <p>{weatherInfo}</p>
      </section>
    </main>
  );
};

export default WeathUpdates;
