// Imports
var express     = require('express');
var bodyParser  = require('body-parser');
const cors = require('cors');
var apiRouter   = require('./apiRouter').router;

const path = __dirname + '/views/';

// Instantiate server
var server = express();


server.use(express.static(path));

var corsOption = {
    origin: "http://localhost:8081"
};

server.use(cors(corsOption));

// Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const db = require('./models');

db.sequelize.sync();

// Configure routes
server.get('/', function (req,res) {
    res.sendFile(path + "index.html");
  });

server.use('/', apiRouter);

// Launch server
server.listen(8080, function() {
    console.log('Server en écoute :)');
});