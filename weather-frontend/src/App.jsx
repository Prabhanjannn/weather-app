import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(`http://localhost:3000/api/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>🌤️ Weather App</h1>

        <div className="search-row">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getWeather()}
          />
          <button onClick={getWeather}>Search</button>
        </div>

        {loading && <p className="loading">Fetching weather...</p>}
        {error && <p className="error">❌ {error}</p>}

        {weather && (
          <div className="weather-box">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="icon"
            />
            <div className="city-name">{weather.city}, {weather.country}</div>
            <div className="description">{weather.description}</div>
            <div className="temp">{weather.temp}°C</div>
            <div className="feels">Feels like {weather.feels_like}°C</div>

            <div className="details">
              <div className="detail-item">
                <span className="detail-label">💧 Humidity</span>
                <span className="detail-value">{weather.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">🌬️ Wind</span>
                <span className="detail-value">{weather.wind} m/s</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">☁️ Condition</span>
                <span className="detail-value">{weather.condition}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;