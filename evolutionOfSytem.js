import { y, calculateAll, tau } from "./calculation";
import { inputDuration, inputTau, inputH, changeMap, setMap } from "./setScale";
let i = 0;
const timer = document.querySelector(".timer");
// const setBtn = document.querySelector("#set-btn");
let data = [];

// setBtn.addEventListener('click', e => {
//   e.preventDefault();
//   let newGraph = calculateAll(inputDuration.value, changeMap);
//   clearInterval(interval);
//   Plotly.deleteTraces(graphDiv, 0);
//   data = [];
//   buildDinamicGraph(newGraph);
// }); 

// let reverse = [];
// for (let i = 0; i<300; i++) {
//   reverse.push(y[i][1][0]);
// };
// console.log(reverse);
//y[i][1]

function buildDinamicGraph(y) {
  i = 0;
  let new_data = (trace) => Object.assign(trace, {y: y[i][1]});
  data = [
    {mode:'lines', line: {color: "#111"}}
  ].map(new_data);
  
  var layout = {
    title: 'User Zoom Persists<br>When uirevision Unchanged',
    uirevision:'true',
    xaxis: {autorange: true},
    yaxis: {autorange: true}
  };
  
  Plotly.react(graphDiv, data, layout);
  
  var interval = setInterval(function() {
  
    if (y[i] == undefined) {
      clearInterval(interval);
      return;    
    };
    timer.innerHTML = 't = ' + Math.floor((i/20)) + ' sec';
  
    data = data.map(new_data);
    i++;
    layout.xaxis.autorange = true;
    layout.yaxis.autorange = false;
    
    Plotly.react(graphDiv, data, layout);

    return interval;
  }, 50);

  return interval;
};

var interval = buildDinamicGraph(y);
