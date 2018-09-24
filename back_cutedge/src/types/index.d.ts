import * as fastify from "fastify";
import * as mongodb from "mongodb";

export type App = fastify.FastifyInstance & {
  config: any,
  mongo: { db: mongodb.Db; client: mongodb.MongoClient };
};
