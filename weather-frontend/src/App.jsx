import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";

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
      const res = await fetch(`https://weather-app-backend-elrt.onrender.com/api/weather?city=${encodeURIComponent(city)}`);
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

        <SearchBar city={city} setCity={setCity} getWeather={getWeather} />

        {loading && <p className="loading">Fetching weather...</p>}
        {error && <p className="error">❌ {error}</p>}

        <WeatherCard weather={weather} />

        <WeatherCard weather={weather} />
        <Forecast forecast={weather?.forecast} />
      </div>
    </div>
  );
}

export default App;