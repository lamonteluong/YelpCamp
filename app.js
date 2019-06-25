const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require('./seeds')

mongoose.connect("mongodb://localhost/yelp-camp", {useNewUrlParser: true});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
//seedDB(); // Delete campgrounds and populate with seed data


app.get('/', (req, res) => {
    res.render('landing');
});

//INDEX route - show all campgrunds
app.get('/campgrounds', (req, res) => {
    //Retrieve campgrounds from database and display
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Retrieving All Campgrounds: ", allCampgrounds);
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
        }
    });
});

//CREATE route - create new campground
app.post('/campgrounds', (req, res) => {
    //Get data from form and add to database Campgrounds collection
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    }, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            console.log("New Campground: ", campground);
            res.redirect('/campgrounds');
        }
    });
});

//NEW route - show form to create new campground
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

//SHOW route - show info of a campground
app.get('/campgrounds/:id', (req, res) => {
    //find campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

// ===============
// COMMENTS ROUTES
// ===============

app.get('/campgrounds/:id/comments/new', (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    })
});

app.post('/campgrounds/:id/comments', (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds')
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err)
                } else {
                    campground.comments.push(comment);
                    campground.save(); 
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
});

app.listen(3000);
console.log('Server is running on port 3000');
