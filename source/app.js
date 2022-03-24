// Display C/F conversion in First Search Card
function convertToFahr(event) {
  event.preventDefault();
  let fahrElement = document.querySelector("#temp");
  let fahrcalc = (celsTemp * 9) / 5 + 32;
  fahrElement.innerHTML = Math.round(fahrcalc);
}
function convertToCels(event) {
  event.preventDefault();
  let celsElement = document.querySelector("#temp");
  celsElement.innerHTML = Math.round(celsTemp);
}

let celsTemp = null;

let fahrLink = document.querySelector("#fahr");
fahrLink.addEventListener("click", convertToFahr);

let celsLink = document.querySelector("#cels");
celsLink.addEventListener("click", convertToCels);

let form = document.querySelector("#search-form");
form.addEventListener("submit", firstSearch);

// Display Date/Time in First Card
function currentDate(currentday) {
  let hours = currentday.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentday.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[currentday.getMonth()];
  let day = days[currentday.getDay()];
  let date = currentday.getDate();
  return `${day}, ${date} ${month} ${hours}:${minutes}`;
}

// Display Weather details in First Search Card
function showFirst(response) {
  let firstCity = document.querySelector("#firstLocation");
  let temp = document.querySelectorAll("#temp", "#firsttemp");
  let description = document.querySelector("#descripton");
  let humidity = document.querySelector("#humid");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  celsTemp = response.data.main.temp;

  firstCity.innerHTML = response.data.name;
  temp.innerHTML = Math.round(celsLink);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

// Display Location in 5 Day Forcast Title
function firstSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let units = "metric";
  let city = searchInput.value;
  let apiKey = "8eeaa6b1b1ee1f6335457d45a5b3a39f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showFirst);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value} 5 Day Forecast...`;
}

// Display Forecast Information
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class ="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-12">
              <div class="forecast" id="forecast">
                <span class="forecast-date">${day}, January 18</span>
                <span class="forecast-icon">☀️</span>
                <span class="forcast-temp-max">25°</span> |
                <span class="forcast-temp-min">12°</span>
                <br />
              </div>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

//Current Location Button
function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "8eeaa6b1b1ee1f6335457d45a5b3a39f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrent);
}

function showCurrent(response) {
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let message = `You are currently in ${city}, today is ${currentTime} and it is ${temp}°C outside.`;
  let buttonDisplay = document.querySelector("#currentLocation");
  buttonDisplay.innerHTML = message;
}
function askLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector(".current-button");
currentButton.addEventListener("click", askLocation, showCurrent);

// Display Date/Time after Current Location Button click
let dateElement = document.querySelector("#currentday");
let currentTime = new Date();
dateElement.innerHTML = currentDate(currentTime);
