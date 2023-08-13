const API_KEY = "776e9807d84de642edb7334f954ef264";

function getWeather() {
  const cityInput = document.getElementById("cityInput").value;
  if (cityInput.trim() === "") {
    alert("Please enter a city name.");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      
      if (data.cod === "404") {
        alert("City not found.");
        return;
      }

      const locationIconContainer = document.querySelector(".icon-container:nth-of-type(1)");
      locationIconContainer.innerHTML = `<img src="img/location.png" alt="Location Icon">`;
  
      const temperatureIconContainer = document.querySelector(".icon-container:nth-of-type(2)");
      temperatureIconContainer.innerHTML = `<img src="img/temp.png" alt="Temperature Icon">`;
  
      const descriptionIconContainer = document.querySelector(".icon-container:nth-of-type(3)");
      descriptionIconContainer.innerHTML = `<img src="img/desc.png" alt="Description Icon">`;
  

      const locationElement = document.getElementById("location");
      const temperatureElement = document.getElementById("temperature");
      const descriptionElement = document.getElementById("description");

      locationIconContainer.style.display = "inline-block";
      temperatureIconContainer.style.display = "inline-block";
      descriptionIconContainer.style.display = "inline-block";



      locationElement.textContent = `Location: ${data.name}, ${data.sys.country}`;
      temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
      descriptionElement.textContent = `Description: ${data.weather[0].description}`;
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data. Please try again later.");
    });
}
