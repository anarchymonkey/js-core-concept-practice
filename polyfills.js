/*
    Write polyfills for:

        1. Array.map
        2. Array.filter
        3. Array.reduce
        4. call, apply, bind
        5. debounce
*/

const DUMMMY_ARRAY = [1, 2, 3, 4, 5, 6];

const isEmpty = (arr) => {
    if(!(arr.length > 0) || arr === null || arr === undefined) {
        return true;
    }
    return false;
};

// ARRAY MAP



// Real implementation of array map

const mappedArray = DUMMMY_ARRAY.map((element, index) => {
    return element * (index + 1);
});

// Polyfill for array .map

Array.prototype.myOwnMap = function (customMapperFunction) {
    const inputArray = this;
    if(isEmpty(inputArray)) {
        return inputArray;
    }

    let resultArray = [];
    for(let i = 0; i < inputArray.length; i++) {
        resultArray.push(customMapperFunction(inputArray[i], i, inputArray));
    }
    return resultArray;
}


const customMappedArray = DUMMMY_ARRAY.myOwnMap((val, index) =>{
    return val * (index + 1);
});

console.log("Inbuilt array map resp \n", mappedArray);
console.log("Custom array map resp \n", customMappedArray);



// ARRAY FILTER



// REAL IMPLEMENTATION OF ARRAY FILTER

const filteredArray = DUMMMY_ARRAY.filter((val, index) => {
    return val % 2 === 0;
});


// CUSTOM IMPLEMENTATION OF ARRAY FILTER


Array.prototype.myCustomFilter = function(customFilterFunction) {
    const inputArray = this;

    if(isEmpty(inputArray)) {
        return inputArray;
    }
    const resultArray = [];
    for(let i = 0; i < inputArray.length; i++) {
        if(customFilterFunction(inputArray[i], i, inputArray)) {
            resultArray.push(inputArray[i]);
        }
    }
    return resultArray;
};
const customFilteredArray = DUMMMY_ARRAY.myCustomFilter((val, index) => {
    return val % 2 === 0;
});





console.log("Inbuilt array filter resp \n", filteredArray);
console.log("Custom array filter resp \n", customFilteredArray);



// ARRAY REDUCE



// REAL IMPLEMENTATION OF ARRAY REDUCE

const reducedArray = DUMMMY_ARRAY.reduce((accumulator, curr) => {
    accumulator.push(curr * 2);
    return accumulator;
}, []);


// CUSTOM IMPLEMENTATION OF ARRAY REDUCE


Array.prototype.myCustomReducer = function(customReducerFunction, initializer) {
    const inputArray = this;
    if(isEmpty(inputArray)) {
        return inputArray;
    }
    try {
        for(let i = 0; i < inputArray.length; i++) {
            customReducerFunction(initializer, inputArray[i], i, inputArray);
        }
        return initializer;
    } catch(err) {
        console.error('This error occured', err);
        return new Error(err);
    }
};

const customReducedArray = DUMMMY_ARRAY.myCustomReducer((accumulator, curr, index) => {
    accumulator.push(curr * 2);
    return accumulator;
}, []);


console.log("Inbuilt array reducer resp \n", reducedArray);
console.log("Custom array reducer resp \n", customReducedArray);


// CALL, APPLY, BIND POLYFILL