module.exports = {
  toGoogle: function (encodedForm, callback)
  {
    const Url ="https://script.google.com/macros/s/AKfycbxOJXEmayqgV858S6JfPJycVryYmkkpGqlvG_MM88rKRfy_C1Kt9JHD9h3eAmpCZX1wPA/exec"
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", Url+"?"+encodedForm, true );
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(xmlHttp.responseText);
      }
   }
 },
  toPython: function (encodedForm, callback)
  {
      const Url ="http://localhost:3000/tex2png"
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", Url+"?"+encodedForm, true );
      xmlHttp.send();
      xmlHttp.onreadystatechange = function() { // tu się coś nie odzywa. po prostu. może zamiast xml requesta powinno się zrobić coś innego i odpalać z przeglądarki
        console.log("ready state change");
        if (this.readyState == 4 && this.status == 200) {
          console.log("done:)");
          callback();
      }
    }
  }
}
