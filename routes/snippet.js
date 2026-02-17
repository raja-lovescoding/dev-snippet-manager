const express = require('express');
const router = express.Router();
const snippetController = require('../controllers/snippetController');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Dashboard route
router.get('/', ensureAuthenticated, snippetController.getDashboard);

// Create snippet route
router.post('/add', ensureAuthenticated, snippetController.createSnippet);

router.post('/delete/:id', ensureAuthenticated, snippetController.deleteSnippet);

module.exports = router;
