function Forecast({ forecast }) {
    if (!forecast || forecast.length === 0) return null;

    const getDayName = (dateStr) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateStr);
        return days[date.getDay()];
    };

    return (
        <div className="forecast">
            <h3>5-Day Forecast</h3>
            {forecast.map((item, index) => (
                <div className="forecast-item" key={index}>
                    <span className="forecast-day">{getDayName(item.date)}</span>
                    <img
                        src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                        alt={item.condition}
                    />
                    <span className="forecast-condition">{item.condition}</span>
                    <span className="forecast-temp">{item.temp}°C</span>
                </div>
            ))}
        </div>
    );
}

export default Forecast;