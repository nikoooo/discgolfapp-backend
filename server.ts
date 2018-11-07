/* TypeOrm */
import "reflect-metadata";
import { createConnection, useContainer } from "typeorm";
import { createExpressServer } from "routing-controllers";
import { Container } from "typedi";
import { DiscController } from "./src/controllers/DiscController";

useContainer(Container);

/** Initiate db connection **/
createConnection().then(async _connection => {

  const port = process.env.PORT || 8000; // set our port

  console.log("Connected. Now run express app");
    const app = createExpressServer({
        controllers: [
          DiscController
        ],
        cors: true,
    });

    app.listen(
      port,
      () => {
        console.log("Server is up and running on port 8000. Now send requests to check if everything works.");
      });

}).catch(error => { console.log(error); });