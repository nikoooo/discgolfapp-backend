/* TypeOrm */
import "reflect-metadata";
import { createConnection, useContainer } from "typeorm";
import { createExpressServer } from "routing-controllers";
import { Container } from "typedi";
import { DiscController } from "./src/controllers/DiscController";
import { DatabaseMigrator } from "./data/databaseMigrator";

useContainer(Container);

/** Initiate db connection using ormconfig.json **/
createConnection().then(async _connection => {

  const port = process.env.PORT || 8001; // set our port

  console.log("Connected. Now running express app");
    const app = createExpressServer({
        controllers: [
          DiscController
        ],
        cors: false,
    });

    app.listen(
      port,
      () => {
        console.log("Listening on port 8001...");
        const dbMigrator = new DatabaseMigrator();
        /*dbMigrator.migrate();
        console.log("Migration done...");*/
      });

}).catch(error => { console.log(error); });