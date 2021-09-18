'use script';

/**
* Стрелочная функция складывает два числа a и b
* @param a произвольное число a
* @param b произвольное число b
* @returns {number} возвращает сумму a + b
*/
const add = (a, b) => a + b;

/**
* Стрелочная функция вычитает число а из числа b
* @param a произвольное число a
* @param b произвольное число b
* @returns {number} возвращает вычитаемое a - b
*/
const sub = (a, b) => a - b;

/**
* Стрелочная функция делит число a на число b
* @param a произвольное число a
* @param b произвольное число b
* @returns {number} возвращает деление чисел a / b
*/
const div = (a, b) => a / b;

/**
* Стрелочная функция умножает два числа a и b
* @param a произвольное число a
* @param b произвольное число b
* @returns {number} возвращает произведение a * b
*/
const mul = (a, b) => a * b;

/**
* Функция складывает два числа a и b
* @param a произвольное число a
* @param b произвольное число b
* @returns {number} возвращает сумму a + b
*/
function add2(a, b) {
    return a + b;
}

/**
* Функция вычитает число а из числа b
* @param a произвольное число a
* @param b произвольное число b
* @returns {number} возвращает вычитаемое a - b
*/
function sub2(a, b) {
    return a - b;
}

/**
* Функция делит число a на число b
* @param a произвольное число a
* @param b произвольное число b
* @returns {number} возвращает деление чисел a / b
*/
function div2(a, b) {
    return a / b;
}

/**
* Функция умножает два числа a и b
* @param a произвольное число a
* @param b произвольное число b
* @returns {number} возвращает произведение a * b
*/
function mul2(a, b) {
    return a * b;
}

// Используется два варианта работы:
// стрелочные функции;
// обычные функции

let a = Number(prompt('Введите число a: '));
let b = Number(prompt('Введите число b: '));

alert('Используем для работы стрелочные функции.')
alert(add(a, b));
alert(sub(a, b));
alert(div(a, b));
alert(mul(a, b));

alert('Используем для работы обычное объявление функции.');
alert(add2(a, b));
alert(sub2(a, b));
alert(div2(a, b));
alert(mul2(a, b));