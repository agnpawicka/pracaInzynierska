const {spawn} = require('child_process');

module.exports = function (jsonForm){
  return new Promise((resolve) => {
    var qst = jsonForm.questions;
    var done=0;
    for(var i in qst){
      if(qst[i].tex){
        const python = spawn('python', ['tex2png.py', qst[i].text, i]);
        python.on('exit', ()=>{
          done++;
          if(done===qst.length) resolve(true);

        })
      }
      else done++;
  }
  })

}
