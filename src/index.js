let form = document.querySelector("form");
form.addEventListener("submit", changeEvent);

let buttonClicked = document.querySelector("button");
buttonClicked.addEventListener("click", changeEvent);

function changeEvent(event) {
  event.preventDefault();
  changeCity();
}
function changeCity() {
  let searchCity = document.querySelector("#search-bar");
  let cityName = document.querySelector("#city-name");
  let city = searchCity.value;
  cityName.innerHTML = searchCity.value;
  let apiKey = `597c40c39084687093b091cd48b366f8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(displayNewCity);
}
function displayNewCity(response) {
  console.log(response);
  let newTemp = document.querySelector(`#temp`);
  newTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let description = document.querySelector(`#description`);
  description.innerHTML = `Description: ${response.data.weather[0].description}`;
  let wind = document.querySelector(`#wind`);
  wind.innerHTML = `Wind speed: ${Math.round(response.data.wind.speed)} Km/h`;
}
let now = new Date();
let date = document.querySelector(`#date`);

let weekDay = now.getDay();
let weekDays = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let week = weekDays[now.getDay()];
date.innerHTML = `${week} ${hourFormat()}`;
function hourFormat() {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}
let currentButton = document.querySelector(`#current-button`);
currentButton.addEventListener(`click`, currentResponse);

function currentResponse(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentTemp);
}
function currentTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = `597c40c39084687093b091cd48b366f8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showCurrent);
}
function showCurrent(response) {
  console.log(response);
  let displayTemp = document.querySelector(`#temp`);
  displayTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  let displayCity = document.querySelector(`#city-name`);
  displayCity.innerHTML = `${response.data.name}`;
  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let description = document.querySelector(`#description`);
  description.innerHTML = `Description: ${response.data.weather[0].description}`;
  let wind = document.querySelector(`#wind`);
  wind.innerHTML = `Wind speed: ${Math.round(response.data.wind.speed)} Km/h`;
}
