const express = require('express');
const router = express.Router();
let Books = require("../models").Books;
var sequelize = require("../models").sequelize;

//get request for main page loads the books page
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

//NEED TO FIX
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
    //first the book id is found in the database
    Books.findByPk(req.params.id).then((book) => {
        //if it is found then the book is updated
        if(book) {
            return book.update(req.body);
        } //if not found then a error is sent
        else {
            res.send(404);
        }
    }).then((book) => {
        //the book update page is refreshed with the new book info
        res.render('update-book', {book:book});
    }).catch((err) => {
        //if there is an error, a new book item is sent to the update page along with the errors
        if(err.name === "SequelizeValidationError") {
            let book = Books.build(req.body);
            book.id = req.params.id;

            res.render('update-book', {
                book: book,
                errors: err.errors
            });
        } else {
            next();
        }
    });
    





    //  let book = req.body;
    //  let idNum = req.params.id;
    //  console.log(book.title);
    // if(book.title != '' && book.author != '') {
    //     res.render('update-book', {book:book});
    //     Books.update({
    //         title: book.title,
    //         author: book.author,
    //         genre: book.genre,
    //         year: book.year
    //     }, {
    //         where: {id: idNum}
    //     }
    //     );
    // } else if(book.title == '' || book.author == ''){
    //     console.log('Error:  Author and Title are required when updating a book.');
    //     res.render('form-error', {book:book, heading: 'Update Book'});
    // }
    // else {
    //     next();
    // }
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

        res.redirect('/');
        
    } else {
        next();
    }
});


module.exports = router;