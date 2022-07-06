import {API_KEY_OW, API_KEY_IP} from "./config.js";
import {drawWeather} from "./draw.js";
import drawErrors from "./error.js";

//Функция определения местоположения по IP
export async function getIpLocation() {
    const res = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=${API_KEY_IP}`, {
        method: 'GET',
    })
    const data = await res.json()

    return data.location.region;
}


//Функция получения погоды по городу API
export async function cityAPI(city) {
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';

    const res = fetch(`${API_URL}${city}${API_KEY_OW}`, {
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


//Функция получения данных по API
export async function weatherAPI(lat, lon) {
    const API_CORD = 'lat=' + lat + '&lon=' + lon
    const API_URL = 'https://api.openweathermap.org/data/2.5/onecall?'

    const res = fetch(`${API_URL}${API_CORD}${API_KEY_OW}`, {
        method: 'GET',
    })
        .then((data) => data.json())
        .then((data) => {
            const temp = data.current.temp;
            const description = data.current.weather[0].description;
            drawWeather(temp, description, getIpLocation)
        })
}