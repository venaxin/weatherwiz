import React, { useState } from "react";
import axios from "axios";
function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});

  //const dataUrl = "https://api.openweathermap.org/data/2.5/weather?lat=17.366&lon=78.476&appid=45c40bcf2a13be99db1db8739a23d433";
  //const locUrl = "http://api.openweathermap.org/geo/1.0/direct?q=Hyderabad&limit=5&appid=45c40bcf2a13be99db1db8739a23d433";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=45c40bcf2a13be99db1db8739a23d433`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };
  return (
    <div className="app">
      <div className="container">
        <div className="top">
          <div className="search">
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder="Enter Location"
            ></input>
          </div>
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}K</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className="">{data.main.feels_like}°C</p> : null}
            <p>feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
