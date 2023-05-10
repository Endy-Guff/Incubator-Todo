// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
    let result = 0
    nums.forEach(i=>result+=i)

    // В return стоит "заглушка", чтоб typescript не ругался
    return result
}

// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number,b: number,c: number): string {
    let result = '11'
    if (a===b&&b===c&&a===c){
        result = '10'
    }  else if (a+b<c||b+c<a||a+c<b){
        result = '00'
    } else if (a===b||b===c||a===c){
        result = '01'
    }
    // В return стоит "заглушка", чтоб typescript не ругался
    return result
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number{
    let result = 0
    Array.from(String(number), Number).forEach(i=>result+=i)
    // В return стоит "заглушка", чтоб typescript не ругался
    return result
}


// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    let sumArr1 = 0;
    let sumArr2 = 0;
    arr.forEach((el, i)=>i%2===0?sumArr1+=el:sumArr2+=el)
    // В return стоит "заглушка", чтоб typescript не ругался
    return sumArr1 > sumArr2
}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.


export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
    // В return стоит "заглушка", чтоб typescript не ругался
    return array.filter(el=>el>0&&Number.isInteger(el)).map(el=>el*el)
}

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
    let result = 0
    for (let i = 0; i <= N; i++){
        result += i
    }
    // В return стоит "заглушка", чтоб typescript не ругался
    return result
}

// ...и "лапку" вверх!!!!

// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено


export function getBanknoteList(amountOfMoney: number): Array<number> {
    const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
    let result = []
    for (let i = 0; i<banknotes.length;i++){
        while(amountOfMoney-banknotes[i]>=0){
            amountOfMoney-=banknotes[i]
            result.push(banknotes[i])
        }
    }
    // В return стоит "заглушка", чтоб typescript не ругался
    return result
}

