import fastify = require("fastify");
import { FastifyInstance } from "fastify";
import helmet = require("fastify-helmet");

// plugins
import mongoPlugin from "./plugins/mongo";
// services
import firstService from "./services/first";

const { NODE_ENV = "development" } = process.env;

const app: FastifyInstance = fastify({
  logger: {
    prettyPrint: NODE_ENV === "development",
  },
});

//
// ===== register =====
//

app.use(helmet());
// register plugins
app.register(mongoPlugin, {
  url: "mongodb://localhost:27017/cutedge",
});
// register services
app.register(firstService);

export default app;
