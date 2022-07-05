const API_KEY = '&appid=0bed307b0afbac425fa1b0935e9651de';
const container = document.querySelector('.container');


window.addEventListener('load', async function () {
    await getGeoLocation()
})


//Функция получения местоположения
async function getGeoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((success) => {
                let lat = success.coords.latitude;
                let lon = success.coords.longitude;
                weatherAPI(lat, lon)
            },
            async function (error) {
                console.log(error.message)
                await cityAPI(await getIpLocation())
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
            drawWeather(temp, description, getIpLocation)
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
            if (data.message) {
                drawErrors(data.message)
            }
            const temp = data.main.temp;
            const description = data.weather[0].description;
            drawWeather(temp, description,  () => city)
        })

}


//Функция отрисовки погоды
async function drawWeather(temp, desc, city) {
    const firstToUpper = desc[0].toUpperCase() + desc.slice(1);

    container.innerHTML = ""

    const degrees = document.createElement('p');
    degrees.className = 'degrees';
    degrees.textContent = Math.round(temp - 273) + '℃';
    container.append(degrees);

    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = `${firstToUpper} in ${await city()}`;
    container.append(description);

    const change = document.createElement('button');
    change.textContent = 'Change city';
    change.className = 'btn btn-change';
    container.append(change);

    await drawSelectCity()
}


//Функция определения местоположения по IP
async function getIpLocation() {
    const res = await fetch('https://geo.ipify.org/api/v2/country?apiKey=at_eRqcqqInNt1bUk30MoByCCUV19sX3', {
        method: 'GET',
    })
    const data = await res.json()

    return data.location.region;
}


//Функция отрисовки выбора города
async function drawSelectCity() {
    const changeBtn = await document.querySelector('.btn-change');
    changeBtn.addEventListener('click', async () => {
        container.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'city__wrapper';
        container.append(wrapper);

        const input = document.createElement('input');
        input.className = 'input__city';
        input.placeholder = 'Type your city here';
        wrapper.append(input);

        const findBtn = document.createElement('button');
        findBtn.className = 'btn-find';
        findBtn.textContent = 'Find';
        wrapper.append(findBtn);

        await cityChange()
    })
}


// Функция смены города
async function cityChange(){
    const findBtn = document.querySelector('.btn-find');
    const inputCity = document.querySelector('.input__city');

    findBtn.addEventListener('click', async () => {
        const cityToUpper = inputCity.value[0].toUpperCase() + inputCity.value.slice(1)
        try {
            await cityAPI(cityToUpper)
        } catch (err) {
            console.log(err)
        }
    })
}


//Функция отрисовки ошибки
async function drawErrors(err){
    const inputCity = await document.querySelector('.input__city');
    const errFirstUpper = err[0].toUpperCase() + err.slice(1) + '!';

    inputCity.value = errFirstUpper;
}