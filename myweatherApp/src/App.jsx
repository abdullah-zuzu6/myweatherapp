import { useState } from 'react'
import './App.css'

function App() {
  // State to store the city input by user
  let [city, setCity] = useState('');
  // State to store fetched weather details
  let [weatherDetails, setWeatherDetails] = useState(null);
  // State to store any error messages
  let [error, setError] = useState(null);

  // Function to fetch weather data from OpenWeatherMap API
  let getData = (event) => {
    event.preventDefault(); // Prevents page from reloading on form submission

    // Reset error message before making a new request
    setError(null);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
      .then((res) => res.json()) // Convert response to JSON
      .then((finalRes) => {
        console.log(finalRes); // Check the API response in the console
        if (finalRes.cod === '404') {
          // If city name is incorrect, display an error message
          setWeatherDetails(null);
          setError('City not found. Please check the spelling and try again.');
        } else if (finalRes.cod !== 200) {
          // Handle other error codes
          setWeatherDetails(null);
          setError('Unable to retrieve weather data. Please try again later.');
        } else {
          // Set weather details if response is successful
          setWeatherDetails(finalRes);
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error); // Error handling for failed request
        setError('An error occurred while fetching data. Please check your connection and try again.');
      });

    // Reset city input field after submitting
    setCity('');
  };

  return (
    <>
      <h1>Simple Weather App</h1>

      <div id="mainbox">
        {/* Form to accept city name as input */}
        <form onSubmit={getData}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City Name"
          />
          <button>Click</button>
        </form>
      </div>

      {/* Display error message if there is one */}
      {error && <p style={{ color: 'White' }}>{error}</p>}

      {/* Conditional rendering: displays weather details if they are available */}
      {weatherDetails ? (
        <>
          <div id="container">
            
            <div className="Box">
              {/* Displaying weather details */}
              <h3 id="Text">
                {weatherDetails.name} <span>{weatherDetails.sys.country}</span>
              </h3>
              <h2 id="info">{weatherDetails.main.temp}°C</h2>
              <h2 id="info">{weatherDetails.main.feels_like}°C</h2>
              <img
                id="info1"
                src={`http://openweathermap.org/img/w/${weatherDetails.weather[0].icon}.png`}
                alt="Weather icon"
              />
              <p id="text5">{weatherDetails.weather[0].description}</p>
              <h3 id="text6">{weatherDetails.wind.speed} m/s</h3>
              <h3 id="text8">{weatherDetails.main.humidity}%</h3>
            </div>
          </div>
        </>
      ) : (
        // Display this section when no weather data is available
        <div>
          <div id="container">
            <div id="fbox">
            <h2 id="text1">Here You Can Find Following Data</h2>
              <h2 id="text1">1.City Name</h2>
              <h3 id="text">2.Temperature</h3>
              <h3 id="text2">3.Feels Like</h3>
              <h3 id="text3">4.Icon</h3>
              <h3 id="text4">5.Description</h3>
              <h3 id="text7">6.Wind Speed</h3>
              <h3 id="text7">7.Humidity</h3>
            </div>
            <div className="Box"></div>
          </div>
        </div>
      )}
    </>
  );
}


export default App
