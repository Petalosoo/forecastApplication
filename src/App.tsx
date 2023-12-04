
import React ,{ useState, useEffect } from "react";
import FieldsetTemp from "./components/FieldsetTemp";
import Form from "./components/Form";
import Forecasts from "./components/Forecasts";
import Weather from "./components/Weather";

export default function App() {
  const apiKey = "8a21207a65136e3d14b0d44a4e6ef778";
  const defaultLatitude = 41.902782;
  const defaultLongitude = 12.496366;

  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    let latitude, longitude;

    navigator.geolocation.getCurrentPosition(
      async function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        await getWeatherData(latitude, longitude),
          getForecastData(latitude, longitude);
      },
      async function () {
        latitude = defaultLatitude;
        longitude = defaultLongitude;
        await getWeatherData(latitude, longitude),
          getForecastData(latitude, longitude);
      }
    );
  }, []);

  async function getWeatherData(latitude, longitude) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Errore nella richiesta API");
      }
      const result = await response.json();
      setWeatherData(result);
    } catch (error) {
      console.error("Errore nel recupero dei dati meteorologici:", error);
    }
  }

  async function getForecastData(latitude, longitude) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Errore nella richiesta API");
      }
      const forecastDataResponse = await response.json();

      setForecastData(forecastDataResponse);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Forecast</h1>
      <Form></Form>
      <FieldsetTemp></FieldsetTemp>
      <Weather weatherData={weatherData}></Weather>
      <Forecasts forecastData={forecastData}></Forecasts>
    </>
  );
}
