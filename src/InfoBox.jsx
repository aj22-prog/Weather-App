import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function InfoBox({ weatherInfo }) {
    const INIT_URL = "  https://images.unsplash.com/photo-1722858343990-1604f540c15d?w=900&auto=format&fit=crop&q=60";
    const INIT_HOT_URL = "https://images.unsplash.com/uploads/14121010130570e22bcdf/e1730efe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D";
    const INIT_COLD_URL = "https://images.unsplash.com/photo-1564314968303-86c5df2b9a4c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbGQlMjB3ZWF0aGVyfGVufDB8fDB8fHww";
    const INIT_RAIN_URL = "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFpbnklMjBkYXl8ZW58MHx8MHx8fDA%3D";
  return (
    <div className="infoBox">
    

      <Card className="weatherCard">
        <CardMedia
          component="img"
          image={weatherInfo.humidity >65 ? INIT_RAIN_URL : weatherInfo.temperature > 30 ? INIT_HOT_URL : weatherInfo.temperature < 10 ? INIT_COLD_URL : INIT_URL}
          alt="Weather"
        />

        <CardContent className="weatherDetails">
          <Typography className="cityName" variant="h5">
            {weatherInfo.city}
          </Typography>

          <Typography className="temperature">
            Temperature: {weatherInfo.temperature}°C
          </Typography>

          <Typography>
            Min Temperature: {weatherInfo.tempMin}°C
          </Typography>

          <Typography>
            Max Temperature: {weatherInfo.tempMax}°C
          </Typography>

          <Typography>
            Description: {weatherInfo.description}
          </Typography>

          <Typography>
            Humidity: {weatherInfo.humidity}%
          </Typography>

          <Typography>
            Wind Speed: {weatherInfo.windSpeed} m/s
          </Typography>
        </CardContent>

        <CardActions>
          <Button>Share</Button>
          <Button>Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}