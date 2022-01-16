const express = require('express');
const bodyParser = require('body-parser');
const routeHandler = require('./routes/handler');

const PORT = 8080;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routeHandler);

app.get('/', (req, res) => {
  res.send('Welcome in the dashboard server side !');
});

app.listen(PORT, () => {
  console.log(`Server port : ${PORT}`);
});