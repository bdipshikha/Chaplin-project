var http = require('http');
var url = require('url');
var request = require('request');
var fs = require('fs');
var parameter = ''

var server = http.createServer(function (req, res) {
  console.log(req.method + ': ' + req.url);

  if (req.url === "/chaplin") {
  
		fs.readFile("chaplin.html", function (err, data) {
  			if(err) {
    			console.log(err)
  			} else {
    			res.end(data.toString());
    		  }
     	});

  }	else if (req.url.indexOf("/chaplin?") == 0) {
  	
  	var url_parts = url.parse(req.url,true);
     request("http://api.giphy.com/v1/gifs/search?q="+url_parts.query.product+"&api_key=dc6zaTOxFJmzC", function (err, response, body) {
          var gif = JSON.parse(body)
          var output = '<html><head></head><body>';
			for (var i = 0; i<gif.data.length; i++) {
				var gifUrl = gif.data[i].images.fixed_height.url;
				output = output + '<img src="' + gifUrl + '" /> \n';
			}
			output = output +"</body></html>"

          res.write(output); // this response is from the ## creatServer ## not from request to get API
         
          res.end();
     }); 
 }
 
 
});

/
     server.listen(3000);
	console.log('Server listening on port 3000');