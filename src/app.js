const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


// console.log(__dirname); ---> //home/berni/Documentos/NodeProjects/webServer/src
// console.log(__filename); ---> //home/berni/Documentos/NodeProjects/webServer/src/app.js

/*console.log(__dirname); ---->  // /home/berni/Documentos/NodeProjects/webServer/src
console.log(path.join(__dirname, '../public')); --------> // /home/berni/Documentos/NodeProjects/webServer/public*/

const app = express();

// set port --> if Heroku port doesnt exist, use 3000 locally
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location:
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    //its going to rend index.hbs view
    res.render('index', {
        title: 'Weather App',
        name: 'Bernardo Llamas',
    });
});

app.get('/help', (req, res) => {
    //its going to rend help.hbs view
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Bernardo Llamas',
    });
});

app.get('/about', (req, res) => {
    //its going to rend about.hbs view
    res.render('about', {
        title: 'About Me',
        name: 'Bernardo Llamas',
    });
});


app.get('', (req, res) => {
    res.send('Hello express!');
});

app.get('/help', (req, res) => {
   res.send('Help page');
});

app.get('/about', (req, res) => {
   res.send('<h1>About</h1>');
});

app.get('/weather', (req, res) => {
   if(!req.query.address) {
       return res.send({
          error: 'You must provide an address'
       });
   }

   geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
      if(error) {
          return res.send({error})
      }

      forecast(latitude, longitude, (error, forecastData) => {
         if(error) {
             return res.send({error});
         }

         res.send({
            forecast: forecastData,
            location,
            address : req.query.address
         });
      });

   });
});

app.get('/products', (req, res) => {

   //http://localhost:3000/products?search=games&rating=5 ---> wont give any problem.

   if(!req.query.search) {
       return res.send({
          error: 'You must provide a search term'
       });
   }

   console.log(req.query.search);
   res.send({
       products: []
   });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bernardo Llamas',
        errorMessage: 'Help article not found'
    });
});

// If url doesnt match with a page, load 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bernardo Llamas',
        errorMessage: 'Page not found'
    });
});

// to start the server up: app.listen(port_number, callback function which runs when the server is up and running)
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});



