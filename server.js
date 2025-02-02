const express = require('express');
const sslRedirect = require('heroku-ssl-redirect');
const path = require('path');
const http = require('http');
const WebSocketServer = require('websocket').server;
const handle_request = require('./connection_mgmt');

const app = express();
const port = process.env.PORT || 5005;
const httpServer = http.createServer(app);

app.use(sslRedirect());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
                   app.get('/', funcion (request, result){
                result.send('hello word!')
                });
    });
}

httpServer.listen(port, function(){
    console.log(`[${new Date().toLocaleTimeString()}] server is listening on ${port}`);
});


let wsServer = new WebSocketServer({
    httpServer: httpServer,
    autoAcceptConnections: false
});

wsServer.on('request', handle_request);
