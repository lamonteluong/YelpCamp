const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var User = require('./models/user');
var seedDB = require('./seeds')

// Require routes
var campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes    = require('./routes/comments'),
    authRoutes       = require('./routes/index');

mongoose.connect("mongodb://localhost/yelp-camp", {useNewUrlParser: true});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
//seedDB(); // Delete campgrounds and populate with seed data

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'shh its a secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // Functon from passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Makes user variable available for every single route
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// Append 1st string argument to all routes in corresponding JS file
app.use('/', authRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(3000);
console.log('Server is running on port 3000');
