const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 3000
const fs = require('fs');
var cors = require('cors');
app.use(cors());
var jsonForm;
var https = require('https');

function makeRequest(options, data) {
  return new Promise((resolve) => {
    console.log("nowy");
    const request = https.request(options, res => {
      console.log("tadadam");
      if(res.statusCode >= 301 && res.statusCode<=308){
        console.log(res.headers.location);
        const newOpt ={
          hostname: 'script.googleusercontent.com',
          path:  res.headers.location.substring(36),
          method: 'GET'
        }
        //console.log(newOpt.hostname+newOpt.path);
        makeRequest(newOpt, "").then((value) => {resolve(value)});
      }
      else if(res.statusCode==200){
        res.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`);
          resolve(chunk);
        });

        }

      else {
        console.log(`statusCode: ${res.statusCode}`);
        resolve (false); //"Błędne odwołanie do serwera google"
      }
    })
    request.on('error', error => {
      console.error("error:" + error)
    })
    request.write(data);
    request.end();

 });

}


app.get('/uploadJsonFile', (req, res) =>{
  jsonForm = JSON.parse(req.query.encoded)
  console.log(jsonForm);

  //JSON validation:
  const valid = require('./jsonValidator.js')(jsonForm);
  var data='';
  if(valid){
    console.log("Poprawny JSON :)");
    res.set('Content-Type', 'text/html')
    res.send(Buffer.from('<p>Validation succeded</p>'))
    console.log(require('./tex2png.js')(jsonForm));
    // TODO: wypadałoby móc przejrzeć zdjecia?  przed wrzuceniem.
    // TODO: zwrot odpowiedniej rzeczy: Ale wszystko siedzi w localhost, więc chyba wystarczy powiedziec 'obejrzyj zdjecia" i zatwierdz
  }
  else{
    res.status(400).set('Content-Type', 'text/html').send(Buffer.from('<p>Wrong JSON format</p>'))

  }
  req.on('error', error => {
    res.status(400).set('Content-Type', 'text/html').send(Buffer.from("Server error " +error));
  })
})



app.get('/createForm', (req, res) =>{

  for(var i in jsonForm.questions){
    if(jsonForm.questions[i].tex){
      try {
        const data = fs.readFileSync('pictures/base64'+i+'.txt', 'utf8')
        jsonForm.questions[i].text = data
      } catch (err) {
        console.error(err)
      }
    }
  }
  const encodedForm = JSON.stringify(jsonForm);
  console.log(encodedForm);
  var data = '';
  const options = {
    hostname: 'script.google.com',
    path: '/macros/s/AKfycbxOJXEmayqgV858S6JfPJycVryYmkkpGqlvG_MM88rKRfy_C1Kt9JHD9h3eAmpCZX1wPA/exec',
    method: 'POST',
    headers: {
     'Content-Type' : 'application/json',
     'Content-Length': Buffer.from(encodedForm).length,
     'Accept': '*/*'
   }
  }
  console.log("REQUEST   :   "+ options.hostname+options.path);
  makeRequest(options, encodedForm).then((newId) => {
    const d = new Date();
    const date =  d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    //console.log(date);
    let newFormData = '{"id":"'+ newId+'", "date": "' +date +'", "name":"'+ jsonForm.title+'"}';
    //console.log(JSON.parse(newFormData));

      let memory = fs.readFileSync('memoryFile.js', 'utf8');
      console.log(memory.substring(27, memory.length-3));
      let mem=JSON.parse(memory.substring(27, memory.length-3));
      console.log(mem);
      mem.forms.push(JSON.parse(newFormData));
      let newMemory = "const memory = JSON.parse('"+JSON.stringify(mem)+"');";
      fs.writeFile('memoryFile.js', Buffer.from(newMemory), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
  }).then(() => {
    res.status(200).set('Content-Type', 'text/html').send(Buffer.from("New form has beed created. Please reload page"));
  })

})



app.get('/getInfo', (req, res) =>{
  var encodedRequest ="formId="+req.query.formId+"&action="+req.query.action;
  console.log("encodedRequest "+encodedRequest);
  const options = {
    hostname: 'script.google.com',
    path: '/macros/s/AKfycbxOJXEmayqgV858S6JfPJycVryYmkkpGqlvG_MM88rKRfy_C1Kt9JHD9h3eAmpCZX1wPA/exec?'+encodedRequest,
    method: 'GET'
  }
  console.log("REQUEST   :   "+ options.hostname+options.path);
  makeRequest(options, "").then((requestedData) =>{
    if(req.query.action=='editorUrl' || req.query.action=='publisherUrl')
    requestedData = '<a href="'+requestedData+'">'+requestedData+'</a>'
    if(req.query.action=='delete'){
      let memory = fs.readFileSync('memoryFile.js', 'utf8');
      console.log(memory.substring(27, memory.length-3));
      let mem=JSON.parse(memory.substring(27, memory.length-3));
      console.log(mem);
      for(var i in mem.forms){
        if( mem.forms[i].id == req.query.formId) delete mem.forms[i];
      }
      mem.forms = mem.forms.filter(function(x) { return x !== null });
      let newMemory = "const memory = JSON.parse('"+JSON.stringify(mem)+"');";
      fs.writeFile('memoryFile.js', Buffer.from(newMemory), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    }
    res.status(200).set('Content-Type', 'text/html').send(Buffer.from(requestedData));

  })

})



app.listen(port);
