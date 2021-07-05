/*
 Plik ma zawierać funkcje dla HTML i
 komunikować się z zewnętrznymi funkcjami,
*/


//https://bartsolutions.github.io/2019/12/27/use-npm-in-browser-js/ - jak browserify

function changeLocation(newLocation) {
  window.location.assign(newLocation);
}

function sendToGoogle(communication, encodedForm){
  return (() => {
    communication.toGoogle(encodedForm, changeLocation);
  })
}

function getFile() {

  const files = document.querySelector('input').files;
  console.log("Wgrano " + files[files.length-1].name);
  const file = files[files.length-1];


  const validator = require('./jsonValidator.js');

  let reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function() {
     const readFile = reader.result;
     const json = JSON.parse(readFile);
     const valid = validator(json);
     //console.log("valid "+valid);
     if(valid == true){
        //todo pictures from tex, upload somewhere
        const communication = require('./communication.js');
        var encodedForm =require('query-string').stringify({"encoded": readFile});
        console.log(encodedForm);
        //communication.toPython(encodedForm, sendToGoogle(communication, encodedForm));
        changeLocation("http://localhost:3000/tex2png?"+encodedForm)
     }
     else {
       alert("Zły format JSONa")
     }

  };

  reader.onerror = function() {
     alert(reader.error);
  };
}
global.window.getfile = getFile;
