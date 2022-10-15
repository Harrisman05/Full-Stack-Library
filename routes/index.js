const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
    console.log("Get request sent from client");
    res.render('index');
});

module.exports = indexRouter;