// Current date

function getCurrentDate (date) {
  

    let monthDay = date.getDate();
    let year = date.getFullYear();
  
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wedn",
    "Thu",
    "Fri",
    "Sat"
  ];
  let day = days[date.getDay()];
  
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
    "December"
  ];
  let month = months[date.getMonth()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  
  if (minutes<10) {
  return `${day}, ${monthDay} of ${month} of ${year}  |  ${hours}:0${minutes}`;
  } else { 
  return `${day}, ${monthDay} of ${month} of ${year}  |  ${hours}:${minutes}`;
}
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}


function displayForecast(response) {
  let forecast= response.data.daily;
  let forecastElement = document.querySelector("#forecast-app");
  let forecastHTML = `<div class="row">`;
 
  forecast.forEach(function(forecastDay, index){
    if (index < 6) {
  forecastHTML = forecastHTML + `
  <div class="col-2">
  <div class="col days" id="forecast-day">${formatDay(forecastDay.dt)}</div>
  <div class="col"><span class="forecastIcon" id="forecast-icon">
  <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42"/> </span></div>
  <div class="col temp><span class="forecastMax" id="forecast-max" >${Math.round(forecastDay.temp.max)}º</span>/ <span class="forecastMin" id="forecast-min">${Math.round(forecastDay.temp.min)}º</span></div>
  </div>   
  `;
}
})
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

 
  let currentDate = document.querySelector("#date");
  let now = new Date();
  currentDate.innerHTML = getCurrentDate(now);
  window.onload = getCurrentDate(now);
  
         
  function getForecast (coordinates) {
    let apiKey = "3104ffa0cef5c837b609ed2dcb82062f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast);
  }  
     
  function showTemperature (response) {        
      let currentTemp = document.querySelector("#max-temp");               
      let minimumTemp = document.querySelector("#min-temp");                
      let windSpeed = document.querySelector("#wind-speed");                
      let humidityPerc = document.querySelector("#humidity");
      let iconElement = document.querySelector("#icon");        
      let weatherDescription = document.querySelector("#weather-description");

      celsiusTemperature = Math.round(response.data.main.temp);
      celsiusMinTemperature = Math.round(response.data.main.temp_min);

      currentTemp.innerHTML = `${celsiusTemperature}`
      minimumTemp.innerHTML = `${celsiusMinTemperature}`
      windSpeed.innerHTML = `${response.data.wind.speed.toFixed(1)}`
      humidityPerc.innerHTML = `${Math.round(response.data.main.humidity)}`
      iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
      weatherDescription.innerHTML = `${response.data.weather[0].description}` 

      getForecast(response.data.coord);
      }


  //Current Location Button
  
  function showCurrentLocationData (response) {
        let currentCity = document.querySelector("#user-city");                    
        let currentTemp = document.querySelector("#max-temp");                
        let minimumTemp = document.querySelector("#min-temp");                
        let windSpeed = document.querySelector("#wind-speed");                
        let humidityPerc = document.querySelector("#humidity");
        let iconElement = document.querySelector("#icon");        
        let weatherDescription = document.querySelector("#weather-description");
        
        celsiusTemperature = Math.round(response.data.list[2].main.temp);
        celsiusMinTemperature = Math.round(response.data.list[2].main.temp_min);
                 
        currentCity.innerHTML = `${response.data.list[1].name}`;
        currentTemp.innerHTML = `${celsiusTemperature}`
        minimumTemp.innerHTML = `${celsiusMinTemperature}`
        windSpeed.innerHTML = `${response.data.list[3].wind.speed.toFixed(1)}`
        humidityPerc.innerHTML = `${Math.round(response.data.list[2].main.humidity)}`
        iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@2x.png`);
        weatherDescription.innerHTML = `${response.data.list[1].weather[0].description}`

       
    }

  
  function currentPosition (position) {
    let apiKey = "3104ffa0cef5c837b609ed2dcb82062f";  
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showCurrentLocationData);
  }


  function getCurrentLocation (event) {
    event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition); 
  }

   //User city input
  
  
   function search(city) {
    let apiKey = "3104ffa0cef5c837b609ed2dcb82062f";  
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(showTemperature);
    }


    function handleSubmit(event) {
      event.preventDefault();
      let inputCityElement = document.querySelector("#input-city");
      search(inputCityElement.value);

      let searchedCity = document.querySelector("#user-city");
      searchedCity.innerHTML = `${inputCityElement.value}`;
    }
   
  let form = document.querySelector("#city-form");
  form.addEventListener("submit", handleSubmit);

  search("Maia");

  let locationButton = document.querySelector("#geolocation");
  locationButton.addEventListener("click", getCurrentLocation);



