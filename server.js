const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 3000

app.get('/uploadJsonFile', (req, res) =>{
  const jsonForm = JSON.parse(req.query.encoded)
  console.log(jsonForm);

  //JSON validation:
  const valid = require('./jsonValidator.js')(jsonForm);
  if(valid){
    console.log("Poprawny JSON :)");

    console.log(require('./tex2png.js')(jsonForm));
    // TODO: wypadałoby móc przejrzeć zdjecia?  przed wrzuceniem.
    // TODO: wrzucić zdjecia? albo jakos to ogarnac..

    const encodedForm = require('query-string').stringify({"encoded": JSON.stringify(jsonForm)});
    var data = '';
    const options = {
      hostname: 'script.google.com',
      path: '/macros/s/AKfycbxOJXEmayqgV858S6JfPJycVryYmkkpGqlvG_MM88rKRfy_C1Kt9JHD9h3eAmpCZX1wPA/exec?'+ encodedForm,
      method: 'GET'
    }
    // TODO: ogarnąć kwestię "301 moved permanently" 
    console.log("za opcjami");
    var https = require('http');
    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
        process.stdout.write(d)
        // TODO: d jest wrappem w htmla viewforma naszego nowego :)
      })
    })

    req.on('error', error => {
      console.error(error)
    })

    req.write(data)
    req.end()
    // TODO: zwrot odpowiedniej rzeczy./

  }
  else{
    // TODO: ładna odpowiedz, dlaczego nie przyjmujemy takiego formatu :)
  }


})




app.listen(port);



//dobra. teraz nie chce się wogóle włączyć bez odpalenia w przeglądarce.. co nie jest takie złe, bo można tam coś machnąć i wypisać...
// no i trzeba będzie ogarnąć wyłączanie serwera po robocie
