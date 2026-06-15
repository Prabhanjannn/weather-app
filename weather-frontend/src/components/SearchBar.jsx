function SearchBar({ city, setCity, getWeather }) {
  return (
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
  );
}

export default SearchBar;