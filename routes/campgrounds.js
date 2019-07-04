const express = require('express');
const router = express.Router();
var Campground = require('../models/campground');

//INDEX route - show all campgrunds
router.get('/', (req, res) => {
    //Retrieve campgrounds from database and display
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Retrieving All Campgrounds: ", allCampgrounds);
            res.render('campgrounds/index', {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

//CREATE route - create new campground
router.post('/', (req, res) => {
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
router.get('/new', (req, res) => {
    res.render('campgrounds/new');
});

//SHOW route - show info of a campground
router.get('/:id', (req, res) => {
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

module.exports = router;
