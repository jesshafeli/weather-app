// Display Location + Temp in First Search Card
function showFirst(response) {
  let temp = `${Math.round(response.data.main.temp)}°C`;
  let firstCity = document.querySelector("#firstLocation");
  firstCity.innerHTML = response.data.name;
  let firstTemp = document.querySelector("#firsttemp");
  firstTemp.innerHTML = temp;
}

// Display Location (5 Day Forcast)
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

// Display C/F conversion in 5 Day Forecast
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

// Display Date/Time in Prev Seach Card
function previousDate(prevday) {
  let hours = prevday.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = prevday.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = prevday.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}
// Display Date/Time in Prev Seach Card
let dateElement = document.querySelector("#prevday");
let prevTime = new Date();
dateElement.innerHTML = previousDate(prevTime);

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
  let message = `You are currently in ${city} and it is ${temp}°C outside.`;
  let buttonDisplay = document.querySelector("#currentLocation");
  buttonDisplay.innerHTML = message;
}
function askLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
let currentButton = document.querySelector(".current-button");
currentButton.addEventListener("click", askLocation, showCurrent);
