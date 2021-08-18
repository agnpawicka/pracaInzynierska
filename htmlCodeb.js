var selectedForm='';

function changeLocation(newLocation) {
  window.location.assign(newLocation);
}
function makeHttpRequest(Url, callback){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", Url, true );
  xmlHttp.send();
  xmlHttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
     // TODO: to jest miejsce, gdzie trzeba ogarnąć co zrobić z wynikiem :)
     console.log("dotarło");
     callback();
   }
 }
     //alert(xmlHttp.responseText);
      //changeLocation(xmlHttp.responseText);
}
function getInfo(action){
  if(selectedForm==''){
    alert("no form selected");
  }
  else{
    makeHttpRequest("http://localhost:3000/getInfo?formId="+selectedForm +"&action="+type,  function(){console.log("hura!");})
  } // TODO: niektore requesty będą wymagały reloadu albo recznego dodania do pliczku
}

function getFile() {

  const files = document.querySelector('input').files;
  console.log("Wgrano " + files[files.length-1].name);
  const file = files[files.length-1];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
     const readFile = reader.result;

     try{
       let json = JSON.parse(readFile);
       console.log(json);
       //console.log("http://localhost:3000/uploadJsonFile?"+readFile);
       //changeLocation("http://localhost:3000/uploadJsonFile?"+readFile)

       const Url ="http://localhost:3000/uploadJsonFile?encoded="+JSON.stringify(json)
       console.log("encoded="+JSON.stringify(json));
       makeHttpRequest(Url, function () { makeHttpRequest("http://localhost:3000/createForm?", function(){console.log("tadam");})})

    }catch(error){
       alert("Uploaded file have wrong format");
    }
  };

  reader.onerror = function() {
     alert(reader.error);
  };
}

function generateList(){
    var skillList="";
    for(var i in memory.forms)
    {
      if(i==0) skillList += "<a class='list-group-item list-group-item-action active' >" + memory.forms[i].id +"</a>";
      else skillList += "<a class='list-group-item list-group-item-action ' >" + memory.forms[i].id +"</a>";
    }
	  document.getElementById("list").innerHTML = skillList;



}
