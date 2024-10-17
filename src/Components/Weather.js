import React, { useEffect, useState } from 'react';
import axios from "axios";
import { IoLocationSharp } from "react-icons/io5";
import { FaStreetView } from "react-icons/fa";

const Weather = () => {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("Mumbai");
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=4259cade77786b7398e1d8eb8191d0fd`);
        setWeatherData(result.data);
        //console.log(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [search]);

  return (
    <div className="box">
      <div className="inputData">
        <input
          placeholder="Enter Location"
          type="search"
          className="inputField"
          onChange={(e) => { setCity(e.target.value) }}
          //on pressing enter 
          onKeyPress={(e) => { if (e.key === "Enter") setSearch(city) }}
        />
        <IoLocationSharp className='inputIcon' />
      </div>
      {(weatherData) &&
        <div className="information">
          <h2 className="location">
            <FaStreetView className='icon' />
            {weatherData.name}
          </h2>
          {/*from kelvin to celsius */}
          <h1 className="temp">{(weatherData.main.temp - 273.15).toFixed(2)} °C</h1>
          <img className="weatherIcon" src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon" />
          <h3 className="temp_minMax">
            Min: {(weatherData.main.temp_min - 273.15).toFixed(2)} °C | Max: {(weatherData.main.temp_max - 273.15).toFixed(2)} °C
          </h3>
        </div>
      }
      
    </div>
  )
}

export default Weather;
