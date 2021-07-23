const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 3000


  app.get('/tex2png', (req, res) => {
    console.log(req.query);
    var json= JSON.parse(req.query.encoded);
    console.log(json);
    var qst = json.questions;
    var dataToSend;
    // spawn new child process to call the python script
    for(var i in qst){
      const python = spawn('python', ['tex2png.py', qst[i].text, i]);
      // collect data from script
      python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
      });
      // in close event we are sure that stream from child process is closed
      python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
      //  res.send(dataToSend)
      });
    }
    //res.type('json');
    //res.send({"cos": "some"});
    res.status=200;
  })
app.listen(port);



//dobra. teraz nie chce się wogóle włączyć bez odpalenia w przeglądarce.. co nie jest takie złe, bo można tam coś machnąć i wypisać...
// no i trzeba będzie ogarnąć wyłączanie serwera po robocie
