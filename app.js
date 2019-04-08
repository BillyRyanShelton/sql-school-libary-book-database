//node packages express, body parser are loaded
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
require('console-stamp')(console, '[HH:MM:ss.l]');
var sequelize = require("./models").sequelize;
//an express module is created
const app = express();

//the key-value pair in req.body is modified so the value is either a string or array
app.use(bodyParser.urlencoded({ extended: false}));
//the app is allowed acces to the public folder and the pug template engine is set
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

//the page routes are loaded
const books = require('./routes/books');
const pageNotFound = require('./routes/page-not-found');

//the page routes are called
app.use(books);
app.use(pageNotFound);

//app listens for connections
sequelize.sync()
    .then(() => {
    app.listen(port, ()=> {
        console.log('Book Page is up!');
    });
});

