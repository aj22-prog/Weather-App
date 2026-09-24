import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Chip,
  InputAdornment,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  Search as SearchIcon,
  LocationOn,
  MyLocation,
  History,
  Clear,
} from "@mui/icons-material";
import InfoBox from "./InfoBox";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const POPULAR_CITIES = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Dubai",
  "Mumbai",
  "Sydney",
];

export default function SearchBox() {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("C"); // 'C' or 'F'
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem("weather_recent_searches");
      return saved ? JSON.parse(saved) : ["London", "Tokyo", "New York"];
    } catch {
      return ["London", "Tokyo", "New York"];
    }
  });

  const saveRecentSearch = (cityName) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (c) => c.toLowerCase() !== cityName.toLowerCase()
      );
      const updated = [cityName, ...filtered].slice(0, 5);
      try {
        localStorage.setItem(
          "weather_recent_searches",
          JSON.stringify(updated)
        );
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const getWeatherInfo = async (queryCity) => {
    if (!queryCity || !queryCity.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}?q=${encodeURIComponent(queryCity.trim())}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Could not find weather data for "${queryCity}". Please check the spelling.`);
        } else if (response.status === 401) {
          throw new Error("Invalid API key or unauthorized request. Please verify your OpenWeather key.");
        } else {
          throw new Error("Failed to fetch weather information. Please try again later.");
        }
      }

      const jsonResponse = await response.json();

      const result = {
        city: jsonResponse.name,
        country: jsonResponse.sys?.country,
        temperature: Math.round(jsonResponse.main.temp),
        feelsLike: Math.round(jsonResponse.main.feels_like),
        tempMin: Math.round(jsonResponse.main.temp_min),
        tempMax: Math.round(jsonResponse.main.temp_max),
        description: jsonResponse.weather[0]?.description || "Clear",
        mainCondition: jsonResponse.weather[0]?.main || "Clear",
        humidity: jsonResponse.main.humidity,
        windSpeed: jsonResponse.wind?.speed || 0,
        pressure: jsonResponse.main.pressure,
        visibility: jsonResponse.visibility,
      };

      setWeatherInfo(result);
      saveRecentSearch(jsonResponse.name);
    } catch (err) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const fetchByGeoLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const response = await fetch(
            `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );

          if (!response.ok) throw new Error("Could not retrieve weather for your current position.");

          const jsonResponse = await response.json();
          const result = {
            city: jsonResponse.name,
            country: jsonResponse.sys?.country,
            temperature: Math.round(jsonResponse.main.temp),
            feelsLike: Math.round(jsonResponse.main.feels_like),
            tempMin: Math.round(jsonResponse.main.temp_min),
            tempMax: Math.round(jsonResponse.main.temp_max),
            description: jsonResponse.weather[0]?.description || "Clear",
            mainCondition: jsonResponse.weather[0]?.main || "Clear",
            humidity: jsonResponse.main.humidity,
            windSpeed: jsonResponse.wind?.speed || 0,
            pressure: jsonResponse.main.pressure,
            visibility: jsonResponse.visibility,
          };

          setWeatherInfo(result);
          saveRecentSearch(jsonResponse.name);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setError("Location permission denied or unavailable.");
      }
    );
  };

  // Initial load default city
  useEffect(() => {
    getWeatherInfo("London");
  }, []);

  const handleChange = (event) => {
    setCity(event.target.value);
    if (error) setError(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim()) {
      getWeatherInfo(city);
      setCity("");
    }
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  return (
    <Box className="searchbox-container">
      {/* Search Input Card */}
      <Box className="search-card glass-panel">
        <form onSubmit={handleSubmit} className="search-form">
          <TextField
            fullWidth
            placeholder="Search city or country (e.g., Tokyo, Paris)..."
            variant="outlined"
            value={city}
            onChange={handleChange}
            autoComplete="off"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn sx={{ color: "#38bdf8", ml: 0.5, fontSize: 24 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {city && (
                      <IconButton
                        size="small"
                        onClick={() => setCity("")}
                        sx={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        <Clear fontSize="small" />
                      </IconButton>
                    )}
                    <Tooltip title="Use my current location">
                      <IconButton
                        size="small"
                        onClick={fetchByGeoLocation}
                        disabled={loading}
                        sx={{
                          color: "#38bdf8",
                          background: "rgba(56, 189, 248, 0.12)",
                          "&:hover": { background: "rgba(56, 189, 248, 0.25)" },
                        }}
                      >
                        <MyLocation fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                background: "rgba(15, 23, 42, 0.9)",
                color: "#ffffff",
                fontSize: "1.05rem",
                fontWeight: 500,
                border: "1.5px solid rgba(255, 255, 255, 0.2)",
                transition: "all 0.25s ease",
                "& input::placeholder": {
                  color: "#94a3b8",
                  opacity: 1,
                },
                "&:hover": {
                  borderColor: "rgba(56, 189, 248, 0.6)",
                  background: "rgba(15, 23, 42, 0.95)",
                },
                "&.Mui-focused": {
                  borderColor: "#38bdf8",
                  boxShadow: "0 0 0 4px rgba(56, 189, 248, 0.25)",
                  background: "#0f172a",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading || !city.trim()}
            sx={{
              minWidth: { xs: "100%", sm: "140px" },
              height: "56px",
              borderRadius: "16px",
              fontWeight: 800,
              fontSize: "1.05rem",
              textTransform: "none",
              background: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
              color: "#ffffff !important",
              boxShadow: "0 8px 24px rgba(37, 99, 235, 0.4)",
              transition: "all 0.25s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #0369a1 0%, #1d4ed8 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 28px rgba(37, 99, 235, 0.6)",
              },
              "&:disabled": {
                background: "rgba(255, 255, 255, 0.1)",
                color: "rgba(255, 255, 255, 0.4) !important",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#ffffff" }} />
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <SearchIcon sx={{ fontSize: 22 }} />
                <span>Search</span>
              </Box>
            )}
          </Button>
        </form>

        {/* Quick Suggestions & Recent Searches */}
        <Box sx={{ mt: 2.5, display: "flex", flexDirection: "column", gap: 1.8 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <Typography
              variant="caption"
              sx={{
                color: "#cbd5e1",
                fontWeight: 700,
                letterSpacing: "0.6px",
                fontSize: "0.82rem",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              Popular:
            </Typography>
            {POPULAR_CITIES.slice(0, 5).map((popCity) => (
              <Chip
                key={popCity}
                label={popCity}
                size="small"
                clickable
                onClick={() => getWeatherInfo(popCity)}
                sx={{
                  background: "rgba(30, 41, 59, 0.8)",
                  color: "#f1f5f9",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: "rgba(56, 189, 248, 0.25)",
                    borderColor: "#38bdf8",
                    color: "#ffffff",
                    transform: "translateY(-1px)",
                  },
                }}
              />
            ))}
          </Box>

          {recentSearches.length > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#94a3b8",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontSize: "0.82rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                <History sx={{ fontSize: 16 }} /> Recent:
              </Typography>
              {recentSearches.map((rCity) => (
                <Chip
                  key={rCity}
                  label={rCity}
                  size="small"
                  clickable
                  onClick={() => getWeatherInfo(rCity)}
                  sx={{
                    background: "rgba(14, 165, 233, 0.15)",
                    color: "#bae6fd",
                    border: "1px solid rgba(56, 189, 248, 0.35)",
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    "&:hover": {
                      background: "rgba(56, 189, 248, 0.3)",
                      color: "#ffffff",
                    },
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* Error Notification Alert */}
      {error && (
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setError(null)}
          sx={{
            mt: 2.5,
            borderRadius: "14px",
            background: "rgba(220, 38, 38, 0.9)",
            border: "1px solid #ef4444",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: "0.95rem",
            boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
            "& .MuiAlert-icon": {
              color: "#ffffff",
            },
          }}
        >
          {error}
        </Alert>
      )}

      {/* Weather Result Display */}
      {weatherInfo && (
        <Box sx={{ mt: 3.5 }}>
          <InfoBox
            weatherInfo={weatherInfo}
            unit={unit}
            onToggleUnit={toggleUnit}
          />
        </Box>
      )}
    </Box>
  );
}