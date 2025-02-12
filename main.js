const latInput = document.getElementById("lat-input");
const longInput = document.getElementById("long-input");

document.getElementById("get-weather-button").addEventListener("click", async () => {
    document.getElementById("weather-info").innerHTML = "loading...";
    document.getElementById("location-info").innerHTML = "";

    const weatherUri = `https://api.weather.gov/points/${latInput.value},${longInput.value}`;
    const weatherResponse = await fetch(weatherUri);
    const weatherData = await weatherResponse.json();

    console.log(weatherData)

    if (weatherData.status === 404) {
        document.getElementById("weather-info").innerHTML = "Invalid location 404";
        document.getElementById("location-info").innerHTML = "";
    }

    const forecastUri = weatherData.properties.forecast;
    const forecastResponse = await fetch(forecastUri);
    const forecastData = await forecastResponse.json();

    console.log(forecastData)

    const zoneUri = weatherData.properties.forecastZone;
    const zoneResponse = await fetch(zoneUri);
    const zoneData = await zoneResponse.json();

    const weatherInfo = forecastData.properties.periods[1].detailedForecast

    const location = `${zoneData.properties.name}, ${zoneData.properties.state}`

    document.getElementById("weather-info").innerHTML = weatherInfo
    document.getElementById("location-info").innerHTML = location
})