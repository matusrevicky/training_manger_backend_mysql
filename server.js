require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');
const db = require('_helpers/db');
var userService = require('./users/user.service');



//Get all trainings
/*
function setValueUsers(value) {
    users = (value);
    console.log((users));
}

db.query('select * from users ', (err, rows, fields) => {
    if (!err)
        setValueUsers(rows);
    else
        console.log(err);
});

function setValueTrainings(value) {
    trainings = (value);
    console.log((trainings));
}

db.query('select * from trainings ', (err, rows, fields) => {
    if (!err)
        setValueTrainings(rows);
    else
        console.log(err);
});


*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/trainings', require('./trainings/trainings.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});