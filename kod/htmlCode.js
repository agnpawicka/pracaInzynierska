var selectedForm='';

function changeLocation(newLocation) {
  window.location.assign(newLocation);
}
function makeHttpRequest(Url, callback){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", Url, true );
  xmlHttp.send();
  xmlHttp.onreadystatechange = function() {
     if (this.readyState == 4){
        document.getElementById('response').innerHTML = this.response;
        if(this.status == 200) {
           callback();

           document.getElementById('response').innerHTML = this.response;
        }

 }}
     //alert(xmlHttp.responseText);
      //changeLocation(xmlHttp.responseText);
}
function getInfo(action){
  console.log(action );
  if(selectedForm==''){
    alert("no form selected");
  }
  else{
    makeHttpRequest("http://localhost:3000/getInfo?formId="+selectedForm +"&action="+action,  function(){console.log("hura!");})
  } 
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

       const Url ="http://localhost:3000/uploadJsonFile?encoded="+JSON.stringify(json)
       console.log("encoded="+JSON.stringify(json));
       makeHttpRequest(Url, function () { makeHttpRequest("http://localhost:3000/createForm?", generateList)})

    }catch(error){
       alert("Uploaded file have wrong format");
    }
  };

  reader.onerror = function() {
     alert(reader.error);
  };
}

function assign(id){
    selectedForm=id;
    console.log(selectedForm+ " selected");
}

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

    document.getElementById("list").addEventListener("click", e => {
        var el = document.querySelector('.active');
        if(el) {
          el.classList.remove('active');
        }
        e.target.classList.add('active');
    });


}
