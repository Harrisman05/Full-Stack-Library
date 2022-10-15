const express = require("express");
router = express.Router();
const Book = require('../models/Book'); // importing book model so that route has access to it

// All books route

router.get("/", async (req, res) => {

    res.send('All books');

});

// New book route

router.get("/new", (req, res) => {

    res.send("New book");
    
});

// Create new book -- this links to form on new.ejs

router.post('/', async (req, res) => { // async await used to avoid nested callbacks and error handling

    res.send("Create book");

});

module.exports = router;