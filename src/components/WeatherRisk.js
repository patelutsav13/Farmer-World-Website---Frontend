import React, { useState } from 'react';

const WeatherRisk = () => {
  const [temp, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [prediction, setPrediction] = useState('');
  const [crop, setCrop] = useState('wheat');
  const [farmingTips, setFarmingTips] = useState('');

  const predictWeatherRisk = (e) => {
    e.preventDefault();
    const tempNum = Number(temp);
    const humidityNum = Number(humidity);
    const windSpeedNum = Number(windSpeed);

    if (isNaN(tempNum) || isNaN(humidityNum) || isNaN(windSpeedNum)) {
      setPrediction('⚠️ Please enter valid numeric values.');
      return;
    }

    let riskMessage = '🟢 Low risk: Weather conditions are stable and optimal for crop cultivation.';
    if (tempNum > 40 && humidityNum < 30) {
      riskMessage = '🔴 High risk: Extreme heatwave! Rapid evaporation alert. Increase watering cycles immediately.';
    } else if (humidityNum > 80 && tempNum > 30) {
      riskMessage = '🟡 Medium risk: High humidity detected! High probability of fungal leaf disease outbreaks.';
    } else if (windSpeedNum > 60) {
      riskMessage = '🔴 High risk: Storm warning! Secure loose trellises and avoid spraying liquid nutrients.';
    }
    setPrediction(riskMessage);
  };

  const getFarmingTips = (e) => {
    e.preventDefault();
    const tips = {
      wheat: '🌾 Water wheat crops once a week. Avoid waterlogging during the root elongation stage.',
      rice: '🌾 Keep fields continuously flooded. Monitor insect infestations and treat early with biological sprays.',
      maize: '🌽 Requires moderate soil moisture. Ensure spacious planting grids to maximize sunlight capture.',
      cotton: '🌱 Thrives in warm dry climates. Safeguard buds with organic neem solutions to deter bollworms.',
      soybean: '🌱 Do not overwater. Rotate nitrogen-fixing soybeans with grain fields to maintain organic topsoil health.',
    };
    setFarmingTips(tips[crop] || 'No tips available for this crop.');
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 bg-[#fbfdf9] min-h-screen">
      {/* Brand header */}
      <div className="text-center mb-12">
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
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f3423] tracking-tight">🌾 Weather Risk & Crop Assistant</h2>
        <p className="text-emerald-950/70 text-sm mt-2">Evaluate dynamic risk factors and load automated cultivation recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Risk Calculator Card */}
        <div className="bg-white border border-emerald-500/10 shadow-2xl p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-[#0f3423] mb-6 pl-2 border-l-4 border-emerald-500">Weather Risk Predictor</h3>
            
            <form onSubmit={predictWeatherRisk} className="bg-gradient-to-br from-amber-50/70 via-emerald-50/40 to-green-100/60 border border-emerald-500/20 p-6 rounded-2xl space-y-4">
              <div>
                <label className="block text-sm font-bold text-emerald-950/80 mb-1.5">Temperature (°C)</label>
                <input
                  type="number"
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                  placeholder="e.g., 32"
                  className="w-full p-3 border border-emerald-500/25 rounded-xl bg-white focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-emerald-950/80 mb-1.5">Humidity (%)</label>
                <input
                  type="number"
                  value={humidity}
                  onChange={(e) => setHumidity(e.target.value)}
                  placeholder="e.g., 65"
                  className="w-full p-3 border border-emerald-500/25 rounded-xl bg-white focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-emerald-950/80 mb-1.5">Wind Speed (km/h)</label>
                <input
                  type="number"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(e.target.value)}
                  placeholder="e.g., 18"
                  className="w-full p-3 border border-emerald-500/25 rounded-xl bg-white focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm font-semibold"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#2e6f40] hover:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md cursor-pointer"
              >
                Analyze Crop Hazards
              </button>
            </form>
          </div>

          {prediction && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950 text-white font-extrabold text-sm border border-emerald-800 shadow-inner">
              {prediction}
            </div>
          )}
        </div>

        {/* Crop Tips Card */}
        <div className="bg-white border border-emerald-500/10 shadow-2xl p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-[#0f3423] mb-6 pl-2 border-l-4 border-emerald-500">Agronomy Crop Assistant</h3>
            
            <form onSubmit={getFarmingTips} className="bg-gradient-to-br from-amber-50/70 via-emerald-50/40 to-green-100/60 border border-emerald-500/20 p-6 rounded-2xl space-y-6">
              <div>
                <label className="block text-sm font-bold text-emerald-950/80 mb-2">Select Target Crop</label>
                <select 
                  value={crop} 
                  onChange={(e) => setCrop(e.target.value)} 
                  className="w-full p-4 border border-emerald-500/25 rounded-xl bg-white focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 font-bold text-emerald-950"
                >
                  <option value="wheat">Wheat (Grain)</option>
                  <option value="rice">Rice (Paddy)</option>
                  <option value="maize">Maize (Corn)</option>
                  <option value="cotton">Cotton (Fiber)</option>
                  <option value="soybean">Soybean (Legume)</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#2e6f40] hover:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md cursor-pointer"
              >
                Load Farming Guide
              </button>
            </form>
          </div>

          {farmingTips && (
            <div className="mt-6 p-5 rounded-2xl bg-emerald-900 text-white font-bold text-sm leading-relaxed border border-emerald-800 shadow-md">
              {farmingTips}
            </div>
          )}
        </div>

      </div>
    </main>
  );
};

export default WeatherRisk;