const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 3000
var cors = require('cors');
app.use(cors());
var jsonForm

app.get('/uploadJsonFile', (req, res) =>{
  jsonForm = JSON.parse(req.query.encoded)
  console.log(jsonForm);

  //JSON validation:
  const valid = require('./jsonValidator.js')(jsonForm);
  var data='';
  if(valid){
    console.log("Poprawny JSON :)");

    console.log(require('./tex2png.js')(jsonForm));
    // TODO: wypadałoby móc przejrzeć zdjecia?  przed wrzuceniem.
    // TODO: zwrot odpowiedniej rzeczy: Ale wszystko siedzi w localhost, więc chyba wystarczy powiedziec 'obejrzyj zdjecia" i zatwierdz
  }
  else{
    // TODO: ładna odpowiedz, dlaczego nie przyjmujemy takiego formatu :)
    //data = ":("
  }
  req.on('error', error => {
    console.error(error)
  })

  res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: 'Hello World!'
    }));
//  req.write(data)
//  req.end();

})

app.get('/createForm', (req, res) =>{
  //TODO przekazać zdjęcia
  const fs = require('fs');
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
//  const encodedForm = require('query-string').stringify({"encoded": JSON.stringify(jsonForm)});
console.log(encodedForm);
  var data = '';
  const options = {
    hostname: 'script.google.com',
    path: '/macros/s/AKfycbxOJXEmayqgV858S6JfPJycVryYmkkpGqlvG_MM88rKRfy_C1Kt9JHD9h3eAmpCZX1wPA/exec',//+encodedForm,
    method: 'POST',
    headers: {
     //'Content-Type': 'application/json',
     'Content-Type' : 'application/json',
     'Content-Length': Buffer.from(encodedForm).length,
     'Accept': '*/*'
   }
  }
  console.log("REQUEST   :   "+ options.hostname+options.path);
  // TODO: ogarnąć kwestię "301 moved permanently" -> trzeba obsługę błędu zrobić
  var https = require('https');
  const request = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      var redirect = res.headers.location;
      res.on('data', d => {
        console.log(redirect); // TODO: pliczek!
      })
  })
  request.on('error', error => {
    console.error("error:" + error)
  })

  request.write(encodedForm)
  request.end()
})

app.get('/getInfo', (req, res) =>{
  var encodedRequest ="formId="+req.query.formId+"&action="+req.query.action;
  // TODO: w odpowiednich akcjach trzeba do pliczku
  var data = '';
  const options = {
    hostname: 'script.google.com',
    path: '/macros/s/AKfycbxOJXEmayqgV858S6JfPJycVryYmkkpGqlvG_MM88rKRfy_C1Kt9JHD9h3eAmpCZX1wPA/exec?'+encodedRequest,
    method: 'GET'
  }
  console.log("REQUEST   :   "+ options.hostname+options.path);
  // TODO: ogarnąć kwestię "301 moved permanently" -> trzeba obsługę błędu zrobić
  var https = require('https');
  const request = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('data', d => {
        console.log(d);
      })
  })
  request.on('error', error => {
    console.error("error:" + error)
  })

  request.write()
  request.end();

})



app.listen(port);
