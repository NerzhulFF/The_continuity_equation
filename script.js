import {calculateAll} from "./calculation";
import { setMap, setButton, inputDuration, inputTau, inputH, changeMap } from "./setScale";

let URL = 'https://raw.githubusercontent.com/NerzhulFF/forGettingCSVfile/main/newEST.csv';
const submitBtn = document.querySelector("#commit-btn");
const inputURL = document.querySelector("#input-url");
const instructionBtn = document.querySelector("#instruction-btn");
const show = document.querySelector('.reveal');
let csvContent = "data:text/csv;charset=utf-8,";

export function downloadFunc(y) {
  y.forEach( (rowArray, index) => {
    let StingOfIndex = index.toString() + ',';
    csvContent += StingOfIndex;
  });
  
  y.forEach( (rowArray, index) => {
    let row = index.toString() + ',' + rowArray[1].join(',');
    csvContent += row + "\r\n";
  });

  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_data.csv");
  document.body.appendChild(link); 
};

submitBtn.addEventListener('click', e => {
  e.preventDefault();
  buildCSV(inputURL.value)
});

function buildCSV(URL) {
  d3.csv(URL , function(err, rows){
    function unpack(rows, key) {
      return rows.map(function(row) { return row[key]; });
    };
    
    var z_data=[ ];
    for(let i = 0; i < setMap().countT; i++) {
      z_data.push(unpack(rows,i));
    };
    
    var data = [{
               z: z_data,
               type: 'surface'
            }];
    
    var layout = {
      title: 'Solution u=u(x,t) in 3D',
      autosize: false,
      width: 500,
      height: 500,
      scene: {
        xaxis:{title: 'time, t'},
        yaxis:{title: 'x'},
        zaxis:{title: 'u(x,t)'},
        },
      margin: {
        l: 65,
        r: 50,
        b: 65,
        t: 90,
      }
    };
    Plotly.newPlot('myDiv', data, layout);
    });
};

buildCSV(URL);

setButton.addEventListener('click', e => {
  e.preventDefault();
  if ((inputDuration.value == '') || (inputDuration.value == 0)) {
      alert('Something went wrong \n It is might be: \n 1.1 One of the parameters are 0 \n 1.2 One of the parameters are 0')
  } else {
      changeMap();
      alert('Your file started to download');
      var newY = calculateAll(inputDuration.value, setMap);
      downloadFunc(newY)
  };
});

instructionBtn.addEventListener('click', () => {
  show.classList.toggle('reveal');
});

document.body.addEventListener('click', e => {
  if (e.target.matches(".container-module") || e.target.matches("#close-btn")) {
    show.classList.toggle('reveal');
  };
});