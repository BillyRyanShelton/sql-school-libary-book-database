const express = require('express');
const router = express.Router();

//error is created if no other route is used
router.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

//error is displayed 
router.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
});

module.exports = router;