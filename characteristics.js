function calculdateFunc(array, koef) {
    for (let i = 0; i < x.length ; i++) {
        arrY.push((array[i]-koef)*(1+Math.cos(Math.PI*koef/2)));
    };
    return arrY;
};

function calculationSecond(array, koef) {
    for (let i = 0; i < x.length ; i++) {
        arrY.push(koef + array[i]*(1 + Math.exp(-koef)));
    };
    return arrY;
};
let a = 0;
let b = 0;
var x = [0, 1, 2];
var arrY = [];
const new_data = (trace) => Object.assign(trace, {y: calculdateFunc(x, a)});
const new_second_data = (trace) => Object.assign(trace, {y: calculationSecond(x, b)});
let i = 0;
var data = [
	{mode:'lines', line: {color: "#b55400"}},
	// {mode: 'lines', line: {color: "#393e46"}}
].map(new_data);

var dataSecond = [
	{mode:'lines', line: {color: "#c55401"}},
].map(new_second_data);

Plotly.react('secondDivGraph', dataSecond, layout1);

var layout1 = {
	title: 'Characteristics when t₀=0: t = (x-x₀)*(1+cos(πx₀/2) || x₀∈(0,1)',
	uirevision:'false',
	xaxis: {
        autorange: false,
        dtick: 0.5,
        ticklen: 3,
        gridwidth: 0.5,
    },
	yaxis: {autorange: false}
};

var layout2 = {
	title: 'Characteristics when x₀=0: t = t₀+(1+exp(-t₀)) || t₀∈(0,1) ',
	uirevision:'false',
	xaxis: {
        autorange: false,
        dtick: 0.5,
        ticklen: 3,
        gridwidth: 0.5,
    },
	yaxis: {autorange: false}
};

Plotly.react('graphDivCharacteristics', data, layout1);

var myPlot = document.getElementById('graphDivCharacteristics');

var cnt = 0;
data.pop();
dataSecond.pop();
var interval = setInterval(function() {
	layout1.xaxis.autorange = true;
	layout1.yaxis.autorange = false;
        arrY = [];
        dataSecond.push({
            x: [0, 1, 2, 3, 4, 5, 6],
            y: calculdateFunc(x ,a + 1/10)
        });
    a = a + 0.1;
    Plotly.react('graphDivCharacteristics', dataSecond, layout1);
    if (a > 1) clearInterval(interval);
	if(cnt === 100) clearInterval(interval);
    arrY = [];
}, 500);


var interval1 = setInterval(function() {
	layout2.xaxis.autorange = true;
	layout2.yaxis.autorange = false;
        arrY = [];
        data.push({
            x: [0, 1, 2, 3, 4, 5, 6],
            y: calculationSecond(x ,b + 1/10)
        });
    b = b + 0.1;
    Plotly.react('secondDivGraph', data, layout2);
    console.log(b);
    if (b > 1) clearInterval(interval1);
	if(cnt === 100) clearInterval(interval1);
    arrY = [];
}, 500);