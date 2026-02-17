const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pgPool = require('./db.pg');
const user = require('../models/user');

module.exports = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const userData = await user.findByemail(email);
            if (!userData) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            const isMatch = await bcrypt.compare(password, userData.password_hash);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            } else {
                return done(null, userData);
            }
        } catch (err) {
            console.error('Error during authentication:', err);
            return done(err);
        }
    }));

    passport.serializeUser((userData, done) => {
        done(null, userData.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const userData = await user.findById(id);
            done(null, userData);
        } catch (err) {
            done(err);
        }
    });
};
