/*
 Plik ma zawierać funkcje dla HTML i
 komunikować się z zewnętrznymi funkcjami,
*/

function changeLocation(newLocation) {
  window.location.assign(newLocation);
}

function getFile() {
  alert("odwołało się do getFile")
  validator=require('jsonValidator.js');
  validator.validate(file); // TODO: w tym miejscu chcemy wiedziec co ma byc argumentem
  //tu chyba tworzymy obrazki z mathjaxa
  // TODO: komunikacja z gs

}
