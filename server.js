if (process.env.NODE_ENV !== 'production') { // If in development environment
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.use(express.urlencoded({extended: true})); // boilerplate code need to allow express to access body of html
const indexRouter = require('./routes/index.js');
const authorRouter = require('./routes/authors.js');


app.set('view engine', 'ejs'); // template engines are used so variables set by the server can be passed into the html file which is sent to the client

app.set('views', __dirname + '/views'); // where views are going to come from. Inside a directory called views

app.set('layout', 'layouts/layout'); // layouts are used to store layouts of a website that are needed and reduces duplication of code

app.use(expressLayouts); // allows us to use layouts. These layouts persist on EVERY PAGE
app.use(express.static('public')); // where are the public files are, ejs, styles, browser javascript

app.listen(process.env.PORT || 4000); // pull from environment variable for when the app is deployed, or 4000 is used for development environment

app.use('/', indexRouter); // mounting index router to root
app.use('/authors', authorRouter); // mounting author router to a /author root

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { // env used as for development ENVIRONMENT we want to use local server but once deployed, we want to use an external server 
    useNewUrlParser: true // may or may not be needed
}); 

const db = mongoose.connection; // accessing db connection
db.on('error', error => console.error(error)); // if there's an error connecting to db, log it
db.once('open', () => console.log('Connected to Mongoose')); // if connection successful, log it