const container = document.querySelector('.container')

window.addEventListener('load', async function() {
    getLocation()
})

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((success) => {
            let lat = success.coords.latitude;
            let lon = success.coords.longitude;
            weatherAPI(lat, lon)
        })
    }
}

function weatherAPI(lat, lon) {
    const API_KEY = '&appid=0bed307b0afbac425fa1b0935e9651de';
    const API_CORD = 'lat=' + lat + '&lon=' + lon
    const API_URL =  'https://api.openweathermap.org/data/2.5/onecall?'

    const res = fetch(`${API_URL}${API_CORD}${API_KEY}`, {
        method: 'GET',
    })
        .then((data) => data.json())
        .then((data) => drawWeather(data.current.temp, data.current.weather[0].description))
}


// console.log(data.current.temp, data, data.current.weather[0].description)


function drawWeather(deg, desc) {
    const degrees = document.createElement('p');
    degrees.className = 'degrees';
    degrees.textContent = deg;
    container.append(degrees);

    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = desc;
    container.append(description);
}