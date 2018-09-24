import fastify = require("fastify");
import helmetPlugin = require("fastify-helmet");

import mongoPlugin from "./plugins/mongo";
import infoService from "./services/info";
// import userService from "./services/user";

import { App } from "./types";

const app = fastify({
  logger: {
    prettyPrint: process.env.NODE_ENV === "development",
  },
});

//
// ===== register =====
//

app
  .register(helmetPlugin)
  .register(mongoPlugin)
  // .register(userService)
  .register(infoService);

export default app as App;
