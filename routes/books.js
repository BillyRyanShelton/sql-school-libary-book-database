const express = require('express');
const router = express.Router();
let Books = require("../models").Books;
var sequelize = require("../models").sequelize;

//get request for main page loads books page
router.get('/', (req, res) => {
    res.redirect('/books');
});


// each book in books

//get request for books page
router.get('/books', (req, res) => {
    Books.findAll().then((books)=>{
        res.render('index', {books: books});
    });
});


//get request for new book
router.get('/books/new', (req, res) => {
    //an empty instance of the books model is created
    res.render('new-book', {book: Books.build()});
});

//post request for new book
router.post('/books/new', (req, res) => {
    // Books.create(req.body).then(function(book))
        res.render('new-book');
});

//get request for book id dynamically creates the book update page
router.get('/books/:id', (req, res, next) => {
    if(id >= 0 && id <= projects.length-1) {
        let projectData = projects[id];
        
    res.render('update-book', {
        // projectName : projects[id].project_name,
        // projectDesc : projects[id].description,
        // projectTech : projects[id].technologies,
        // projectLink : projects[id].live_link,
        // projectGit : projects[id].github_link,
        // projectImg1 : projects[id].image_urls[0],
        // projectImg2 : projects[id].image_urls[1],
        // projectImg3 : projects[id].image_urls[2],
    }); 
} else {
    next();
}
});


//post request for book id dynamically updates book info
router.post('/books/:id', (req, res, next) => {
    if(id >= 0 && id <= projects.length-1) {
        let projectData = projects[id];
        
    res.render('project', {
        // projectName : projects[id].project_name,
        // projectDesc : projects[id].description,
        // projectTech : projects[id].technologies,
        // projectLink : projects[id].live_link,
        // projectGit : projects[id].github_link,
        // projectImg1 : projects[id].image_urls[0],
        // projectImg2 : projects[id].image_urls[1],
        // projectImg3 : projects[id].image_urls[2],
    }); 
} else {
    next();
}
});


//post request to delete a specific book
router.post('/books/:id/delete', (req, res, next) => {
    // let id = req.params.id;

    if(id >= 0 && id <= projects.length-1) {
        let projectData = projects[id];
        
    res.render('project', {
        // projectName : projects[id].project_name,
        // projectDesc : projects[id].description,
        // projectTech : projects[id].technologies,
        // projectLink : projects[id].live_link,
        // projectGit : projects[id].github_link,
        // projectImg1 : projects[id].image_urls[0],
        // projectImg2 : projects[id].image_urls[1],
        // projectImg3 : projects[id].image_urls[2],
    }); 
} else {
    next();
}
});


module.exports = router;