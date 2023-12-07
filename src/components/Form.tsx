import React, { useState } from "react";
//che tipo mettere a sta funzione?
function Form({ onFormSubmit }) {
  const [location, setLocation] = useState("");

  const handleSubmit = (e :Event) => {
    e.preventDefault();
    onFormSubmit(location);
  };
//perchè mi da picche or su on submit?
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">GO!</button>
    </form>
  );
}

export default Form;
