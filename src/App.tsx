import React, { useState } from 'react';
import { Search, Cloud, Droplets, Wind, Thermometer } from 'lucide-react';

const API_KEY = 'b0cee03bcc049bb372bff5c8c85a3511'; // This key should be valid as it's from your previous code

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('API response:', data);
      
      if (response.ok) {
        setWeather(data);
      } else {
        setError(`Error: ${data.message || 'Failed to fetch weather data'}`);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Weather App</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
              disabled={loading}
            >
              <Search size={20} />
            </button>
          </div>
        </form>

        {loading && <p className="text-center mb-4">Loading...</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {weather && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">{weather.name}, {weather.sys.country}</h2>
            <div className="flex justify-center items-center mb-4">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="w-20 h-20"
              />
              <p className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</p>
            </div>
            <p className="text-xl mb-4 capitalize">{weather.weather[0].description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center bg-gray-100 rounded-lg p-3">
                <Thermometer className="text-red-500 mr-2" />
                <span>Feels like: {Math.round(weather.main.feels_like)}°C</span>
              </div>
              <div className="flex items-center justify-center bg-gray-100 rounded-lg p-3">
                <Droplets className="text-blue-500 mr-2" />
                <span>Humidity: {weather.main.humidity}%</span>
              </div>
              <div className="flex items-center justify-center bg-gray-100 rounded-lg p-3">
                <Cloud className="text-gray-500 mr-2" />
                <span>Clouds: {weather.clouds.all}%</span>
              </div>
              <div className="flex items-center justify-center bg-gray-100 rounded-lg p-3">
                <Wind className="text-green-500 mr-2" />
                <span>Wind: {weather.wind.speed} m/s</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;