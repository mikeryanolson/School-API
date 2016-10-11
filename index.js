/* jshint esversion: 6 */ 

var http = require("http");
var fs = require("fs");

var classes = [
	"Intro to Introductions",
	"101 202",
	"How to lose a man in 10 days",
	"Woodworking in the age of plastics",
	"Photography for the Blind",
];

var grades = [
	"Intro to Introductions : A",
	"101 202 : C-",
	"How to lose a man in 10 days: B+",
	"Woodworking in the age of plastics : C",
	"Photography for the Blind : F",
];

var server = http.createServer((req, res) => {
 if (req.url === "/index.html" || req.url === "/"){
        fs.readFile("index.html", (err, data) => {
            res.write(data);
            res.end();
        });
    } else if(req.url === "/schedule") {	
    	if (req.method === "GET") {
    	res.write(JSON.stringify(classes));
    	res.end();
    } else if (req.method === "POST"){
    	var queryData = "";

            req.on('data', function(data) {
                queryData += data;
                if(queryData.length > 1e6) { 
                    queryData = "";
                    res.writeHead(413, {'Content-Type': 'text/plain'}).end();
                    req.connection.destroy();
                }
            });

            req.on('end', function() {
                classes.push(queryData);
            });
    	}
    }
    else if(req.url === "/grades") {	
    	res.write(JSON.stringify(grades));
    	res.end();
    }
    
});





server.listen(3800, () => {
    console.log("Server started on port 8000");
});