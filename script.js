

const API_KEY = '880676cbc61a129072ece9082bf6f92a';



async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`City not found. Error: ${response.status}`);
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    document.getElementById('weatherResult').innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
}



function displayWeather(data) {
  const { name, main, weather } = data;
  document.getElementById('weatherResult').innerHTML = `
    <h2>Weather in ${name}</h2>
    <p>Temperature: ${main.temp}°C</p>
    <p>Humidity: ${main.humidity}%</p>
    <p>Condition: ${weather[0].description}</p>
  `;
}



document.getElementById('getWeatherBtn').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value;
  if (city) {
    getWeather(city);
  } else {
    alert('Please enter a city name!');
  }
});


// enter Button
document.addEventListener("DOMContentLoaded", ()=> {
  const cityInput = document.getElementById("cityInput");
  const getWeatherBtn = document.getElementById("getWeatherBtn");

  // Trigger the button click when Enter is pressed
  cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      getWeatherBtn.click();
    }
  });

  // Add the click event for fetching weather
  getWeatherBtn.addEventListener("click", ()=> {
    const city = cityInput.value.trim();
    if (city) {
      getWeather(city);
    }
  });

  // Example function for fetching weather
  function getWeather(city) {
    // Replace this with your weather-fetching logic
    document.getElementById("weatherResult").textContent =
      "Fetching weather for " + city + "...";
  }
});



const importantCountries = ["Tunisia","USA", "Germany", "China", "Japan", 
   "United Kingdom", "Brazil", "Canada", 
  "Russia","Australia", 
  "Italy", "Spain", "Mexico", "South Africa", 
  "Saudi Arabia", "Turkey", "London", "Moscow"]; // Add more if needed

async function getCountryWeather(country) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`${country}: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      name: data.name,
      temp: data.main.temp,
      condition: data.weather[0].description,
    };
  } catch (error) {
    return { name: country, error: error.message };
  }
}

async function displayImportantCountriesWeather() {
  const listElement = document.getElementById("countryWeatherList");
  listElement.innerHTML = "Loading weather data...";
  const weatherData = await Promise.all(
    importantCountries.map((country) => getCountryWeather(country))
  );

  // Update the sidebar with the weather data
  listElement.innerHTML = weatherData
    .map((data) =>
      data.error
        ? `<li>${data.name}: ${data.error}</li>`
        : `<li>${data.name}: ${data.temp}°C, ${data.condition}</li>`
    )
    .join("");
}

// Call this function when the page loads
displayImportantCountriesWeather();



