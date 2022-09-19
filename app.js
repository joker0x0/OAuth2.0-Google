const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

//set up view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to MongoDB
mongoose.connect(keys.mongoDB.dbURI, () => {
    console.log('Connected to MongoDB');
});

//setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//create index page
app.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

//app.use('/auth', auth-routes())

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000/");
});