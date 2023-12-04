import React from "react";
import Card from "./Card";

export default function Forecasts(props) {
  const forecastData = props.forecastData;

  if (!forecastData) {
    return <p>Caricamento delle previsioni meteorologiche...</p>;
  }

  const dailyForecasts = [];

  forecastData.list.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString("en-US", { weekday: "long" });

    if (day !== new Date().toLocaleDateString("en-US", { weekday: "long" })) {
      const existingForecast = dailyForecasts.find((item) => item.day === day);
//dovevo controllare in qualche modo non esistesse gia una qualsiasi previsione per quel giorno , mi sembr auna soluzione ben migliore di slice 
      if (!existingForecast) {
        dailyForecasts.push({
          day,
          temperature: forecast.main.temp,
          maxTemperature: forecast.main.temp_max,
          minTemperature: forecast.main.temp_min,
        });
      }
    }
  });

  return (
    <div className="cardContainer">
      {dailyForecasts.map((dayForecast) => (
        <Card
          key={dayForecast.day}
          cityName={props.cityName}
          day={dayForecast.day}
          temperature={dayForecast.temperature}
          maxTemperature={dayForecast.maxTemperature}
          minTemperature={dayForecast.minTemperature}
        />
      ))}
    </div>
  );
}
