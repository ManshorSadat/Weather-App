const temp = document.getElementById("temp"),
  date = document.getElementById("date-time"),
  currentLocation = document.getElementById("location"),
  condition = document.getElementById("condition"),
  rain = document.getElementById("rain"),
  mainIcon = document.getElementById("icon"),
  windSpeed = document.querySelector(".wind-speed"),
  humidity = document.querySelector(".humidity"),
  visibility = document.querySelector(".visibility"),
  humidityStatus = document.querySelector(".humidity-status"),
  airQuality = document.querySelector(".air-quality"),
  airQualityStatus = document.querySelector(".air-quality-status"),
  visibilityStatus = document.querySelector(".visibility-status"),
  weatherCards = document.querySelector("#weather-cards"),
  celciusBtn = document.querySelector(".celcius"),
  fahrenheitBtn = document.querySelector(".fahrenheit"),
  hourlyBtn = document.querySelector(".hourly"),
  weekBtn = document.querySelector(".week"),
  monthBtn = document.querySelector(".month"),
  tempUnit = document.querySelectorAll(".temp-unit"),
  searchForm = document.querySelector("#search"),
  search = document.querySelector("#query");

let currentCity = "";
let currentUnit = "C";
let hourlyorWeek = "week";

function getDateTime() {
  let now = new Date(),
    hour = now.getHours(),
    minute = now.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  hour = hour % 12;
  hour = hour || 12;
  minute = minute < 10 ? '0' + minute : minute;

  let dayString = days[now.getDay()];
  return `${dayString}, ${hour}:${minute}`;
}

date.innerText = getDateTime();
setInterval(() => {
  date.innerText = getDateTime();
}, 1000);

function getPublicIp() {
  fetch("https://geolocation-db.com/json/", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      currentCity = data.city;
      getWeatherData(data.city, currentUnit, hourlyorWeek);
    });
}

// New feedback functionality
function getWeatherFeedback(conditions) {
  if (conditions.temp > 20) {
    return "It's quite hot outside, make sure to stay hydrated!";
  } else if (conditions.temp < 10) {
    return "Brrr... It's cold! Dress warmly!";
  } else if (conditions.conditions.toLowerCase().includes('rain')) {
    return "Don't forget your umbrella, it's going to rain today!";
  } else {
    return "It's a lovely day out there!";
  }
}

function displayFeedback(feedback) {
  const feedbackElement = document.getElementById('weather-feedback');
  feedbackElement.innerText = feedback;
}

function getWeatherData(city, unit, hourlyorWeek) {
  console.log(city);
  const apiKey = "2VXNCLWCN2QYBZTHRJU89EP8Q";
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let today = data.currentConditions;
      if (unit === "C") {
        temp.innerText = today.temp;
      } else {
        temp.innerText = celciusToFahrenheit(today.temp);
      }
      currentLocation.innerText = data.resolvedAddress;
      condition.innerText = today.conditions;
      rain.innerText = "Perc -" + today.precip + "%";
      windSpeed.innerText = today.windspeed;
      humidity.innerText = today.humidity + "%";
      visibility.innerText = today.visibility;
      airQuality.innerText = today.winddir;
      measureHumidityStatus(today.humidity);
      mainIcon.src = getIcon(today.icon);

      const feedbackMessage = getWeatherFeedback(today);
      displayFeedback(feedbackMessage);

      console.log(hourlyorWeek)
      if (hourlyorWeek === "hourly") {
        updateForecast(data.days[0].hours, unit, "day");
      } else if (hourlyorWeek === "week") {
        updateForecast(data.days, unit, "week");
      } else {
        updateForecast(data.days, unit, "month");
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Invalid Entry ");
    });
}

function celciusToFahrenheit(temp) {
  return ((temp * 9) / 5 + 32).toFixed(1);
}

function measureHumidityStatus(humidity) {
  if (humidity <= 30) {
    humidityStatus.innerText = "Low";
  } else if (humidity <= 60) {
    humidityStatus.innerText = "Moderate";
  } else {
    humidityStatus.innerText = "High";
  }
}

function getIcon(condition) {
  // Map your condition to your icon filenames accordingly
  // This is an example, modify with your actual icon filenames
  const iconsMap = {
    "Partly-cloudy-day": "icons/sun/27.png",
    "partly-cloudy-night": "icons/moon/15.png",
    "rain": "icons/rain/39.png",
    "clear-day": "icons/sun/26.png",
    "clear-night": "icons/moon/10.png"
  };
  return iconsMap[condition] || "icons/sun/26.png";
}

function getDayName(dateStr) {
  let day = new Date(dateStr);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day.getDay()];
}

function getHour(time) {
  let [hour, min] = time.split(":");
  hour = hour % 12 || 12;
  let suffix = hour < 12 ? 'AM' : 'PM';
  return `${hour}:${min} ${suffix}`;
}

function updateForecast(data, unit, type) {
  weatherCards.innerHTML = "";
  let day = 0;
  let numCards = type === "day" ? 24 : type === "week" ? 7 : 15;

  for (let i = 0; i < numCards; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    let dayName = type === "week" ? getDayName(data[day].datetime) : getHour(data[day].datetime);
    let dayTemp = unit === "F" ? celciusToFahrenheit(data[day].temp) : data[day].temp;
    let iconSrc = getIcon(data[day].icon);
    let tempUnitSymbol = unit === "F" ? "°F" : "°C";

    card.innerHTML = `
      <h2 class="day-name">${dayName}</h2>
      <div class="card-icon">
        <img src="${iconSrc}" alt="" />
      </div>
      <div class="day-temp">
        <h2 class="temp">${dayTemp}</h2>
        <span class="temp-unit">${tempUnitSymbol}</span>
      </div>
    `;

    weatherCards.appendChild(card);
    day++;
  }
}

fahrenheitBtn.addEventListener("click", () => {
  changeUnit("F");
});
celciusBtn.addEventListener("click", () => {
  changeUnit("C");
});

function changeUnit(unit) {
  if (currentUnit !== unit) {
    currentUnit = unit;
    tempUnit.forEach((elem) => {
      elem.innerText = `°${unit}`;
    });
    getWeatherData(currentCity, currentUnit, hourlyorWeek);
  }
}

hourlyBtn.addEventListener("click", () => {
  changeTimeSpan("hourly");
});
weekBtn.addEventListener("click", () => {
  changeTimeSpan("week");
});
monthBtn.addEventListener("click", () => {
  changeTimeSpan("month");
});

function changeTimeSpan(span) {
  if (hourlyorWeek !== span) {
    hourlyorWeek = span;
    getWeatherData(currentCity, currentUnit, hourlyorWeek);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let location = search.value.trim();
  if (location) {
    currentCity = location;
    getWeatherData(currentCity, currentUnit, hourlyorWeek);
  }
});

getPublicIp();




