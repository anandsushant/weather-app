import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [location, setlocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = process.env.apiKey;

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError('');
    } catch (error) {
      setError('location not found');
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <div className="container1">

        <div className='search'>
          <input 
            type='text'
            value={location}
            placeholder="Enter Location"
            onChange={(e) => setlocation(e.target.value)}
          />
          <button id='button' onClick={getWeather}> Search </button>
        </div>

        {error && <p>{error}</p>}
        {weather && (
          <div className='container2'>
            <div className='top'>
              <div className='location'><p>{weather.name}, {weather.sys.country}</p></div>
              <div className='temperature'><h1>{weather.main.temp}°C</h1></div>
              <div className='description'><p>{weather.weather[0].description}</p></div>
            </div>

            <div className='bottom'>
              <div className='feels_like'>
                <p>{weather.main.feels_like}°C</p>
                <p>Feels Like</p>
              </div>
              <div className='speed'>
                <p>{weather.wind.speed} m/s</p>
                <p>Wind Speed</p>
              </div>
              <div className='humidity'>
                <p>{weather.main.humidity} %</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
