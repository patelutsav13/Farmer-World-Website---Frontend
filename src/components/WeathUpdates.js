import React, { useState } from 'react';
import axios from 'axios';

const WeathUpdates = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const getWeather = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setWeatherData(null);

    try {
      const apiKey = 'c4f6ac9d78d4b15274d8d0fb5f7b040a'; 
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error.response || error.message);
      setErrorMsg('⚠️ Weather information not available. Please verify the city name.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
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
          <h2 className="text-3xl font-extrabold text-[#0f3423] tracking-tight">🌤 Live Weather Updates</h2>
          <p className="text-emerald-950/70 text-sm mt-2">Check real-time temperatures, wind currents, and humidity indexes</p>
        </div>

        {/* Form Container with Slight Creamy/Green Gradient Shading */}
        <form onSubmit={getWeather} className="bg-gradient-to-br from-amber-50/70 via-emerald-50/40 to-green-100/60 border-2 border-emerald-500/20 shadow-lg p-6 md:p-8 rounded-3xl space-y-5 mb-8">
          <div>
            <label className="block text-sm font-bold text-emerald-950/80 mb-2">Search Location / City</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Mumbai, London, Tokyo"
              className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold text-emerald-950 placeholder-emerald-900/30"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-base shadow-lg shadow-emerald-700/20 hover:shadow-xl hover:shadow-emerald-700/30 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Fetching report...' : 'Get Live Updates'}
          </button>
        </form>

        {/* Live Weather Report Display */}
        {weatherData && (
          <div className="bg-emerald-950 text-white p-8 rounded-3xl shadow-xl space-y-6" data-aos="zoom-in">
            <div className="flex justify-between items-center border-b border-emerald-800 pb-4">
              <div>
                <h3 className="text-2xl font-black">{weatherData.name}, {weatherData.sys?.country}</h3>
                <p className="text-emerald-300 font-semibold capitalize text-sm">{weatherData.weather[0].description}</p>
              </div>
              <span className="text-5xl">⛅</span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-emerald-900/40 rounded-2xl border border-emerald-800">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">Temperature</span>
                <p className="text-3xl font-black">{Math.round(weatherData.main.temp)}°C</p>
              </div>

              <div className="p-4 bg-emerald-900/40 rounded-2xl border border-emerald-800">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">Humidity</span>
                <p className="text-3xl font-black">{weatherData.main.humidity}%</p>
              </div>

              <div className="p-4 bg-emerald-900/40 rounded-2xl border border-emerald-800">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">Wind Speed</span>
                <p className="text-2xl font-black mt-1">{weatherData.wind.speed} km/h</p>
              </div>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-xl font-bold text-sm text-center border bg-red-500/10 text-red-800 border-red-500/20">
            {errorMsg}
          </div>
        )}
      </div>
    </main>
  );
};

export default WeathUpdates;
