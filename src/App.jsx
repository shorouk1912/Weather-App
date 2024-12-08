import axios from "axios";
import { useState } from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function App() {
  let [data, setData] = useState(null);
  let [cityName, setCityName] = useState("");
  let [loading, setLoading] = useState(false);
  let getWeather = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=247e6423456bada4e071664fd5115fbf`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Enter city name"
          onChange={(e) => setCityName(e.target.value)}
        />
        <button onClick={getWeather}>
          <i className="fas fa-search"></i>
        </button>
        {loading ? (
          <h5>Loading...</h5>
        ) : (
          data && (
            <>
                <h1 className="location">{data.name}</h1>
                <img src="/sun.png" alt="sun" width={150} height={100}/>
              <p className="temp">{data.main.temp} °C</p>
              <p>Humidity: {data.main.humidity}%</p>
              <p>Wind Speed: {data.wind.speed} km/h</p>
            </>
          )
        )}
      </div>
    </>
  );
}
