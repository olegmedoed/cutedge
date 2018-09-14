import fastify = require("fastify");
import { FastifyInstance } from "fastify";
import helmet = require("fastify-helmet");
import mongo = require("fastify-mongodb");

import config from "./config";

import infoService from "./services/info";
// import userService from "./services/user";

const app: FastifyInstance = fastify({
  logger: {
    prettyPrint: process.env.NODE_ENV === "development",
  },
});

//
// ===== register =====
//

console.log(app.register.toString());

app
  .register(helmet)
  .register(mongo, {
    url: config.mongo_url,
  })
  // .register(userService)
  .register(infoService);

export default app;
