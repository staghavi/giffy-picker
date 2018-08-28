const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require("body-parser");
var path = require('path');

const app = express();
const port = 8090;
const db = new sqlite3.Database('db/sqlitedb');

app.use(express.static(path.join(__dirname + '/ui/public/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/ui/public/'));
});
require('./routes')(app, db);

app.listen(port, () => {
    console.log('Giffy Picker server listening on ' + port);
});

