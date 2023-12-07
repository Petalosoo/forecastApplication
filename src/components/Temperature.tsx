import React, { useState } from "react";

function TemperatureSelector({ onTemperatureChange }) {
  const [temperatureUnit, setTemperatureUnit] = useState("C");

  function handleTemperatureChange(e) {
    const selectedUnit = e.target.value;
    setTemperatureUnit(selectedUnit);
    onTemperatureChange(selectedUnit);
  }

  return (
    <div>
      <h3>Seleziona l'unità di temperatura:</h3>  
      <label>
        <input
          type="radio"
          value="C"
          checked={temperatureUnit === "C"}
          onChange={handleTemperatureChange}
        />
        Celsius
      </label>
      <label>
        <input
          type="radio"
          value="F"
          checked={temperatureUnit === "F"}
          onChange={handleTemperatureChange}
        />
        Fahrenheit
      </label>
    </div>
  );
}

export default TemperatureSelector;
