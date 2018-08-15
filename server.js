const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routeHandler = require('./app/routes/');

const port = process.env.PORT || 8000; // set our port

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB
require('mongoose')
  .connect('mongodb://localhost/discgolfapp');

// Router
var router = express.Router()
router.use(function (req, res, next) { // middleware to use for all requests
  console.log('Something is happening.');
  next();
});

routeHandler.registerRoutes(router);
app.use('/api', router);

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});