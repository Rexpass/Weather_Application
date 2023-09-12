// Define the API key for OpenWeatherMap API
const API_KEY = "776e9807d84de642edb7334f954ef264";

// Function to fetch weather data based on user input
function getWeather() {
  // Get the city input from the HTML input element with the id "cityInput"
  const cityInput = document.getElementById("cityInput").value;

  // Check if the input is empty and display an alert if it is
  if (cityInput.trim() === "") {
    alert("Please enter a city name.");
    return;
  }

  // Create the API URL using the user's city input and the API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=metric`;

  // Fetch weather data from the OpenWeatherMap API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Check if the city was not found and display an alert if it wasn't
      if (data.cod === "404") {
        alert("City not found.");
        return;
      }

       // Get references to the icon containers and update their content with icons
      const locationIconContainer = document.querySelector(".icon-container:nth-of-type(1)");
      locationIconContainer.innerHTML = `<img src="img/location.png" alt="Location Icon">`;
  
      const temperatureIconContainer = document.querySelector(".icon-container:nth-of-type(2)");
      temperatureIconContainer.innerHTML = `<img src="img/temp.png" alt="Temperature Icon">`;
  
      const descriptionIconContainer = document.querySelector(".icon-container:nth-of-type(3)");
      descriptionIconContainer.innerHTML = `<img src="img/desc.png" alt="Description Icon">`;

      // Get references to the HTML elements to display weather data
      const locationElement = document.getElementById("location");
      const temperatureElement = document.getElementById("temperature");
      const descriptionElement = document.getElementById("description");

      // Show the icon containers
      locationIconContainer.style.display = "inline-block";
      temperatureIconContainer.style.display = "inline-block";
      descriptionIconContainer.style.display = "inline-block";

      // Update the HTML elements with weather data
      locationElement.textContent = `Location: ${data.name}, ${data.sys.country}`;
      temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
      descriptionElement.textContent = `Description: ${data.weather[0].description}`;
    })
    .catch(error => {
       // Handle errors by logging to the console and displaying an alert
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data. Please try again later.");
    });
}
