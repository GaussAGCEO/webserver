const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const baseDirectory = __dirname   // base directory, the web user can't go higher in file hierachy

let fof = "404.html"
let port = 80 //the port on which node listens

http.createServer(on_http_request).listen(port)
    
    function on_http_request(request, response){

            let fsPath;

            //information about request
            let requestURL = url.parse(request.url)
            console.log("REQUEST START")
            console.log("-virtual host: "+request.rawHeaders[1])
            console.log("-path: "+request.url)
            console.log("REQUEST END")
            console.log(" ")

            //virtual hosts
            let virtualhost = request.rawHeaders[1]
            let req_path = request.url
            
            //search for index
            let req_path_length = req_path.length
           
            if(req_path.charAt((req_path_length)-1) === "/"){
                fsPath = baseDirectory+"/"+virtualhost+path.normalize(requestURL.pathname)+"index.html"
            }
            else{
                fsPath = baseDirectory+"/"+virtualhost+path.normalize(requestURL.pathname)
            }

            let fileStream = fs.createReadStream(fsPath) // fs reads the file
            fileStream.pipe(response)
                fileStream.on('open', function() {
                    response.writeHead(200 ,{'Content-Type': 'text/html'})
                })


                //in case of an error
                fileStream.on('error',function(e) { //if the file isn't found, it serves the 404 page
                fsPath = baseDirectory+"/"+fof  //selects the 404 page
                let fileStream = fs.createReadStream(fsPath)
                    fileStream.pipe(response)
                    fileStream.on('open', function() {
                    response.writeHead(404 ,{'Content-Type': 'text/html'})
                    })
                })
           
    }
    console.log("The Server is listening on Port "+port)

