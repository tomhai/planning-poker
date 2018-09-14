const express = require('express');
const http = require('http');
const faye = require('faye');
const planningPoker = require('./server/planningPoker.js');

const app = express();
app.use(express.static(__dirname + '/app' ));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app/index.html');
});
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500);
});

const server = http.createServer(app);
const port = process.env.PORT || 8000;
server.listen(port, function() {
    console.log('Listening on ' + port);
});

const bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});
bayeux.attach(server);
bayeux.on('handshake', function(clientId) {
    console.log('Client connected', clientId);
});
planningPoker.init(bayeux);
