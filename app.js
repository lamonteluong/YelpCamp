const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp-camp", {useNewUrlParser: true});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//MongoDB Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

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
            res.render('index', {campgrounds: allCampgrounds});
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
    res.render('new');
});

//SHOW route - show info of a campground
app.get('/campgrounds/:id', (req, res) => {
    //find campground with provided ID
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            res.render('show', {campground: foundCampground});
        }
    });
});


app.listen(3000);
console.log('Server is running on port 3000');
