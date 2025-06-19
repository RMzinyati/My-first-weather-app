function changeTheme() {
  document.querySelector(".container").classList.toggle("dark");
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getEmoji(condition) {
  condition = condition.toLowerCase();
  if (condition.includes("sun")) return "☀️";
  if (condition.includes("cloud")) return "⛅";
  if (condition.includes("rain")) return "🌧️";
  if (condition.includes("snow")) return "❄️";
  if (condition.includes("storm")) return "⛈️";
  if (condition.includes("fog")) return "🌫️";
  return "🌈";
}

function displayForecast(forecast) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.daily.slice(1, 4).forEach(function (day) {
    forecastHTML += `
      <div class="inner-container3">
        <h3>${formatDay(day.time)}</h3>
        <p>
          ${getEmoji(day.condition.description)} ${
      day.condition.description
    }<br/>
          High: ${Math.round(day.temperature.maximum)}°C<br/>
          Low: ${Math.round(day.temperature.minimum)}°C
        </p>
      </div>
    `;
  });

  forecastElement.innerHTML = forecastHTML;
}

function displayWeather(response) {
  let current = response.data.daily[0];
  let cityElement = document.querySelector("#current-city");
  let tempContainer = document.querySelector("#inner-container1");

  cityElement.innerHTML = response.data.city;
  tempContainer.innerHTML = `
    <h2>${Math.round(current.temperature.day)}°C ${getEmoji(
    current.condition.description
  )} ${current.condition.description}</h2>
    <p class="Audi">High: ${Math.round(
      current.temperature.maximum
    )}°C <br />Low: ${Math.round(current.temperature.minimum)}°C</p>
  `;

  displayForecast(response.data);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;
  let apiKey = "943a0afd4b4od83cdeb99b3e8945e73t";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();
  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[day]} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
currentDateElement.innerHTML = formatDate(new Date());
