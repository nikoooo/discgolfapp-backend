/* Express */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routeHandler = require('./src/routes/');
/* TypeOrm */
import "reflect-metadata";
import { createConnection } from "typeorm";

/** Initiate db connection **/
createConnection().then(async _connection => {

  const port = process.env.PORT || 8000; // set our port

  /* Init express app */
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Router
  var router = express.Router()
  router.use(function (req, res, next) { // middleware to use for all requests
    console.log('Incomming call...');
    next();
  });
  routeHandler.registerDiscRoutes(router);
  app.use('/api', router);

  /* Listen to port */
  app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
  });

}).catch(error => { console.log(error); });