function changeLocation(newLocation) {
  window.location.assign(newLocation);
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
       var xmlHttp = new XMLHttpRequest();
       xmlHttp.open( "GET", Url, true );
       xmlHttp.send();
       xmlHttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
          // TODO: to jest miejsce, gdzie trzeba ogarnąć co zrobić z wynikiem :)
          alert(xmlHttp.responseText);
           //changeLocation(xmlHttp.responseText);
          }
       }
    }catch(error){
       alert("Uploaded file have wrong format");
    }
  };

  reader.onerror = function() {
     alert(reader.error);
  };
}
