const express = require("express");
router = express.Router();
const Author = require('../models/author'); // inporting author model so that route has access to it

// All authors route

router.get("/", async (req, res) => {

    // res.render('authors/index'); // res.render can  detect views in view folder (using app.set('views', __dirname + '/views')) and is able to render them. In this case, render index.ejs file within authors folder

    let searchOptions = {} // creating the ability to search for a name

    if (req.query.name !== null & req.query.name !== '') { // GET requests send information through the URL, so need to access name variable for GET query. Check that the user actually send a name passed to server
        searchOptions.name = new RegExp(req.query.name, 'i'); // match just a part of the search query that the user submits, using RegExp
    }

    // bconsole.log(req.query); - this is an object containing the value submitted by the user - {name: "Harley"}
    
    try {
        const authors = await Author.find(searchOptions);
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/'); // redirect user back to home page if database call doesn't work
    }

})

// New author route

router.get("/new", (req, res) => {
    res.render('authors/new', {
        author: new Author()
    }) // these variables are sent to EJS file, so ejs file has access to the Author object and is able to create a new author
})

// Create new author -- this links to form on new.ejs

router.post('/', async (req, res) => { // async await used to avoid nested callbacks and error handling

    // no need to render anything, just creating a new user. req.body.name is the value that's submitted from new.ejs
    const author = new Author({ // when the name submitted by the client is sent here, a new Author object is created and a name property is explicitly given the value that the client sent
        name: req.body.name
    });

    try {
        const newAuthor = await author.save(); // everything done async in mongoose
        // res.redirect(`authors/${newAuthor.id}`);
        res.redirect(`authors`);

    } catch {

        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author'
        })

    }


})

module.exports = router;