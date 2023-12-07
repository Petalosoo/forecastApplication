import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Forecasts from "./components/Forecasts";
import Weather from "./components/Weather";
import TemperatureSelector from "./components/Temperature";
import "./App.css";

export default function App() {
  const apiKey = "8a21207a65136e3d14b0d44a4e6ef778";
  const defaultLatitude = 41.902782;
  const defaultLongitude = 12.496366;

  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [selectedTemperatureUnit, setSelectedTemperatureUnit] = useState("C");

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

  async function getWeatherData(latitude :number, longitude  :number) {
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

  async function getForecastData(latitude :number, longitude :number) {
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

  function handleTemperatureChange(unit  :string) {
    console.log(unit);
    setSelectedTemperatureUnit(unit);
  }

  async function handleFormSubmit(location :string) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Error in API request");
      }

      const result = await response.json();
      setWeatherData(result);
      getForecastData(result.coord.lat, result.coord.lon);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  return (
    <>
      <h1>Forecast</h1>
      <Form onFormSubmit={handleFormSubmit}></Form>
      <TemperatureSelector onTemperatureChange={handleTemperatureChange} />
      <Weather
        weatherData={weatherData}
        selectedTemperatureUnit={selectedTemperatureUnit}
      ></Weather>
      <Forecasts
        forecastData={forecastData}
        selectedTemperatureUnit={selectedTemperatureUnit}
      ></Forecasts>
    </>
  );
}
