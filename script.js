const apiKey = "185c993ad25dec1f17baa8336cc3170b";
// The API URL is incorrect - it uses placeholder values like {lat}, {lon}, {API}
// It's also using OpenWeather's OneCall API (v3.0) but trying to query by city name
// Let's fix it to use the Current Weather API which allows city name queries
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

// Wait for the DOM to be fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Now we can safely add the event listener
  document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value;
    if (city) {
      fetchWeather(city);
    }
  });

  // Add event listener for Enter key
  document
    .getElementById("city-input")
    .addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        const city = document.getElementById("city-input").value;
        if (city) {
          fetchWeather(city);
        }
      }
    });
});

async function fetchWeather(city) {
  try {
    // Add units=metric to get temperature in Celsius
    const response = await fetch(
      `${apiUrl}${city}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("City not found or API error");
    }

    const data = await response.json();

    document.getElementById("city-name").innerText = data.name;
    document.getElementById("temperature").innerText = `${Math.round(
      data.main.temp
    )}°C`;
    document.getElementById("weather-description").innerText =
      data.weather[0].description;
    document.getElementById(
      "weather-icon"
    ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  } catch (error) {
    alert(error.message);
  }
}
