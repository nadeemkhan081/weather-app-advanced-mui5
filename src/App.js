import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import { useState } from "react";

const api = {
  key: "db539cd1ca0d38601c2b60ce72447c19",
  base: "http://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const handleSearch = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <CloudIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Weather-App V2
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "50px",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ ml: 2 }}>
          Search
        </Button>
      </Box>

      {typeof weather.main !== "undefined" ? (
        <Card sx={{ marginTop: "50px" }}>
          <CardContent>
            <Typography variant="h4" align="center">
              {weather.name}
            </Typography>

            <Grid container spacing={2} alignItems="center" mt="50px">
              <Grid item xs={12} md={4}>
                <Typography variant="h5" component="div">
                  Temperature
                </Typography>
                <Typography variant="h6" component="div" color="textSecondary">
                  {weather.main.temp} °C
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="h5" component="div">
                  Feels Like
                </Typography>
                <Typography variant="h6" component="div" color="textSecondary">
                  {weather.main.feels_like} °C
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="h5" component="div">
                  Description
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  color="textSecondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {weather.weather[0].description}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
    </Container>
  );
}

export default App;
