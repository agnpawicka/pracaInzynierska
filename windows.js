/*
 Plik ma zawierać funkcje dla HTML i
 komunikować się z zewnętrznymi funkcjami,
*/


//https://bartsolutions.github.io/2019/12/27/use-npm-in-browser-js/ - jak browserify

function changeLocation(newLocation) {
  window.location.assign(newLocation);
}

function getFile() {

  const files = document.querySelector('input').files;
  alert("Wgrano " + files[0].name);
  const file = files[0];


  const validator = require('./jsonValidator.js');
  let reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function() {
     const valid = validator(JSON.parse(reader.result));
     alert("valid "+valid);
     // TODO: tu chyba tworzymy obrazki z mathjaxa
     // TODO: komunikacja z gs


  };

  reader.onerror = function() {
     alert(reader.error);
  };
}
global.window.getfile = getFile;
