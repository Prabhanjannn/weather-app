require('dotenv').config();
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // ADD THIS


app.use(express.static('public'));

app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: 'City is required' });

  const apiKey = process.env.WEATHER_API_KEY;
 const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
const data = await response.json();

const forecastResponse = await fetch(forecastUrl);
const forecastData = await forecastResponse.json();

    if (data.cod !== 200) {
      return res.status(404).json({ error: 'City not found' });
    }

 res.json({
  city: data.name,
  country: data.sys.country,
  temp: Math.round(data.main.temp),
  feels_like: Math.round(data.main.feels_like),
  humidity: data.main.humidity,
  wind: data.wind.speed,
  condition: data.weather[0].main,
  description: data.weather[0].description,
  icon: data.weather[0].icon,
  timezone: data.timezone,
  forecast: forecastData.list
    .filter((_, index) => index % 8 === 0)
    .map(item => ({
      date: item.dt_txt.split(' ')[0],
      temp: Math.round(item.main.temp),
      condition: item.weather[0].main,
      icon: item.weather[0].icon
    }))
 });
      
      
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));