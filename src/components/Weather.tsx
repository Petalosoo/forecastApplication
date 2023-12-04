import React from "react";

export default function Weather(props) {
  const weatherData = props.weatherData;

  if (!weatherData) {
    return <p>Caricamento dei dati meteorologici...</p>;
  }

  const cityName = weatherData.name;
  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });
  const currentTemperature = weatherData.main.temp;
  const maxTemperature = weatherData.main.temp_max;
  const minTemperature = weatherData.main.temp_min;

  return (
    <>
      <h1>{cityName}</h1>
      <h4>{currentDay}</h4>
      <h5>{currentTemperature}</h5>
      <h6>{maxTemperature}</h6>
      <h6>{minTemperature}</h6>
    </>
  );
}
