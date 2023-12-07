import React from "react";
// non riesco a tipizzare ste prop
export default function Card({
  cityName,
  day,
  temperature,
  maxTemperature,
  minTemperature,
}:object) {
  return (
    <div className="card">
      <h1>{cityName}</h1>
      <h4>{day}</h4>
      <h5>Temperatura: {temperature}</h5>
      <h6>Massima: {maxTemperature}</h6>
      <h6>Minima: {minTemperature}</h6>
    </div>
  );
}
