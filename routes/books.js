const express = require('express');
const router = express.Router();
let Books = require("../models").Books;
var sequelize = require("../models").sequelize;

//get request for root redirects to books page
router.get('/', (req, res) => {
    res.redirect('/books');
});


//get request for books page renders all the books in the database
router.get('/books', (req, res) => {
    Books.findAll().then((books)=>{
        res.render('index', {books: books});
    });
});


//get request for new book renders the new book page
router.get('/books/new', (req, res) => {
    //an empty instance of the books model is created
    res.render('new-book', {book: Books.build(), title: "New Book"});
});

//post request for new a book builds a new instance and adds it to the database
router.post('/books/new', (req, res) => {
    let newBook = req.body;
    Books.build({
        title: newBook.title, 
        author: newBook.author, 
        genre: newBook.genre, 
        year: newBook.year
    }).save()
    .then((book) => {
        res.redirect('/');
    }).catch((err) => {
        //if the title or author is missing, the submission is denied and an error is shown
        if(err.name === "SequelizeValidationError") {
            let book = Books.build(req.body);
            book.id = req.params.id;

            res.render('new-book', {
                book: book,
                errors: err.errors
            });
        } 
    });
});



//get request for book id dynamically creates the book update page
router.get('/books/:id', (req, res, next) => {
    Books.findByPk(req.params.id).then((book) => {
        //if it is found then the book is updated
        if(book) {
             res.render('update-book', {book:book});
        } else{
            next();
        }
    });
});


//post request for book id dynamically updates book info
router.post('/books/:id', (req, res, next) => {
    //first the book id is found in the database
    Books.findByPk(req.params.id).then((book) => {
        //if it is found then the book is updated
        if(book) {
            return book.update(req.body);
        } 
    }).then((book) => {
        //the book update page is refreshed with the new book info
        res.render('update-book', {book:book});
    }).catch((err) => {
        ///if the title or author is missing, the submission is denied and an error is shown
        if(err.name === "SequelizeValidationError") {
            let book = Books.build(req.body);
            book.id = req.params.id;

            res.render('update-book', {
                book: book,
                errors: err.errors
            });
        } 
    });
});


//post request to delete a specific book
router.post('/books/:id/delete', (req, res, next) => {
    Books.findByPk(req.params.id).then((book) => {
        //if it is found then the book is updated
        if(book) {
            Books.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.redirect('/');
        } else{
            next();
        }
    });
});


module.exports = router;