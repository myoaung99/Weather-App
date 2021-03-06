// const wDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const wMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// const iconValue = {
//     CLEARDAY: 'clear-day',
//     CLEARNIGHT: 'clear-night',
//     RAIN: 'rain',
//     SNOW: 'snow',
//     SLEET: 'sleet',
//     WIND: 'wind',
//     FOG: 'fog',
//     CLOUDY: 'cloudy',
//     PARTLY_CLOUDY_DAY: 'partly-cloudy-day',
//     PARTLY_CLOUDY_NIGHT: 'partly-cloudy-night'
// }

// // fetch the weather from the dark ski api
// function fetchWeatherReport(apiKey, latitude, longitude) {

//     //to avoid the cors issue you need to run through a proxy or make the call server side.
//     var DsProxyLink = `https://cors-anywhere.herokuapp.com/`;
//     var DsApiLink = `${DsProxyLink}https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?exclude=minutely,alerts,flags`;

//     fetch(DsApiLink)
//         .then(response => {
//             return response.json()
//         })
//         .then(data => {
//             // Work with JSON data here
//             var resultsHTML = "";
//             var tableHTML = "";
//             var summary = data.currently.summary;
//             var temperature = data.currently.temperature;
//             var icon = data.currently.icon;
//             var precipProbability = data.currently.precipProbability;
//             var humidity = data.currently.humidity;
//             var windSpeed = data.currently.windSpeed
//             var ts = new Date(data.currently.time * 1000);
//             var forecastDate = `${wDay[ts.getDay()]} ${wMonth[ts.getMonth()]} ${ts.getDate()}`

//             //Set values for the current conditions
//             // document.getElementById("location").innerHTML = name;
//             document.getElementById("dayTime").innerHTML = forecastDate;
//             document.getElementById("summary").innerHTML = summary;
//             document.getElementById("currentTemp").innerHTML = `${Math.round(temperature)}&deg`;
//             document.getElementById("weatherIcon").src = getICON(icon);
//             document.getElementById("perciptation").innerHTML = `Precipitation ${precipProbability*100}%`;
//             document.getElementById("humidty").innerHTML = `Humidity ${Math.round(humidity*100)}%`;
//             document.getElementById("wind").innerHTML = `Winds ${Math.round(windSpeed)} mph`;

//             //render the forcasts tabs
//             document.getElementById("dailyForecast").innerHTML = renderWeeklyForecast(data.daily);
//             document.getElementById("weeklyForecast").innerHTML = renderDailyForecast(data.hourly);
//         })
//         .catch(err => {
//             // Do something for an error here
//             throw (`Sorry, An Error occured.  ${err}`);
//         })
// }

// function fetchLocation(apiKey, latitude, longitude) {

//     //you don't need a proxy but you need secure your key in the google developer console.
//     var googleApiLink = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

//     fetch(googleApiLink)
//         .then(response => {
//             return response.json()
//         })
//         .then(data => {
//             // Work with JSON data here

//             //Set values for the location we picked the 4 object in the results becuase show the approximate address
//             document.getElementById("location").innerHTML = data.results[4].formatted_address;
//         })
//         .catch(err => {
//             // Do something for an error here
//             throw (`Sorry, An Error occured.  ${err}`);
//         })
// }

// //render the daily forecast
// function renderDailyForecast(fcData) {

//     let resultsHTML = "<tr><th>Time</th><th>Conditions</th><th>Temp</th><th>Precip</th></tr>";
//     rowcount = fcData.data.length;
//     if (rowcount > 8) {
//         rowcount = 8;
//     }

//     for (i = 0; i < rowcount; i++) {

//         let ts = new Date(fcData.data[i].time * 1000);
//         let summary = "";
//         let tempHigh = 0;
//         let timeValue;

//         //unix time needs to be formatted for display
//         let hours = ts.getHours();
//         if (hours > 0 && hours <= 12) {
//             timeValue = "" + hours;
//         } else if (hours > 12) {
//             timeValue = "" + (hours - 12);
//         } else if (hours == 0) {
//             timeValue = "12";
//         }
//         timeValue += (hours >= 12) ? " PM" : " AM"; // get AM/PM

//         summary = fcData.data[i].summary;
//         tempHigh = `${Math.round(fcData.data[i].temperature)}&deg`;
//         let precipProbability = `${Math.round(fcData.data[i].precipProbability * 100)}%`;
//         resultsHTML += renderRow(timeValue, summary, tempHigh, precipProbability);

//     }

//     return resultsHTML;
// }

// //render the weekly forecast
// function renderWeeklyForecast(fcData) {

//     let resultsHTML = "<tr><th>Day</th><th>Conditions</th><th>Hi</th><th>Lo</th></tr>";
//     rowcount = fcData.data.length;
//     if (rowcount > 8) {
//         rowcount = 8;
//     }

//     for (i = 0; i < rowcount; i++) {

//         let ts = new Date(fcData.data[i].time * 1000);

//         let dayTime = wDay[ts.getDay()];
//         let summary = fcData.data[i].summary;
//         let tempHigh = `${Math.round(fcData.data[i].temperatureHigh)}&deg`;
//         let tempLow = `${Math.round(fcData.data[i].temperatureLow)}&deg`;

//         resultsHTML += renderRow(dayTime, summary, tempHigh, tempLow);
//     }

//     return resultsHTML;
// }

// //template function to render grid colums
// function renderRow(dayTime, summary, tempHigh, colVal4) {
//     return `<tr><td>${dayTime}</td><td>${summary}</td><td>${tempHigh}</td><td>${colVal4}</td></tr>`
// }

// //render the correct icon
// function getICON(icon) {
//     switch (icon) {
//         case iconValue.CLEARDAY:
//             return "images/SunnyDay.png";

//         case iconValue.CLOUDY:
//         case iconValue.PARTLY_CLOUDY_DAY:
//             return "images/MostlySunny.png";

//         case iconValue.CLEARNIGHT:
//             return "images/ClearMoon.png";

//         case iconValue.PARTLY_CLOUDY_NIGHT:
//             return "images/CloudyMoon.png";
//         case iconValue.RAIN:
//             return "images/Rain.png";

//         case iconValue.SNOW:
//             return "images/SNOW.png";

//         case iconValue.SLEET:
//             return "images/Sleet.png";

//         default:
//             return "images/SunnyDay.png";

//     }
// }

// //try and location the user
// function initGeolocation() {
//     if (navigator.geolocation) {
//         // Call getCurrentPosition with success and failure callbacks
//         navigator.geolocation.getCurrentPosition(success, fail);
//     } else {
//         alert("Sorry, your browser does not support geolocation services.");
//     }
// }

// //if naviation is available show weather for the current location
// function success(position) {

//     //ADD your keys here. My keys are located in a key.js file but are not included in the sample code for security reasons.
//     //var dsKey = "";
//     //var googleApiKey= "";
//     fetchLocation(googleApiKey, position.coords.latitude, position.coords.longitude)
//     fetchWeatherReport(dsKey, position.coords.latitude, position.coords.longitude)
// }

// function fail() {

//     //You could default to your favorite city like Kernersville, NC the home of Coder Foundry!
//     alert("Sorry, your browser does not support geolocation services.");
// }

import { openWeatherMapKey } from "./keys.js";
const curTemp = document.querySelector("#currentTemp");
const wSummary = document.querySelector("#summary");
const location = document.querySelector("#location");

const wpCurrent = document.querySelector("#wpCurrent");

const dayDate = document.querySelector("#dayDate");
const timeDate = document.querySelector("#timeDate");

const weatherImg = document.querySelector("#weatherImg");
const searchForm = document.querySelector("#citySearchForm");

const wDay = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const BASE_URL = "https://api.openweathermap.org/data/2.5/onecall";

function updateDateTime() {
  const date = new Date();
  const day = wDay[date.getDay()];
  const time = `${date.getHours()}:${date.getMinutes()}`;

  dayDate.innerHTML = day;
  timeDate.innerHTML = time;
}

async function fetchOpenWeatherMap(params) {
  const requestParams = {
    lat: params.latitude,
    lon: params.longitude,
    appid: params.key,
    units: "metric",
  };

  try {
    const response = await axios.get(BASE_URL, { params: requestParams });

    console.log(response.data);

    updateUI(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const city = this.children[0].value;
  fetchWeatherCity(city, openWeatherMapKey);
});

async function fetchWeatherCity(city, key) {
  const config = {
    q: city,
    appid: key,
    units: "metric",
  };

  const api = `https://api.openweathermap.org/data/2.5/weather`;

  try {
    const response = await axios.get(api, { params: config });
    updateSearchUI(response.data);
    searchForm.children[0].value = "";
  } catch (e) {
    alert("There is no such city, please try again.");
    console.error(e);
  }
}

function updateSearchUI(data) {
  location.innerHTML = data.name;
  curTemp.innerHTML = data.main.feels_like;
  wSummary.innerHTML = data.weather[0].description;
  const weatherID = data.weather[0].id;

  if (weatherID < 600 && weatherID >= 500) {
    // rain.png
    weatherImg.setAttribute("src", "./images/Rain.png ");
  }

  if (weatherID === 800) {
    // clear.png
    weatherImg.setAttribute("src", "./images/SunnyDay.png");
  }

  if (weatherID > 800) {
    // mostly sunny
    weatherImg.setAttribute("src", "./images/MostlySunny.png ");
  }
}

// dom update
function updateUI(data) {
  curTemp.innerHTML = data.current.feels_like;
  wSummary.innerHTML = data.current.weather[0].description;
  const weatherID = data.current.weather[0].id;

  if (weatherID < 600 && weatherID >= 500) {
    // rain.png
    weatherImg.setAttribute("src", "./images/Rain.png ");
  }

  if (weatherID === 800) {
    // clear.png
    weatherImg.setAttribute("src", "./images/SunnyDay.png");
  }

  if (weatherID > 800) {
    // mostly sunny
    weatherImg.setAttribute("src", "./images/MostlySunny.png ");
  }
}

// find the late and long of the user's location
function initGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, fail, {
      enableHighAccuracy: true,
    });
  } else {
    alert("Sorry, your browser does not upport geolocation services.");
  }
}

function success(position) {
  const params = {
    key: openWeatherMapKey,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };

  fetchOpenWeatherMap(params);
}
function fail(error) {
  console.error(error);
}

window.addEventListener("load", function () {
  initGeolocation();
  updateDateTime();
});
