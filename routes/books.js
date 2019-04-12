const express = require('express');
const router = express.Router();
let Books = require("../models").Books;
var sequelize = require("../models").sequelize;

//get request for main page loads books page
router.get('/', (req, res) => {
    res.redirect('/books');
});


//get request for books page
router.get('/books', (req, res) => {
    Books.findAll().then((books)=>{
        res.render('index', {books: books});
    });
});


//get request for new book
router.get('/books/new', (req, res) => {
    //an empty instance of the books model is created
    res.render('new-book', {book: Books.build(), title: "New Book"});
});

//post request for new book
router.post('/books/new', (req, res) => {
    // Books.create(req.body).then(function(book))
        res.render('new-book');
});

//get request for book id dynamically creates the book update page
router.get('/books/:id', (req, res, next) => {
    let id = req.params.id;
    if(id >= 0 && id <= Books.max('id')) {
        Books.findByPk(id).then((book) => {
            res.render('update-book', {book:book});
        });
    } else {
        next();
    }
});


//post request for book id dynamically updates book info
router.post('/books/:id', (req, res, next) => {
     let book = req.body;
     let idNum = req.params.id;
    if(book.title != null && book.author != null) {
        res.render('update-book', {book:book});
        Books.update({
            title: book.title,
            author: book.author,
            genre: book.genre,
            year: book.year
        }, {
            where: {id: idNum}
        }
        );
    } else {
        next();
    }
});


//post request to delete a specific book
router.post('/books/:id/delete', (req, res, next) => {
    let id = req.params.id;
    if(id >= 0 && id <= Books.max('id')) {
        Books.destroy({
            where: {
                id: id
            }
        });

        res.redirect('/books');
        
    } else {
        next();
    }
});


module.exports = router;