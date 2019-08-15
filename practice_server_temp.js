

const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const app = express();
app.listen(3000, () => console.log('lisening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));


app.get('weather', async (request, response) => {
    const apiUrl = `https://api.darksky.net/forecast/fc9e584c1abff4a066e423ae25175d1e/${lat},${lon}`;
    const fetch_response = await fetch('apiUrl');
    const json = await fetch_response.json();
    response.json(json);
});
