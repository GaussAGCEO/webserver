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
            let mimt = "";
         

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
                mimt = mimeType(fsPath);
            }
            else{
                fsPath = baseDirectory+"/"+virtualhost+path.normalize(requestURL.pathname)
                mimt = mimeType(fsPath);
            }

            let fileStream = fs.createReadStream(fsPath) // fs reads the file
            fileStream.pipe(response)
                fileStream.on('open', function() {
                    response.writeHead(200 ,{'Content-Type': mimt})
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


    function mimeType(req_path){
        let ext = path.extname(req_path);
        switch(ext){
            case ".png":
                return "image/png";
            case ".jpg":
                return "image/jpeg"
            case ".svg":
                return "image/svg+xml";
            case ".css":
                return "text/css";
            case ".html":
                return "text/html";
            case ".mp4":
                return "video/mp4";
            case ".js":
                return "text/javascript";
            case ".pdf":
                return "application/pdf";
            case ".mpg":
                return "video/mpeg";
            case ".avi":
                return "video/x-msvideo";
            case ".webm":
                return "video/webm";
            case ".txt":
                return "text/plain";
            case ".rtf":
                return "text/rtf"
            case ".xml":
                return "text/xml";
            case ".json":
                return "application/json";
            case ".zip":
                return "application/zip";
        }
    }


