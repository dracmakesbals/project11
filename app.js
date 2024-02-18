const apiKey = "5ccbf45e00cf2bab8c1d4ea3153c402b";
const weatherData = document.getElementById("weather_details");
const locationInput = document.getElementById("formInput");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const locationValue = locationInput.value;
  getWeatherInfo(locationValue);
  console.log(locationValue);
});

async function getWeatherInfo(locationValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${locationValue}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new error("network responce was gay");
    }

    const data =
      await response.json(); /* PARSING TO JSON SINCE ORIGANLLY WASNT USABLE */
    console.log(data);
    const temperature = `${Math.round(data.main.temp)}°C`;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const feelLike = `feels like ${Math.round(data.main.feels_like)}`;
    const humidity = `humidity is ${data.main.humidity}`;
    const windSpeed = `wind speed at ${data.wind.speed}`;

    weatherData.querySelector(".temperature").textContent = temperature;
    weatherData.querySelector(".description").textContent = description;
    weatherData.querySelector(
      ".icon"
    ).innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" />`;

    weatherData.querySelector(".details").innerHTML = `<div>${feelLike}</div>
    <div>${humidity}</div>
    <div>${windSpeed} m/s</div>`;
  } catch (error) {}
}

/* WE USE TRYA ND CATCH FOR GETTIGN API CALLS SINCE IT COLLECTS INFO ONLY ID THE DATA INPUTED IS CORRECT */
