// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { log } = require('console');

require('dotenv').config();

// Create an instance of Express
const app = express();

// Configure body-parser middleware to parse url-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Route handler for the root URL
app.get("/", function(req, res) {
    // Send the index.html file
    res.sendFile(__dirname+"/index.html");
})

// Route handler for the root URL with POST method
app.post("/", function(request, response) {
    // Get the city parameter from the request body
    var cityParameter = request.body.city;

    // Set the OpenWeatherMap API key
    var appKey = process.env.WEATHER_API_KEY;

    // Construct the API link with the city parameter and API key
    var apiLink = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="+ cityParameter +"&appid="+appKey;

    // Import the 'https' module
    const https = require('node:https');

    // Make a GET request to the OpenWeatherMap API
    https.get(apiLink, (res) => {
        // Listen for data event
        res.on('data', (d) => {
            // Parse the weather data
            weatherData = JSON.parse(d);

            // Send the weather information as the response
            response.write("<h1>Description : "+weatherData.weather[0].description+"</h1>");
            response.write("<h1>Temperature : "+weatherData.main.temp+"</h1>");
            response.write("<img src='https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png'></img>");
            response.send();
        });
    });
})

// Start the server on port 3000
app.listen(3000, function() {
    log("Server running on port 3000");
})
