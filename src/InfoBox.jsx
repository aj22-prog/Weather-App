import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  WaterDrop,
  Air,
  Compress,
  Visibility,
  WbSunny,
  AcUnit,
  Thunderstorm,
  Cloud,
  ArrowUpward,
  ArrowDownward,
  CheckCircle,
} from "@mui/icons-material";

export default function InfoBox({ weatherInfo, unit, onToggleUnit }) {
  if (!weatherInfo) return null;

  // Weather Condition Theme & Dynamic Backdrops
  const getWeatherTheme = () => {
    const main = (weatherInfo.mainCondition || "").toLowerCase();
    const temp = weatherInfo.temperature;

    if (main.includes("rain") || main.includes("drizzle")) {
      return {
        bgGradient: "linear-gradient(135deg, rgba(30, 58, 138, 0.75) 0%, rgba(15, 23, 42, 0.95) 100%)",
        borderColor: "rgba(96, 165, 250, 0.4)",
        icon: <Thunderstorm sx={{ fontSize: 44, color: "#93c5fd" }} />,
        bannerImg: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=1000&auto=format&fit=crop&q=80",
        ambientGlow: "rgba(59, 130, 246, 0.35)",
      };
    } else if (main.includes("snow") || temp <= 0) {
      return {
        bgGradient: "linear-gradient(135deg, rgba(14, 116, 144, 0.75) 0%, rgba(15, 23, 42, 0.95) 100%)",
        borderColor: "rgba(186, 230, 253, 0.45)",
        icon: <AcUnit sx={{ fontSize: 44, color: "#e0f2fe" }} />,
        bannerImg: "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=1000&auto=format&fit=crop&q=80",
        ambientGlow: "rgba(186, 230, 253, 0.3)",
      };
    } else if (main.includes("cloud")) {
      return {
        bgGradient: "linear-gradient(135deg, rgba(51, 65, 85, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)",
        borderColor: "rgba(203, 213, 225, 0.35)",
        icon: <Cloud sx={{ fontSize: 44, color: "#e2e8f0" }} />,
        bannerImg: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1000&auto=format&fit=crop&q=80",
        ambientGlow: "rgba(203, 213, 225, 0.2)",
      };
    } else if (temp >= 28) {
      return {
        bgGradient: "linear-gradient(135deg, rgba(194, 65, 12, 0.7) 0%, rgba(15, 23, 42, 0.95) 100%)",
        borderColor: "rgba(251, 146, 60, 0.45)",
        icon: <WbSunny sx={{ fontSize: 44, color: "#fdba74" }} />,
        bannerImg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=80",
        ambientGlow: "rgba(249, 115, 22, 0.35)",
      };
    } else {
      return {
        bgGradient: "linear-gradient(135deg, rgba(3, 105, 161, 0.7) 0%, rgba(15, 23, 42, 0.95) 100%)",
        borderColor: "rgba(56, 189, 248, 0.4)",
        icon: <WbSunny sx={{ fontSize: 44, color: "#7dd3fc" }} />,
        bannerImg: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=1000&auto=format&fit=crop&q=80",
        ambientGlow: "rgba(56, 189, 248, 0.3)",
      };
    }
  };

  const theme = getWeatherTheme();

  // Convert temp based on unit
  const formatTemp = (celsius) => {
    if (celsius === undefined || celsius === null) return "--";
    if (unit === "F") {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return Math.round(celsius);
  };

  const unitSymbol = unit === "F" ? "°F" : "°C";

  // Qualitative evaluations for weather stats
  const getHumidityStatus = (val) => {
    if (val < 30) return { label: "Low", color: "#facc15" };
    if (val <= 60) return { label: "Comfortable", color: "#4ade80" };
    if (val <= 75) return { label: "Humid", color: "#38bdf8" };
    return { label: "High Moisture", color: "#60a5fa" };
  };

  const getWindStatus = (speed) => {
    if (speed < 1.5) return { label: "Calm", color: "#94a3b8" };
    if (speed < 5.5) return { label: "Gentle Breeze", color: "#4ade80" };
    if (speed < 10.7) return { label: "Moderate Breeze", color: "#38bdf8" };
    return { label: "High Wind", color: "#f87171" };
  };

  const getPressureStatus = (p) => {
    if (p > 1015) return { label: "High Pressure", color: "#38bdf8" };
    if (p >= 1005) return { label: "Normal", color: "#4ade80" };
    return { label: "Low Pressure", color: "#fb923c" };
  };

  const getVisibilityStatus = (v) => {
    const km = v ? v / 1000 : 10;
    if (km >= 10) return { label: "Clear Vision", color: "#4ade80" };
    if (km >= 5) return { label: "Moderate", color: "#facc15" };
    return { label: "Hazy / Fog", color: "#f87171" };
  };

  const humStatus = getHumidityStatus(weatherInfo.humidity);
  const windStatus = getWindStatus(weatherInfo.windSpeed);
  const pressStatus = getPressureStatus(weatherInfo.pressure || 1013);
  const visStatus = getVisibilityStatus(weatherInfo.visibility);

  return (
    <Box className="weather-card-wrapper">
      <Card
        className="glass-card"
        sx={{
          background: theme.bgGradient,
          borderColor: theme.borderColor,
          boxShadow: `0 24px 45px -12px ${theme.ambientGlow}, 0 0 0 1px ${theme.borderColor}`,
        }}
      >
        {/* Top Hero Banner */}
        <Box
          sx={{
            position: "relative",
            height: "185px",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={theme.bannerImg}
            alt={weatherInfo.description}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.65) contrast(1.15)",
              transition: "transform 0.5s ease",
              "&:hover": { transform: "scale(1.04)" },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(15, 23, 42, 0.98) 0%, rgba(15, 23, 42, 0.5) 50%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          {/* Location & Status in Header */}
          <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 20,
              right: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Chip
              label={weatherInfo.country ? `${weatherInfo.city}, ${weatherInfo.country}` : weatherInfo.city}
              sx={{
                background: "rgba(15, 23, 42, 0.85)",
                backdropFilter: "blur(12px)",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.92rem",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
              }}
            />
            <Chip
              icon={<CheckCircle sx={{ fontSize: "16px !important", color: "#4ade80 !important" }} />}
              label="Live Data"
              size="small"
              sx={{
                background: "rgba(15, 23, 42, 0.85)",
                color: "#4ade80",
                border: "1px solid rgba(74, 222, 128, 0.4)",
                fontSize: "0.8rem",
                fontWeight: 700,
                boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
              }}
            />
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: 14,
              left: 20,
              right: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  fontFamily: "var(--font-heading)",
                  color: "#ffffff",
                  letterSpacing: "-0.5px",
                  lineHeight: 1.1,
                  fontSize: { xs: "1.85rem", sm: "2.3rem" },
                  textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                }}
              >
                {weatherInfo.city}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#e2e8f0",
                  textTransform: "capitalize",
                  mt: 0.5,
                  fontWeight: 600,
                  fontSize: "1rem",
                  textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                }}
              >
                {weatherInfo.description}
              </Typography>
            </Box>

            <Tooltip title="Toggle Celsius / Fahrenheit">
              <IconButton
                onClick={onToggleUnit}
                sx={{
                  background: "rgba(15, 23, 42, 0.85)",
                  backdropFilter: "blur(10px)",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  width: 44,
                  height: 44,
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                  "&:hover": {
                    background: "rgba(56, 189, 248, 0.3)",
                    borderColor: "#38bdf8",
                  },
                }}
              >
                {unitSymbol}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
          {/* Main Temperature & Feels Like */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
              <Typography
                sx={{
                  fontSize: { xs: "3.8rem", sm: "4.8rem" },
                  fontWeight: 800,
                  fontFamily: "var(--font-heading)",
                  lineHeight: 1,
                  color: "#ffffff",
                  letterSpacing: "-2px",
                  textShadow: "0 4px 16px rgba(0,0,0,0.5)",
                }}
              >
                {formatTemp(weatherInfo.temperature)}
              </Typography>
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#38bdf8",
                }}
              >
                {unitSymbol}
              </Typography>
            </Box>

            <Box sx={{ textAlign: "right" }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 0.5, mb: 0.8 }}>
                {theme.icon}
              </Box>
              <Typography variant="body1" sx={{ color: "#e2e8f0", fontWeight: 600, fontSize: "0.95rem" }}>
                Feels like <strong style={{ color: "#ffffff", fontSize: "1.05rem" }}>{formatTemp(weatherInfo.feelsLike ?? weatherInfo.temperature)}{unitSymbol}</strong>
              </Typography>
            </Box>
          </Box>

          {/* Min & Max Pill Badges */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 3.5,
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 1.5,
                borderRadius: "14px",
                background: "rgba(239, 68, 68, 0.18)",
                border: "1px solid rgba(248, 113, 113, 0.4)",
              }}
            >
              <ArrowUpward sx={{ fontSize: 22, color: "#f87171" }} />
              <Box>
                <Typography variant="caption" sx={{ color: "#fecaca", display: "block", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>
                  Daily High
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 800, color: "#ffffff", fontSize: "1.1rem" }}>
                  {formatTemp(weatherInfo.tempMax)}{unitSymbol}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 1.5,
                borderRadius: "14px",
                background: "rgba(56, 189, 248, 0.18)",
                border: "1px solid rgba(56, 189, 248, 0.4)",
              }}
            >
              <ArrowDownward sx={{ fontSize: 22, color: "#38bdf8" }} />
              <Box>
                <Typography variant="caption" sx={{ color: "#bae6fd", display: "block", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>
                  Daily Low
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 800, color: "#ffffff", fontSize: "1.1rem" }}>
                  {formatTemp(weatherInfo.tempMin)}{unitSymbol}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Section Heading */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#e2e8f0",
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              Weather Conditions & Metrics
            </Typography>
          </Box>

          {/* Detailed Metric Matrix - Structured 2x2 Clean Dashboard Cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              gap: 2,
            }}
          >
            {/* Humidity Card */}
            <Box className="metric-box">
              <Box className="metric-icon-wrap" sx={{ background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8" }}>
                <WaterDrop sx={{ fontSize: 24 }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography className="metric-title">Humidity</Typography>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.8, my: 0.3 }}>
                  <Typography className="metric-number">{weatherInfo.humidity}</Typography>
                  <Typography className="metric-unit">%</Typography>
                </Box>
                <Typography className="metric-status" sx={{ color: humStatus.color }}>
                  ● {humStatus.label}
                </Typography>
              </Box>
            </Box>

            {/* Wind Speed Card */}
            <Box className="metric-box">
              <Box className="metric-icon-wrap" sx={{ background: "rgba(192, 132, 252, 0.15)", color: "#c084fc" }}>
                <Air sx={{ fontSize: 24 }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography className="metric-title">Wind Speed</Typography>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.8, my: 0.3 }}>
                  <Typography className="metric-number">{weatherInfo.windSpeed}</Typography>
                  <Typography className="metric-unit">m/s</Typography>
                </Box>
                <Typography className="metric-status" sx={{ color: windStatus.color }}>
                  ● {windStatus.label}
                </Typography>
              </Box>
            </Box>

            {/* Pressure Card */}
            <Box className="metric-box">
              <Box className="metric-icon-wrap" sx={{ background: "rgba(251, 146, 60, 0.15)", color: "#fb923c" }}>
                <Compress sx={{ fontSize: 24 }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography className="metric-title">Air Pressure</Typography>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.8, my: 0.3 }}>
                  <Typography className="metric-number">{weatherInfo.pressure || 1013}</Typography>
                  <Typography className="metric-unit">hPa</Typography>
                </Box>
                <Typography className="metric-status" sx={{ color: pressStatus.color }}>
                  ● {pressStatus.label}
                </Typography>
              </Box>
            </Box>

            {/* Visibility Card */}
            <Box className="metric-box">
              <Box className="metric-icon-wrap" sx={{ background: "rgba(74, 222, 128, 0.15)", color: "#4ade80" }}>
                <Visibility sx={{ fontSize: 24 }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography className="metric-title">Visibility</Typography>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.8, my: 0.3 }}>
                  <Typography className="metric-number">
                    {weatherInfo.visibility ? (weatherInfo.visibility / 1000).toFixed(1) : "10.0"}
                  </Typography>
                  <Typography className="metric-unit">km</Typography>
                </Box>
                <Typography className="metric-status" sx={{ color: visStatus.color }}>
                  ● {visStatus.label}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}