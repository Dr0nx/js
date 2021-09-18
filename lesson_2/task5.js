'use script';

/**
 * Стрелочная функция mathOperation производит один из четырех операндов '+', '-', '/' или '*'
 * и возвращает его результат. Также возможен вариант 'Операция не определена', если нет
 * совпадения с четырьмя операндами
 * @param arg1 произвольное число arg1
 * @param arg2 произвольное число arg2
 * @param operation строка '+', '-', '/' или '*' в operation
 * @returns {string|number} возвращает соответствущий результат - число или строку с сообщением
 */
const mathOperation = (arg1, arg2, operation) => {
    switch(operation){
        case '+':
            return arg1 + arg2;
        case '-':
            return arg1 - arg2;
        case '/':
            return arg1 / arg2;
        case '*':
            return arg1 * arg2;
        default:
            return 'Операция не определена';
    }
}

/**
 * Функция mathOperation2 производит один из четырех операндов '+', '-', '/' или '*'
 * и возвращает его результат. Также возможен вариант 'Операция не определена', если нет
 * совпадения с четырьмя операндами
 * @param arg1 произвольное число arg1
 * @param arg2 произвольное число arg2
 * @param operation строка '+', '-', '/' или '*' в operation
 * @returns {string|number} возвращает соответствущий результат - число или строку с сообщением
 */
function mathOperation2(arg1, arg2, operation) {
    switch(operation){
        case '+':
            return arg1 + arg2;
        case '-':
            return arg1 - arg2;
        case '/':
            return arg1 / arg2;
        case '*':
            return arg1 * arg2;
        default:
            return 'Операция не определена';
    }
}

// Используется два варианта работы:
// стрелочные функции;
// обычные функции

let arg1 = Number(prompt('Введите число arg1: '));
let arg2 = Number(prompt('Введите число arg2: '));
let operation = prompt('Введите название операции (+, -, /, *): ');

alert(`Arrow function: строка с названием операции \
${operation} и ее значение ${mathOperation(arg1, arg2, operation)}.`);
alert(`Function declaration: строка с названием операции \
${operation} и ее значение ${mathOperation2(arg1, arg2, operation)}.`);
