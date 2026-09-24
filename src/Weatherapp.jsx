import React, { useState, useEffect } from "react";
import SearchBox from "./searchbox";
import {
  Container,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Public,
  AccessTime,
  Refresh,
  Thunderstorm,
  WbSunny,
  Air,
  Layers,
} from "@mui/icons-material";

export default function Weatherapp() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box className="app-viewport">
      {/* Dynamic Ambient Blur Glows */}
      <div className="ambient-blob blob-1"></div>
      <div className="ambient-blob blob-2"></div>
      <div className="ambient-blob blob-3"></div>

      {/* Top Navbar / Header Bar */}
      <Box
        sx={{
          width: "100%",
          py: 2,
          px: { xs: 2.5, md: 5 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(11, 15, 25, 0.65)",
          backdropFilter: "blur(20px)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)",
            }}
          >
            <Layers sx={{ fontSize: 22 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: "1.1rem",
                color: "#ffffff",
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.3px",
                lineHeight: 1.1,
              }}
            >
              ATMOSPHERE
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#38bdf8",
                fontWeight: 600,
                fontSize: "0.72rem",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              Live Weather Telemetry
            </Typography>
          </Box>
        </Box>

        {/* Real-time Clock & Status */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 0.8,
              px: 1.5,
              py: 0.6,
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <AccessTime sx={{ fontSize: 16, color: "#38bdf8" }} />
            <Typography
              variant="caption"
              sx={{ color: "#f8fafc", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.5px" }}
            >
              {currentTime || "Live UTC"}
            </Typography>
          </Box>

          <Chip
            icon={<Public sx={{ fontSize: "16px !important", color: "#38bdf8 !important" }} />}
            label="v2.5 Pro"
            size="small"
            sx={{
              background: "rgba(56, 189, 248, 0.12)",
              color: "#38bdf8",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              fontWeight: 700,
              fontSize: "0.78rem",
            }}
          />
        </Box>
      </Box>

      {/* Main Container Content */}
      <Container maxWidth="md" sx={{ py: { xs: 3.5, sm: 5 }, position: "relative", zIndex: 1 }}>
        {/* Header Hero Title */}
        <Box className="app-header">
          <Typography
            variant="h2"
            component="h1"
            className="header-title"
          >
            Global Weather <span className="gradient-text">Intelligence</span>
          </Typography>

          <Typography
            variant="body1"
            className="header-subtitle"
          >
            Hyper-accurate meteorological telemetry, multi-city forecasts, and environmental metrics.
          </Typography>
        </Box>

        {/* Search & Dashboard Content */}
        <SearchBox />

        {/* Footer */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            textAlign: "center",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: 500 }}>
            © {new Date().getFullYear()} Atmosphere Inc. Powered by OpenWeather API & Material UI
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              label="Real-time Sync"
              size="small"
              sx={{
                background: "rgba(16, 185, 129, 0.1)",
                color: "#34d399",
                border: "1px solid rgba(52, 211, 153, 0.25)",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}