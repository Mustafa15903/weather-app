const apiKey = "b661a39aa570e8db3d43709e1ba7a12a"; // <-- put your OpenWeatherMap API key here
let units = "metric"; // default Celsius

async function fetchWeather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}`
    );
    if (!response.ok) throw new Error("Location not found");
    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    alert(error.message);
  }
}

function updateWeatherUI(data) {
  const temp = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const wind = data.wind.speed;

  document.getElementById("temperature").textContent =
    temp + (units === "metric" ? "°C" : "°F");

  document.getElementById("tempChange").textContent = "Feels like " +
    Math.round(data.main.feels_like) +
    (units === "metric" ? "°C" : "°F");

  document.getElementById("tempBar").style.width = Math.min(
    (temp / 40) * 100,
    100
  ) + "%";

  document.getElementById("humidityBar").style.width = humidity + "%";

  document.getElementById("windBar").style.width = Math.min(
    wind * 10,
    100
  ) + "%";

  const now = new Date();
  document.getElementById("lastUpdated").textContent =
    "Last updated: " + now.toLocaleTimeString();
}

// Handle search
document.getElementById("locationInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchWeather(e.target.value);
  }
});

// Toggle settings
document.getElementById("toggleBtn").addEventListener("click", () => {
  alert("Settings button clicked!");
});

// Globe button
document.getElementById("globeBtn").addEventListener("click", () => {
  alert("Globe button clicked!");
});

// Unit toggle
document.getElementById("unitBtn").addEventListener("click", () => {
  units = units === "metric" ? "imperial" : "metric";
  document.getElementById("unitBtn").querySelector("span").textContent =
    "Units: " + (units === "metric" ? "°C" : "°F");

  const location = document.getElementById("locationInput").value;
  if (location) {
    fetchWeather(location);
  }
});

// === THEME TOGGLE ===
const themeBtn = document.getElementById("themeToggleBtn");

// Check saved theme on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.classList.add(savedTheme);
} else {
  document.body.classList.add("light"); // default
}

themeBtn.addEventListener("click", () => {
  if (document.body.classList.contains("light")) {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
  }
});
