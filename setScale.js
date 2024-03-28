import { tau, h } from "./calculation";

export const inputDuration = document.querySelector("#duration");
// export const inputTau = document.querySelector("#set-t");
// export const inputH = document.querySelector("#set-h");
export const setButton = document.querySelector("#set-btn");

export function setMap() {
    const countX = 100; // 100
    const countT = 300; // 40
    const arrX = [];
    const arrT = [];
    const scaleX = [];
    const scaleT = [];
    const leftBorder = 0;
    const rightBorder = 1;
    for (let i = 0; i < countX; i++) {
        arrX.push(Math.cos((Math.PI*i*h)/2));
        scaleX.push(i*h);
    };
    for (let i = 0; i < countT; i++) {
        arrT.push(Math.exp(-i*tau));
        scaleT.push(i*tau);
    };
    return {
        initialCondition: arrX, 
        bordrCondition: arrT,
        setScaleOnX: scaleX,
        setScaleOnT: scaleT,
        countX: countX,
        countT: countT,
        leftBorder: leftBorder,
        rightBorder: rightBorder
    };
};

export function changeMap() {
    const tau = 5 / (inputDuration.value - 1);
    const arrX = [];
    const arrT = [];
    const scaleX = [];
    const scaleT = [];
    for (let i = 0; i < 100; i++) {
        arrX.push(Math.cos((Math.PI*i*h)/2));
        scaleX.push(i*h);
    };
    for (let i = 0; i < inputDuration.value; i++) {
        arrT.push(Math.exp(-i*tau));
        scaleT.push(i*tau);
    };
    return {
        initialCondition: arrX, 
        bordrCondition: arrT,
        setScaleOnX: scaleX,
        setScaleOnT: scaleT,
    };
};

setMap();
