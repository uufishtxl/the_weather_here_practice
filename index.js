//The require() method is used to load and cache JavaScript modules. So, if you want to load a local, relative JavaScript module into a Node.js application, you can simply use the require() method.
const express = require('express');
// require NeDB
const Datastore = require('nedb');
// require node-fetch, a light-weight module that brings window.fetch to Node.js
const fetch = require('node-fetch');
//0815: load dotenv
require('dotenv').config();
console.log(process.env);
const app = express();
app.listen(3000, () => console.log('lisening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

// make the database and give it a path to the file name. The database will ultimately sit in a local folder. When you are done, you can't find such a file on your laptop.
const database = new Datastore('database.db');
// Add this line, and you'll find it. This line means load the data from the previous time the server ran into memory. If it isn't there, it's going to create the file
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => { // leave the curly braces empty to find everything
        // error handling
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

// address at which you want to receive the data and a callback function
app.post('/api', (request, response) => {
    const data = request.body;
    // Add timestamp also. make a variable and push it into the data object
    const timestamp = Date.now();
    data.timestamp = timestamp;
    // Save into databse with insert funtion
    database.insert(data);
    response.json(data);
});

app.get('/weather/:latlon', async (request, response) => {
    // now that we want to define the route parameters that come from the request, let's use request
    // 也可以写成: request.params['latlon']
    console.log(request.params);
    const latlon = request.params.latlon.split(',');
    console.log(latlon);
    const lat = latlon[0];
    const lon = latlon[1];
    console.log(lat, lon);
    const api_key = process.env.API_KEY;
    const weather_url = `https://api.darksky.net/forecast/${api_key}/${lat},${lon}/?units=si`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();

    const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
    const aq_response = await fetch(aq_url);
    const aq_data = await aq_response.json();

    const data = { 
        weather: weather_data,
        air_quality: aq_data
     }

     response.json(data);

});