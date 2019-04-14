const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// CORS - Cross Origin Resource Sharing
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// BodyParser Middleware - Intercepts all requests, pulls data out and puts it in req.body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// --------------------------- Temp Data --------------------------- //

const cities = [
  { name: 'San Francisco', description: 'Foggy city by the bay' },
  { name: 'Los Angeles', description: 'Fun in the sun' },
];

// --------------------------- Routes --------------------------- //

// GET Root Route
app.get('/', (req, res) => {
  res.send('<h1>Express Dynamic Cities</h1>');
});


// GET API INDEX Cities Route
app.get('/api/cities', (req, res) => {
  // console.log('Request recieved at api/cities');
  res.json(cities);
});

// GET API SHOW Cities Route
app.get('/api/cities/:index', (req, res) => {
  const city = cities[req.params.index] || `No city exists at index ${req.params.index}`;
  res.json(city);
});

// POST API CREATE Cities Route
app.post('/api/cities', (req, res) => {
  const newCity = req.body;
  cities.push(newCity);
  res.json(newCity);
});

// PUT API UPDATE Cities Route
app.put('/api/cities/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const cityToUpdate = cities[index];
  if (!cityToUpdate) {
    return res.json({msg: 'No city exists at index' + index})
  }

  cityToUpdate.name = req.body.name;
  cityToUpdate.description = req.body.description;

  res.json(cityToUpdate);
});

// DELETE API DESTROY Cities Route
app.delete('/api/cities/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const cityToDelete = cities[index];
  if (!cityToDelete) {
    return res.json({msg: 'No city exists at index' + index})
  }

  const deletedCity = cities.splice(index, 1)[0];
  res.json(deletedCity);
});

// --------------------------- Start Server --------------------------- //

// Start Server on Port 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
