import {container} from "./config.js";
import {cityChange} from "./app.js";


//Функция отрисовки погоды
export async function drawWeather(temp, desc, city) {
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


//Функция отрисовки выбора города
export async function drawSelectCity() {
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