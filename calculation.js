import { setMap } from "./setScale";
// import { downloadFunc } from "./script";

export const h = (setMap().rightBorder - setMap().leftBorder) / (setMap().countX - 1);
export const tau = 5 / (setMap().countT - 1);
const eps = 0.0001;
let result;
let anotherY;
let d;

export let y = calculateAll(setMap().countT, setMap);

function doStuff(argument) {
    return (Math.log(Math.abs(argument + 1)));
};

function doStuffDiff(argument) {
    return 1/(1 + argument);
};

function func(argument, leftBorder, rightBorder, time) {
    return (argument - leftBorder)/(time) + (doStuff(argument) - doStuff(rightBorder))/h;
};

function funcDiff(argument, time) {
    return 1/(time)  + doStuffDiff(argument)/h;
};

function sovleEq(leftBorder, rightBorder, time) {
    result = rightBorder;
    d = eps + 1;
    while (d > eps) {
        anotherY = result;
        result = anotherY - func(anotherY, leftBorder, rightBorder, time) / funcDiff(anotherY, time);
        d = Math.abs( anotherY - result);
    };
    return result;
};

export function calculateAll(duration, func) {
    let y = [];
    y.push([0,[]]);
    for (let i = 0; i < setMap().countX; i++) { 
        y[0][1].push(func().initialCondition[i]);
    };
    
    for (let j = 1; j < duration; j++) {
        y.push([j,[]]);
        for (let i = 0; i < setMap().countX; i++) {
            if (i === 0) {
                y[j][1].push(func().bordrCondition[j]);
            } else {
                    y[j][1].push(sovleEq(y[j][1][i - 1], y[j - 1][1][i], 5/(duration - 1)));
            };
            
        };
    };
    return y;
};

// console.log(newY);
// export default y;
// console.log(y);