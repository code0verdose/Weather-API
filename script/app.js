const API_KEY = '&appid=0bed307b0afbac425fa1b0935e9651de';
const container = document.querySelector('.container');


window.addEventListener('load', async function () {
    await getLocation()
})


//Функция получения местоположения
async function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((success) => {
                let lat = success.coords.latitude;
                let lon = success.coords.longitude;
                weatherAPI(lat, lon)
            },
            async function (error) {
                console.log(error.message)
                await cityAPI(await getUserLocation())
            })
    }
}


//Функция получения данных по API
async function weatherAPI(lat, lon) {
    const API_CORD = 'lat=' + lat + '&lon=' + lon
    const API_URL = 'https://api.openweathermap.org/data/2.5/onecall?'

    const res = fetch(`${API_URL}${API_CORD}${API_KEY}`, {
        method: 'GET',
    })
        .then((data) => data.json())
        .then((data) => {
            const temp = data.current.temp;
            const description = data.current.weather[0].description;
            drawWeather(temp, description)
        })
}


//Функция получения погоды по городу API
async function cityAPI(city) {
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';

    const res = fetch(`${API_URL}${city}${API_KEY}`, {
        method: 'GET'
    })
        .then((data) => data.json())
        .then((data) => {
            const temp = data.main.temp;
            const description = data.weather[0].description;
            drawWeather(temp, description)
        })

}


//Функция отрисовки погоды
async function drawWeather(temp, desc) {
    const firstToUpper = desc[0].toUpperCase() + desc.slice(1);

    const degrees = document.createElement('p');
    degrees.className = 'degrees';
    degrees.textContent = Math.round(temp - 273) + '℃';
    container.append(degrees);

    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = `${firstToUpper} in ${await getUserLocation()}`;
    container.append(description);

    const change = document.createElement('button');
    change.textContent = 'Change city';
    change.className = 'btn btn-change';
    container.append(change);

    await changeCity()
}


//Функция определения местоположения по IP
async function getUserLocation() {
    const res = await fetch('https://geo.ipify.org/api/v2/country?apiKey=at_eRqcqqInNt1bUk30MoByCCUV19sX3', {
        method: 'GET',
    })
    const data = await res.json()

    return data.location.region;
}


//Функция смены города
async function changeCity() {
    const changeBtn = await document.querySelector('.btn-change');
    changeBtn.addEventListener('click', () => {
        container.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'city__wrapper'
        container.append(wrapper)

        const input = document.createElement('input');
        input.className = 'input__city';
        input.placeholder = 'Type your city here';
        wrapper.append(input)

        const findBtn = document.createElement('button');
        findBtn.className = 'btn-find';
        findBtn.textContent = 'Find';
        wrapper.append(findBtn)
    })
}