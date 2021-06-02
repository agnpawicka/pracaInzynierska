// TODO: briwserify się czepia spawn

const { spawn } = require('child_process');
const proc = spawn('python', ['tex2png.py', 'tex.tex', 'qst1.png']);
proc.stdout.on('data', function(data) {
  console.log(`stdout: ${data}`);
});
proc.stderr.on('data', function(data) {
  console.error(`stderr: ${data}`);
});

proc.stderr.on('close', function(data) {
  console.log("zakończyło się");
});
