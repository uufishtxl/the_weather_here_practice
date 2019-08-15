


let lat, lon;

if ("geolocation" in navigator) {
    console.log('geolocation available!');
    navigator.geolocation.getCurrentPosition(async position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        document.getElementById('latitude').textContent = lat.toFixed(2);
        document.getElementById('longitude').textContent = lon.toFixed(2);
        // make the url a local path 
        const apiUrl = `weather/${lat},${lon}`
        const response = await fetch('apiUrl');
        const json = await response.json();
        console.log(json);
    });
  } else {
    console.log('geolocation not available!');
  }