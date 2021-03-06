/* Plik zawiera funkcje wykorzystywane do obsługi elementów interfejsu.
* selectedForm - wartość tekstowa, zawiera identyfikator obecnie
  wybranego (w interfejsie zaznaczonego na niebiesko) formularza.
*/

var selectedForm='';

function changeLocation(newLocation) {
  window.location.assign(newLocation);
}


/*Metoda makeHttpRequest służy do komunikacji pomiędzy interfejsem a serwerem
 lokalnym.
 * Url - adres URL, do którego jest odwołanie
 * callback - metoda do wywołania po otrzymaniu odpowiedzi o statusie
   200 z serwera
 */
function makeHttpRequest(Url, method, data, callback){ //TODO że get/post i że data jakaś
  var xmlHttp = new XMLHttpRequest();
  let response = "";
  xmlHttp.open( method, Url, true );
  if(method=="POST") xmlHttp.setRequestHeader("Content-Type", 'application/json');
  xmlHttp.send(data);
  xmlHttp.onreadystatechange = function() {
     if (this.readyState == 4){
        //Obsługiwane są również odpowiedzi ze stasusem innym niż 200:
        response = this.response
        document.getElementById('response').innerHTML = this.response;
        if(this.status == 200) {
           callback();
           document.getElementById('response').innerHTML = response;
        }
      }
    }
}


/*Metoda getInfo - wywołuje metodę makeHttpRequest z odpowiednimi argumentami
 (identyfikator formularza i informacja, który przycisk został wciśnięty) dla
 akcji z przycisków.
 * action - informacja, który przycisk jest właśnie obsługiwany.
*/
function getInfo(action){
  console.log(action );
  if(selectedForm==''){
    alert("no form selected");
  }
  else{
    makeHttpRequest("http://localhost:3000/getInfo?formId="+selectedForm +"&action="+action, "GET", "",  function(){console.log("request resolved");})
  }
}


/*Metoda getFile odpowiada za przechwytywanie wgranego pliku oraz obsługę
  przycisku generateForm.
*/
function getFile() {
  //Wyłuskanie pliku:
  const files = document.querySelector('input').files;
  const file = files[files.length-1];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
     const readFile = reader.result;
     try{
       //Sprawdzenie, czy wgrany plik zawiera dane w formacie JSON:
       let json = JSON.parse(readFile);

       //Przekazanie pliku do serwera:
       const Url ="http://localhost:3000/uploadJsonFile" 
       makeHttpRequest(Url, "POST", JSON.stringify(json),  function (){   makeHttpRequest("http://localhost:3000/createForm?", "GET", "",  generateList)});

    }catch(error){
       alert("Uploaded file have wrong format");
    }
  };

  reader.onerror = function() {
     alert(reader.error);
  };
}


/*Metoda pomocnicza do listy formularzy
*/
function assign(id){
    selectedForm=id;
    console.log(selectedForm+ " selected");
}


/*Metoda generateList ładuje zawartość listy formularzy i zapewnia odpowiednie
  jej zachowanie. Uruchamia przy odświeżaniu strony.
*/
function generateList(){
    var skillList="";
    for(var i in memory.forms)
    {
      if(i==0){
        assign(memory.forms[0].id);
        skillList += "<a class='list-group-item list-group-item-action active' onclick='assign("+JSON.stringify(memory.forms[i].id)+")' >" + memory.forms[i].name + " "+ memory.forms[i].date +"</a>";
      }
      else skillList += "<a class='list-group-item list-group-item-action' onclick='assign("+JSON.stringify(memory.forms[i].id)+")' >" + memory.forms[i].name + " "+ memory.forms[i].date +"</a>";
    }
	  document.getElementById("list").innerHTML = skillList;

    //Zapewnienie kolorystyki (niebieski wyłącznie ostatnio wybrany).
    document.getElementById("list").addEventListener("click", e => {
        var el = document.querySelector('.active');
        if(el) {
          el.classList.remove('active');
        }
        e.target.classList.add('active');
    });
}
