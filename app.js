const express = require('express');
const passport = require('passport');
require('./config/passport')(passport);
const session =require('express-session');
const connectMongo = require('./config/db.mongo');
const pgPool = require('./config/db.pg'); // This triggers PostgreSQL connection test
require('dotenv').config();
const snippetsRouter = require('./routes/snippet');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/dashboard', snippetsRouter);
app.use('/auth', require('./routes/auth'));
app.get('/dashboard', (req, res)=>{
    if (req.isAuthenticated()) {
        res.render('dashboard', { user: req.user });
    } else {
        res.redirect('/login');
    }
});

app.get('/', (req, res)=>{
    res.render('login');
});

app.get('/login', (req, res)=>{
    res.render('login');
});

app.get('/register', (req, res)=>{
    res.render('register');
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/login');
    });
});



const PORT = process.env.PORT || 3000;

// Initialize server with database connections
const startServer = async () => {
    try {
        await connectMongo();
        console.log('MongoDB initialized');
        app.listen(PORT, ()=>{
            console.log(`Server is running on port localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};


startServer();
