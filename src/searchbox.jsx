import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./searchBox.css";
import InfoBox from "./InfoBox";


const API_KEY = import.meta.env.VITE_API_KEY;

export default function SearchBox() {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);

  const API_URL =
    "https://api.openweathermap.org/data/2.5/weather";



  const getWeatherInfo = async (city) => {
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const jsonResponse = await response.json();

      const result = {
        city: jsonResponse.name,
        temperature: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        description: jsonResponse.weather[0].description,
        humidity: jsonResponse.main.humidity,
        windSpeed: jsonResponse.wind.speed,
      };

      setWeatherInfo(result);
    } catch (error) {
      console.log(error);
      setWeatherInfo(null);
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    getWeatherInfo(city);
    setCity("");
  };

  return (
    <div className="searchBox">
      <h3>Search the weather</h3>

      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          value={city}
          required
          onChange={handleChange}
        />

        <br />
        <br />

        <Button variant="contained" type="submit">
          Search
        </Button>
      </form>

      {weatherInfo && <InfoBox weatherInfo={weatherInfo} />}
    </div>
  );
}