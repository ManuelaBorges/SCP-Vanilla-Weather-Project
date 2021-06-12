function showCurrentLocationData (response) {
    let getCurrentLocCity = response.data.list[1].name;
        let currentLocCity = document.querySelector("h5");
        currentLocCity.innerHTML = `${getCurrentLocCity} 🌍`
        let getCurrentLocTemperature = Math.round(response.data.list[2].main.temp);
        let currentLocTemp = document.querySelector("#max-temp");
        currentLocTemp.innerHTML = `${getCurrentLocTemperature}`
        let getMinLocTemperature = Math.round(response.data.list[2].main.temp_min);
        let minimumLocTemp = document.querySelector("#min-temp");
        minimumLocTemp.innerHTML = `${getMinLocTemperature}`
        let getWindLocSpeed = response.data.list[3].wind.speed;
        let windLocSpeed = document.querySelector("#wind-speed");
        windLocSpeed.innerHTML = `${getWindLocSpeed.toFixed(1)}`
        let getHumidityLocPerc = Math.round(response.data.list[2].main.humidity);
        let humidityLocPerc = document.querySelector("#humidity");
        humidityLocPerc.innerHTML = `${getHumidityLocPerc}`
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
  