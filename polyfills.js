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


// DBOUNCE POLYFILL

// debounce takes a function and a delay after which the function should be triggered
// if someone performs an action before the delay time has occoured, it will again start the timer from scratch
// i.e if there is a delay of 1000ms and somebody performs the event before 1000ms then the counter will again start from 0ms and go till 1000ms
// thus executing the function after the context time has expired

const debounce = (func, delay) => {
    let timer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        setTimeout(() => func.apply(context, args), delay);
    }
}

const print = () => console.log('Print this');
debounce(print, 0)();



// CALL APPLY BIND

/* 

BIND

*/


const dummyObject = {
    firstName: 'Aniket',
    lastName: 'Batabyal',
}


const trialFunction = function (val, dum) {
    console.log(this.firstName + this.lastName, val, dum);
}

const normalBindFunction = trialFunction.bind(dummyObject);


Function.prototype.myCustomBind = function (context, args) {
    // get the parent function
    const parentFunction = this;
    // return a function which applies the arguments as context & adds extra arguments
    return function(dummy) {
        // return the function cause it can do something
        return parentFunction.call(context, dummy, args);
    }
}


trialFunction.bind(dummyObject)('bindFunction');
trialFunction.myCustomBind(dummyObject, "1234")('customBindFunction');


/* 

Call

*/

const trialFunctionForCall = function (...args) {
    console.log(this.firstName + this.lastName, 'arguments', args);
}

Function.prototype.myCustomCall = function(context, ...parentArgs) {
    const parentFunction = this;

    const res = function (...otherArgs) {
        parentFunction.apply(context, [...parentArgs, ...otherArgs])
    }

    res();
}

trialFunctionForCall.call(dummyObject, "Hey Mama");
trialFunctionForCall.myCustomCall(dummyObject, "Hey Mama", "123142");

// trialFunction.myCustomBind(dummyObject, "1234")('customBindFunction');



// write a function which transforms these two objects into the below object


const removeDuplicates = (input1, input2, res = {}) => {

    Object.keys(input1).forEach((firstKey) => {
        
    });
};



const main = () => {
    
    const input1 = {
        a: 'a1',
        b: 'b2',
        g: {
            a: 'q',
            c: {
                c1: 'c1',
                c2: 'c2',
            },
        },
        d: 'd1',
        f: 'f1',
    };
    
    const input2 = {
        a: 'a1',
        g: {
            a: 'p',
            c: {
                c1: 'c1',
                c2: 'c2',
                c3: 'c3',
            },
        },
        d: 'd2',
    };
    
    const output = {
        b: 'b2',
        g: {
            a: 'q',
            c: {
                c3: 'c3',
            },
        },
        d: 'd1',
        f: 'f1',
    };

    
    const res = removeDuplicates(input1, input2);
    console.log('The result is', res);
}

main();


