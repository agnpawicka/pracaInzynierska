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
  console.log("Wgrano " + files[0].name);
  const file = files[0];


  const validator = require('./jsonValidator.js');
  let reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function() {
     const readFile = reader.result;
     const valid = validator(JSON.parse(readFile));
     console.log("valid "+valid);
     // TODO: tu chyba tworzymy obrazki z mathjaxa
     // TODO: komunikacja z gs
     if(valid == true){
     const communication = require('./communication.js');
     var encodedForm =require('query-string').stringify({"encoded": readFile});
     console.log(encodedForm);
     communication(encodedForm, changeLocation);
   }

  };

  reader.onerror = function() {
     alert(reader.error);
  };
}
global.window.getfile = getFile;
