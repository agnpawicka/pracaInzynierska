function convert(text) {
  output = document.getElementById('output');
  output.innerHTML = '';
  MathJax.texReset();
  var options = MathJax.getMetricsFor(output);
  options.display = true
  MathJax.tex2svgPromise(text, options).then(function (node) {
    alert(node);
    output.appendChild(node);
    MathJax.startup.document.clear();
    MathJax.startup.document.updateDocument();
  }).catch(function (err) {
    output.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message));
  }).then(function () {
    button.disabled = false;
  });
}
