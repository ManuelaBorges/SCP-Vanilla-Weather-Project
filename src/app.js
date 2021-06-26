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





  
  let currentDate = document.querySelector("#date");
  let now = new Date();
  currentDate.innerHTML = getCurrentDate(now);
  window.onload = getCurrentDate(now);
  
  
  //User city input
  
  
  function searchCity (event) {
      event.preventDefault();
      let inputCity = document.querySelector("#input-city").value;
            
      let searchedCity = document.querySelector("#user-city");
      searchedCity.innerHTML = `${inputCity}`;
  
      let apiKey = "3104ffa0cef5c837b609ed2dcb82062f";  
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;
      axios.get(`${apiUrl}`).then(showTemperature);
      }
        
   //Access temperature and city of OpenWeather 
      
     
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
    axios.get(apiUrl).then(showCurrentLocationData)
  }
  
  function getCurrentLocation (event) {
    event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition); 
  }
  

  
  function showFahrenheitTemperature (event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#max-temp");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

    let temperatureMinElement = document.querySelector("#min-temp");
    let fahrenheitMinTemperature = (celsiusMinTemperature * 9) / 5 + 32;
    temperatureMinElement.innerHTML = Math.round(fahrenheitMinTemperature);
  }
   
  function showCelsiusTemperature (event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#max-temp");
    temperatureElement.innerHTML = celsiusTemperature;
  
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");

    let temperatureMinElement = document.querySelector("#min-temp");
    temperatureMinElement.innerHTML = celsiusMinTemperature;
  }
  
 let celsiusTemperature = null;
 let celsiusMinTemperature = null;

  let form = document.querySelector("#city-form");
  form.addEventListener("submit", searchCity);

  let locationButton = document.querySelector("#geolocation");
  locationButton.addEventListener("click", getCurrentLocation);
  

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", showCelsiusTemperature);

  displayForecast();
  