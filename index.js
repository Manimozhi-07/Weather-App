const apiKey = "b29a468988cb7cc1a1af91aa1d0b4a3a";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

const searchBox = document.querySelector("#search");
const searchBtn = document.querySelector("#search-icon");
const weatherContainer = document.querySelector(".weather");
const image = document.querySelector("#image");
const err = document.querySelector("#error");

async function weather(city) {
  const response = await fetch(apiURL + `&q=${city}` + `&appid=${apiKey}`);
  var data = await response.json();
  console.log(data);
  if (response.status == 404) {
    weatherContainer.style.display = "none";
    err.style.display = "block";
  } 
  else {
    document.querySelector("#temp").innerText =Math.round(data.main.temp) + "°C";
    document.querySelector("#state").innerText=data.weather[0].main;
    document.querySelector("#city").innerText = data.name;
    document.querySelector("#country").innerText = data.sys.country;
    document.querySelector("#humidity").innerText = data.main.humidity + "%";
    document.querySelector("#wind").innerText = data.wind.speed + "km/hr";
    if (data.weather[0].main == "Clouds") {
      image.src = "images/cloud.png";
    } else if (data.weather[0].main == "Clear") {
      image.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      image.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      image.src = "images/drizzle1.png";
    } else if (data.weather[0].main == "Mist") {
      image.src = "images/mist.png";
    } else if (data.weather[0].main == "Snow") {
      image.src = "images/snow.jpg";
    }
    weatherContainer.style.display = "block";
    err.style.display = "none";
  }
}
searchBtn.addEventListener("click", () => {
  weather(searchBox.value);
  searchBox.value = "";
});
searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    weather(searchBox.value);
    searchBox.value = "";
  }
});
