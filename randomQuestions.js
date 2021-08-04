/* find the result of sum(1)(2)(3)...(N) */
const sumOfN = (num1) => {
    return (num2) => num2 ? sumOfN(num2 + num1) : num1;
}

const result = sumOfN(1)(2)(3)(4)();
console.log('result', result);


/* given an object, traverse the path */

let dummyObj = {
    "A": {
        "B": {
            "C": {
                "D": "E"
            }
        }
    }
}

const path0 = "";
const path1 = "A.C.D";
const path2 = "A.B.C";
const path3 = "A.B.C.D";

const pathTraverse = (obj, path, index = 0, res = null) => {
    if (!path) {
        return null;
    }
    const paths = path.split('.');

    if (!obj[paths[index]]) {
        return null;
    }

    if (index === (paths.length - 1)) {
        console.log('------>', obj[paths[index]]);
        return obj[paths[index]];
    }

    return pathTraverse(obj[paths[index]], path, index + 1);
}


console.log("Path Traverse", pathTraverse(dummyObj, path3));