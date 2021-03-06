// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:date_string?', function(req, res) {
  var strDate = req.params.date_string;
  var date = new Date(strDate);  
  
  if(strDate != undefined && strDate.indexOf("-") == -1) { // if not a string date
    date = new Date(parseInt(strDate));
  }  else if (!strDate) {                                  // if there is nothing written
    date = new Date();
  }
  
  if(date != "Invalid Date") {                             // if it's a valid date
    res.json({"unix": date.getTime(), "utc": date.toUTCString()})
  } else if(strDate != undefined && strDate.length > 0) {  // if there is something but it's not a date
    res.json({"error" : "Invalid Date" })
  } 
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


console.log("Hello");