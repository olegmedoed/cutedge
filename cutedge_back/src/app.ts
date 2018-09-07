import fastify = require("fastify");
import { FastifyInstance } from "fastify";
import helmet = require("fastify-helmet");
import mongo = require("fastify-mongodb");

import infoService from "./services/info";
// import userService from "./services/user";

const {
  NODE_ENV = "development",
  MONGO_URL = "mongodb://localhost/cutedge",
} = process.env;

const app: FastifyInstance = fastify({
  logger: {
    prettyPrint: NODE_ENV === "development",
  },
});

//
// ===== register =====
//

console.log(app.register.toString());

app
  .register(helmet)
  .register(mongo, {
    url: MONGO_URL,
  })
  // .register(userService)
  .register(infoService);

export default app;
