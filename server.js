const { application } = require('express');
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index.js');



app.set('view engine', 'ejs'); // template engines are used so variables set by the server can be passed into the html file which is sent to the client

app.set('views', __dirname + '/views'); // where views are going to come from. Inside a directory called views

app.set('layout', 'layouts/layout'); // layouts are used to store layouts of a website that are needed and reduces duplication of code

app.use(expressLayouts); 
app.use(express.static('public')); // where are the public files are, ejs, styles, browser javascript

app.listen(process.env.PORT || 4000); // pull from environment variable for when the app is deployed, or 4000 is used for development environment

app.use('/', indexRouter); // mounting index router to root