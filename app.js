const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campArr = [
    {name: "Salmon Creek", image: 'https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg'},
    {name: 'Green Hills', image: 'https://farm4.staticflickr.com/3282/2770447094_2c64348643.jpg'},
    {name: 'Big Peak', image: 'https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg'},
    {name: "Salmon Creek", image: 'https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg'},
    {name: 'Green Hills', image: 'https://farm4.staticflickr.com/3282/2770447094_2c64348643.jpg'},
    {name: 'Big Peak', image: 'https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg'},
    {name: "Salmon Creek", image: 'https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg'},
    {name: 'Green Hills', image: 'https://farm4.staticflickr.com/3282/2770447094_2c64348643.jpg'},
    {name: 'Big Peak', image: 'https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg'}
];

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', {campgrounds: campArr});
});

app.post('/campgrounds', (req, res) => {
    //Get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campArr.push(newCampground);
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new')
});

app.listen(3000);
console.log('Server is running on port 3000');
