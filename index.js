var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {

    // This mostly works, need to incorporate more path library stuff
    let key = request.url.split('/')[1];

    var filePath = './public' + request.url;
    
    if(key == "root")
    {
        filePath = "./";
        let path = request.url.split('/');
        path.splice(1, 1);
        filePath += path.join('/');
    }

    if (filePath.substring(filePath.length - 1) == '/')
        filePath += 'index.html';

    var extname = path.extname(filePath);
    //console.log(filePath, extname)
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./public/404.html', (error, content) => {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                if(filePath.substring(filePath.length - 1) != "/")
                {
                    fs.readFile(filePath + "/index.html", (error, content) => {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else
                {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    response.end(); 
                }
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');