const apiKey = "3490dc98e75466cb5e8f2d5665981666";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

        document.getElementById("search-btn").addEventListener("click", () => {
            const city = document.getElementById("city-input").value;
            if (city) {
                fetchWeather(city);
            }
        });

        async function fetchWeather(city) {
            try {
                const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
                if (!response.ok) {
                    throw new Error("City not found");
                }
                const data = await response.json();
                document.getElementById("city-name").innerText = data.name;
                document.getElementById("temperature").innerText = `${data.main.temp}°C`;
                document.getElementById("weather-description").innerText = data.weather[0].description;
                document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            } catch (error) {
                alert(error.message);
            }
        }