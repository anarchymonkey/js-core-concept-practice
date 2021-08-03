// CLOSURES



/* find the result of sum(1)(2)(3)...(N) */
const sumOfN = (num1) => {
    return (num2) => num2 ? sumOfN(num2 + num1) : num1; 
}

const result = sumOfN(1)(2)(3)(4)();
console.log('result', result);