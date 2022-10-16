const express = require("express");
router = express.Router();
const Book = require('../models/Book'); // importing book model so that route has access to it
const Author = require("../models/author");
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const uploadPath = path.join('public', Book.coverImageBasePath);
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
});

// All books route

router.get("/", async (req, res) => {

    res.send('All books');

});

// New book route

router.get("/new", async (req, res) => {

    renderNewPage(res, new Book());

});

// Create new book -- this links to form on new.ejs

router.post('/', upload.single('cover'), async (req, res) => { // async await used to avoid nested callbacks and error handling

    const fileName = req.file != null ? req.file.filename : null; // check if file is uploaded

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        coverImageName: fileName,
        description: req.body.description
    });

    try {
        const newBook = await book.save();
        res.redirect('books');
    } catch {

        if(book.coverImageName != null) {
            removeBookCover(book.coverImageName)
        }

        renderNewPage(res, book, true)
    }

});

function removeBookCover(fileName) {
    fs.unlink(path.join(uploadPath, fileName), err => {
        if (err) console.error(err);
    });
}
 
async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find({});
        const params = {
            authors: authors,
            book: book
        }

        if (hasError) params.errorMessage = 'Error Creating Book';

        res.render("books/new", params);
    } catch {
        res.redirect('/books');
    }
}

module.exports = router;