const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

app.use('/api/commodity_info', routes.countryData);

app.get('/', (req, res) => {
  res.send('hello world from fruitpal');
});

app.listen(8080, () => console.log('Listening on port 8080'));
