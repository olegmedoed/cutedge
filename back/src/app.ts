import fastify = require("fastify");
import { FastifyInstance } from "fastify";
import helmet = require("fastify-helmet");
import mongo = require("fastify-mongodb");

import firstService from "./services/first";

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

// register plugins
app.register(helmet);
app.register(mongo, {
  url: MONGO_URL,
});
// register services
app.register(firstService);

export default app;
