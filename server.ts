/* TypeOrm */
import "reflect-metadata";
import { createConnection, useContainer } from "typeorm";
import { createExpressServer } from "routing-controllers";
import { Container } from "typedi";
import { DiscController } from "./src/controllers/DiscController";
import { DatabaseMigrator } from "./data/databaseMigrator";
import { DiscTypeController } from "./src/controllers/DiscTypeController";
import { ManufacturerController } from "./src/controllers/ManufacturerController";
import { PlasticController } from "./src/controllers/PlasticController";
import { PlasticFeatureController } from "./src/controllers/PlasticFeatureController";
import { TagController } from "./src/controllers/TagController";
import { VisualController } from "./src/controllers/VisualController";

useContainer(Container);

/** Initiate db connection using ormconfig.json **/
createConnection().then(async _connection => {

  const port = process.env.PORT || 8001; // set our port

  console.log("Connected. Now running express app");
    const app = createExpressServer({
        controllers: [
          DiscController,
          DiscTypeController,
          ManufacturerController,
          PlasticController,
          PlasticFeatureController,
          TagController,
          VisualController
        ],
        cors: {
          origin: '*',
          optionsSuccessStatus: 200 
        },
    });

    app.listen(
      port,
      () => {
        console.log("Listening on port 8001...");
        /*const dbMigrator = new DatabaseMigrator();
        dbMigrator.migrate();
        console.log("Migration done...");*/
      });

}).catch(error => { console.log(error); });