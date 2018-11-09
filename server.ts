/* TypeOrm */
import "reflect-metadata";
import { createConnection, useContainer } from "typeorm";
import { createExpressServer } from "routing-controllers";
import { Container } from "typedi";
import { DiscController } from "./src/controllers/DiscController";

useContainer(Container);

/** Initiate db connection **/
createConnection().then(async _connection => {

  const port = process.env.PORT || 8001; // set our port

  console.log("Connected. Now run express app");
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
      });

}).catch(error => { console.log(error); });