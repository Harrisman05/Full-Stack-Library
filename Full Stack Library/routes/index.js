const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
    console.log("Get request sent from client");
    res.send("Default message sent from server");
});

module.exports = indexRouter