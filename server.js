const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//dirname stores the path to your project's directory
app.use(express.static(__dirname + '/public'));

//logger function: shows time and type of HTTP request
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page',
//     welcomeMessage: 'Sorry, page is under construction. Please come back later!'
//   })
// });


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('index.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello There!',
    name: 'Brian',
    likes: [
      'Hockey',
      'Soccer',
      'Coding',
      'Eating'
    ]
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  })
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to retrieve data'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
