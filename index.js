/* jshint esversion: 6 */ 

var http = require("http");
var fs = require("fs");


var classes = [
{
    name: "Intro to Introductions",
    grade: "B",
    homework: false
},
{
    name: "101 202",
    grade: "A+",
    homework: false
},
{
    name: "How to lose a man in 10 days",
    grade: "A+",
    homework: true
},
{
    name: "Woodworking in the age of plastics",
    grade: "A+",
    homework: true
},
{
    name: "Photography for the Blind",
    grade: "A+",
    homework: true
}
];


var server = http.createServer((req, res) => {
 if (req.url === "/index.html" || req.url === "/"){
        fs.readFile("index.html", (err, data) => {
            res.write(data);
            res.end();
        });
    } 
    else if(req.url === "/schedule") {	
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
                var obj = {
                    name: queryData,
                    grade: "TBD",
                    homework: "TBD"
                };
                classes.push(obj);
            });
    	   }
    }
    else if(req.url === "/grades") {	
    	res.write(JSON.stringify(classes));
    	res.end();
    }
    else if(req.url === "/homework") {    
        res.write(JSON.stringify(classes));
        res.end();
    }
    else if(req.url === "/submithomework") { 
        if (req.method === "POST"){
           var queryHW = "";

            req.on('data', function(data) {
                queryHW += data;
                if(queryHW.length > 1e6) { 
                    queryHW = "";
                    res.writeHead(413, {'Content-Type': 'text/plain'}).end();
                    req.connection.destroy();
                }
            });
            req.on('end', function() {
                for (var obj of classes){
                    if (queryHW === obj.name){
                        obj.homework = false;
                    }
                }
                
            });

           }
    }
});





server.listen(3800, () => {
    console.log("Server started on port 3800");
});