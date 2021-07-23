const {spawn} = require('child_process');

module.exports = function (jsonForm){
  var qst = jsonForm.questions;
  // spawn new child process to call the python script
  // TODO:
  // Tu prawdopodobnie należy mieć wyświetlone jakieś "konwersja tex trwa"
  // I żeby jeszcze było, że reszta kodu czeka na spawny wszystkie... albo zrobić jeden spawn?
  for(var i in qst){
    const python = spawn('python', ['tex2png.py', qst[i].text, i]);
  }
  return "hasa sobie?"
}
