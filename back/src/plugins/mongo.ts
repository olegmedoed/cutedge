import { MongoClient } from "mongodb";
import { FastifyInstance } from "fastify";
import fastifyPlugin = require("fastify-plugin");

async function createMongoPlugin(app: FastifyInstance, opts: any) {
  const { url, ...mongoOpts } = opts;

  const db = await MongoClient.connect(
    url,
    mongoOpts
  );
  app.decorate("mongo", db);
}

export default fastifyPlugin(createMongoPlugin);
