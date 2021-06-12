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
  
      let form = document.querySelector("#city-form");
      form.addEventListener("submit", searchCity);
  
   //Access temperature and city of OpenWeather 
      
     
      function showTemperature (response) {
        console.log(response.data)
        let getCurrentTemperature = Math.round(response.data.main.temp);
        let currentTemp = document.querySelector("#max-temp");
        currentTemp.innerHTML = `${getCurrentTemperature}`
        let getMinTemperature = Math.round(response.data.main.temp_min);
        let minimumTemp = document.querySelector("#min-temp");
        minimumTemp.innerHTML = `${getMinTemperature}`
        let getWindSpeed = response.data.wind.speed;
        let windSpeed = document.querySelector("#wind-speed");
        windSpeed.innerHTML = `${getWindSpeed.toFixed(1)}`
        let getHumidityPerc = Math.round(response.data.main.humidity);
        let humidityPerc = document.querySelector("#humidity");
        humidityPerc.innerHTML = `${getHumidityPerc}`
       

      
  
  //Convert Celsius Buttons      
  
  function convertToCelsius (event) {
    event.preventDefault();
  
    let currentTempElement = document.querySelector("#max-temp");
    currentTempElement.innerHTML = getCurrentTemperature;
    let minTempElement = document.querySelector("#min-temp");
    minTempElement.innerHTML = getMinTemperature;
  }
  
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener ("click", convertToCelsius);
      
  }
  
  //Current Location Button
  
  function showCurrentLocationData (response) {
        let getCurrentLocCity = response.data.list[1].name;
        let currentLocCity = document.querySelector("#user-city");            
        let getCurrentLocTemperature = Math.round(response.data.list[2].main.temp);
        let currentLocTemp = document.querySelector("#max-temp");        
        let getMinLocTemperature = Math.round(response.data.list[2].main.temp_min);
        let minimumLocTemp = document.querySelector("#min-temp");        
        let getWindLocSpeed = response.data.list[3].wind.speed;
        let windLocSpeed = document.querySelector("#wind-speed");        
        let getHumidityLocPerc = Math.round(response.data.list[2].main.humidity);
        let humidityLocPerc = document.querySelector("#humidity");
     // let iconElement = document.querySelector("#weather-icon"); 
        

        currentLocCity.innerHTML = `${getCurrentLocCity}`;
        currentLocTemp.innerHTML = `${getCurrentLocTemperature}`
        minimumLocTemp.innerHTML = `${getMinLocTemperature}`
        windLocSpeed.innerHTML = `${getWindLocSpeed.toFixed(1)}`
        humidityLocPerc.innerHTML = `${getHumidityLocPerc}`
        //iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
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
  
  let locationButton = document.querySelector("#geolocation");
  locationButton.addEventListener("click", getCurrentLocation);
  
  
  
  //Convert Fahrenheit Buttons
    
  function convertTofahrenheit (event) {
    event.preventDefault();
  
    let maxTempElement = document.querySelector("#max-temp");
    let maxTemperature = maxTempElement.innerHTML;
    maxTempElement.innerHTML = `${Math.round((maxTemperature * 9 ) / 5 + 32)}`;
    let minTempElement = document.querySelector("#min-temp");
    let minTemperature = minTempElement.innerHTML;
    minTempElement.innerHTML = `${Math.round((minTemperature * 9 ) / 5 + 32)}`;
  }
  
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener ("click", convertTofahrenheit);
  
  
  
  
  
  
  