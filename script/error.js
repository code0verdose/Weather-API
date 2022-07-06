//Функция отрисовки ошибки
export default async function drawErrors(err){
    const inputCity = await document.querySelector('.input__city');
    const errFirstUpper = err[0].toUpperCase() + err.slice(1) + '!';

    inputCity.value = errFirstUpper;
}