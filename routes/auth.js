const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
const user = require('../models/user');

//register page
router.get('/register', (req, res) => {
    res.render('register');
});
router.get('/login', (req, res) => {
    res.render('login');
});


// Registration route
router.post('/register', async (req, res)=>{
    const { email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await user.findByemail(email);
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await user.create(email, hashedPassword);
        
        // Redirect to login page after successful registration
        res.redirect('/auth/login');
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Failed to create user. Please try again.');
    }
})

// Login route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
}));

module.exports = router;