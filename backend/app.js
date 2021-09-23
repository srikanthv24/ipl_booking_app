const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const insertDataToDb = require('./controllers').mainOperations;
require("./db");

const app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use('/', routes);
app.use('/images', express.static(__dirname + '/images'));
const port = 4000
app.listen(port, () => {
    insertDataToDb.runMainOperations()
    console.log('Server started on port ' + port)
});

module.exports = app;