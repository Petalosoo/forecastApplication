import React from 'react'

function FieldsetTemp() {
  return (
    <fieldset>
      <legend>Select your preference and reload the reserch:</legend>
      <div>
        <input type="radio" id="C" name="temp" value="C" />
        <label htmlFor="C">Celsius</label>
      </div>
      <div>
        <input type="radio" id="F" name="temp" value="F" />
        <label htmlFor="F">Fahrenheit</label>
      </div>
    </fieldset>
  );
}

export default FieldsetTemp