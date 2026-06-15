function WeatherCard({ weather }) {
    if (!weather) return null;

    const getLocalTime = () => {
        console.log("timezone value:", weather.timezone);
        console.log("timezone type:", typeof weather.timezone);

        const timezone = Number(weather.timezone);
        console.log("timezone as number:", timezone);

        const utcSeconds = Math.floor(Date.now() / 1000);
        const localSeconds = utcSeconds + timezone;
        const d = new Date(localSeconds * 1000);

        console.log("date object:", d);
        console.log("UTC hours:", d.getUTCHours());
        console.log("UTC day:", d.getUTCDay());

        const hours = d.getUTCHours();
        const minutes = d.getUTCMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = (hours % 12 || 12).toString();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = days[d.getUTCDay()];

        return `${day}, ${displayHours}:${minutes} ${ampm}`;
    };

    return (
        <div className="weather-box">
            <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt="icon"
            />
            <div className="city-name">{weather.city}, {weather.country}</div>
            <div className="description">{weather.description}</div>
            <div className="local-time">🕐 {getLocalTime()}</div>
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
    );
}

export default WeatherCard;