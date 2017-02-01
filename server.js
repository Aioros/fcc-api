var express = require('express');
var app = express();

app.get('/', express.static(__dirname));

app.get('/:input', function (req, res) {
  
  var input = req.params["input"];
  var date = null;
  var result = { unix: null, natural: null };
  
  if (input.match(/^\d{10}$/)) {
    date = new Date(parseInt(input) * 1000);
  } else if (input.match(/^\w{3,} \d{1,2}, \d{2,4}$/)) {
    date = new Date(input);
  }
  
  if (date) {
    result.unix = Math.floor(date.getTime() / 1000);
    result.natural = date.toLocaleString("en-en", { month: "long", day: "2-digit", year: "numeric" });
  }
  
  res.send(result);
  
});

app.listen(8080, function () {
  console.log('App listening on port 8080');
})