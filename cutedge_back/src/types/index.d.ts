import * as fastify from "fastify";
import * as mongodb from "mongodb";

export type App = fastify.FastifyInstance & {
  mongo: { db: mongodb.Db; client: mongodb.MongoClient };
};
