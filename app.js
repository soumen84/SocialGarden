var express = require("express"),
app = express(),
cors = require('cors'),
bodyParser = require('body-parser'),
exec = require('child_process').exec,
request = require('request');
app.use(cors());

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get("/test",function(req,res){
	res.send("Test success");
})
app.post('/getFbFeed', function(req, res) {
	console.log(req.body);
// Sending request to fb api using the request modules of node, the fb feed url is coming from
// the frontend as a request parameter.
if(req.body.method === 'post') {
	exec('curl -X POST ' + req.body.url, function(error, stdout, stderr) {
		if(stdout) {
			res.send(stdout);
		} else {
			res.send({error: error || stderr});
			
		}
	})
}else {
	request(req.body.url, function (error, response, body) {
   if (!error && response.statusCode == 200) {
       res.send(body); // Send the response of the requested url to the frontend.
   }
})
}

})
app.listen(process.env.PORT || 3000);



