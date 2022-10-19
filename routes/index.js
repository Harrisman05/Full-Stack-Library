const express = require('express');
const indexRouter = express.Router();
const Book = require('../models/book');

indexRouter.get('/', async (req, res) => {
    console.log("Get request sent from client");

    let books;

    try {
        books = await Book.find().sort({createdAt: 'desc'}).limit(10).exec();
    } catch {
        books = [];
    }

    res.render('index', {books: books });
});

module.exports = indexRouter;