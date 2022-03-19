// Display Date/Time in First Card & when clicking Current Location Button
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
// Display Date/Time in Current Location Result Box
let dateElement = document.querySelector("#currentday");
let currentTime = new Date();
dateElement.innerHTML = currentDate(currentTime);

// Display Weather details in First Search Card
function showFirst(response) {
  let firstCity = document.querySelector("#firstLocation");
  let temp = `${Math.round(response.data.main.temp)}`;
  let firstTemp = document.querySelector("#firsttemp");
  let description = document.querySelector("#descripton");
  let humidity = document.querySelector("#humid");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");
  firstCity.innerHTML = response.data.name;
  firstTemp.innerHTML = temp;
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", firstSearch);

// Display C/F conversion in First Search Card & 5 Day Forecast
function convertToFahr(event) {
  event.preventDefault();
  var fahrElement = document.querySelector("#temp");
  fahrElement.innerHTML = "☀️ 77";
}
function convertToCels(event) {
  event.preventDefault();
  var celsElement = document.querySelector("#temp");
  celsElement.innerHTML = "☀️ 25";
}

let fahrLink = document.querySelector("#fahr");
fahrLink.addEventListener("click", convertToFahr);

let celsLink = document.querySelector("#cels");
celsLink.addEventListener("click", convertToCels);

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
