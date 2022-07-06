import {cityAPI} from "./API.js";
import {getIpLocation} from "./API.js";
import {weatherAPI} from "./API.js";


window.addEventListener('load', async function () {
    await getGeoLocation()
})


//Проверка доступности GEO
export async function getGeoLocation() {
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


// Функция смены города
export async function cityChange(){
    const findBtn = document.querySelector('.btn-find');
    const inputCity = document.querySelector('.input__city');

    findBtn.addEventListener('click', async () => {
        const cityToUpper = inputCity.value[0].toUpperCase() + inputCity.value.slice(1).trim()
        try {
            await cityAPI(cityToUpper)
        } catch (err) {
            console.log(err)
        }
    })
}