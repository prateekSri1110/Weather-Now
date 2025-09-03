import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

// Predefined backgrounds
const BGs = {
  cold: "https://www.findingtheuniverse.com/wp-content/uploads/2017/01/Blue2Bhour2BFinland_by_Laurence2BNorah.jpg",
  mild: "https://wallpapercave.com/wp/wp3057845.jpg",
  warm: "https://lasvegasluvbugweddings.com/wp-content/gallery-bank/gallery-uploads/Valley%20of%20Fire%20Wedding-129.jpg",
  hot: "https://cdn.wallpapersafari.com/28/67/xJGc9C.jpg",
  night:
    "https://th.bing.com/th/id/R.79e06d182341bb4c84db8d46226bccb4?rik=h8Ycg2qd8aM7yw&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f1%2fb%2fb%2f29368.jpg&ehk=dG%2f7X9l%2b12z5BJeU4UdLaPm3zO9FayCHlILlmUL7eh4%3d&risl=&pid=ImgRaw&r=0",
};

function App() {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [bgUrl, setBgUrl] = useState(BGs.cold); // default background

  // city suggestions
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (city.trim().length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            city
          )}&format=json`
        );
        setSuggestions(res.data.slice(0, 3)); //top 3 suggesstions
      } catch (err) {
        console.error(err);
      }
    }, 300); // debounce: wait 300ms after typing stops

    return () => clearTimeout(timeout);
  }, [city]);

  // input field (place) as argument to funtion to get lat & lon of the place
  const getWeather = async (place) => {
    try {
      const lat = place.lat;
      const lon = place.lon;

      const weatherRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );

      const w = weatherRes.data.current_weather;

      setWeather({
        city: place.display_name,
        temperature: w.temperature,
        windspeed: w.windspeed,
        time: w.time,
      });
      setError(null);
      setSuggestions([]);

      // background based on temperature & day/night
      const t = w.temperature;
      const isDay = w.is_day; // 1 = day, 0 = night

      if (isDay === 0) {
        // if night, always night background
        setBgUrl(BGs.night);
      } else if (t <= 5) {
        setBgUrl(BGs.cold);
      } else if (t > 5 && t <= 20) {
        setBgUrl(BGs.mild);
      } else if (t > 20 && t <= 30) {
        setBgUrl(BGs.warm);
      } else {
        setBgUrl(BGs.hot);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather!");
      setWeather(null);
    }
  };

  const handleSuggestionClick = (place) => {
    setCity(place.display_name);
    getWeather(place);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url("${bgUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="text-center text-white w-50 position-relative">
        <h1 className="mb-4">Weather Now</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              if (suggestions.length > 0) getWeather(suggestions[0]); // default: first suggestion
            }}
            style={{
              backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/012/066/505/original/sunny-and-rainy-day-weather-forecast-icon-meteorological-sign-3d-render-png.png')`,
              backgroundSize: "30px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "10px center",
              paddingLeft: "40px",
            }}
          >
            Search
          </button>
        </div>

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <ul
            className="list-group position-absolute w-100"
            style={{ zIndex: 1000, top: "100%" }}
          >
            {suggestions.map((place) => (
              <li
                key={place.place_id}
                className="list-group-item list-group-item-action"
                style={{ cursor: "pointer" }}
                onClick={() => handleSuggestionClick(place)}
              >
                {place.display_name}
              </li>
            ))}
          </ul>
        )}

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {weather && (
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Weather in {weather.city}</h5>
              <p className="card-text">Temperature: {weather.temperature}°C</p>
              <p className="card-text">Windspeed: {weather.windspeed} km/h</p>
              <p className="card-text">Time: {weather.time}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
