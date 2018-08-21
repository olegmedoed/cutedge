import { FastifyInstance } from "fastify";
import { MongoClient } from "mongodb";

export default async function createFirstService(
  app: FastifyInstance & { mongo: MongoClient },
  _opts: any
) {
  const db = app.mongo.db("cutedge");

  app.route({
    url: "/",
    method: "GET",
    schema: {
      querystring: {
        name: { type: "string" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            name: { type: "string" },
            age: { type: "number" },
            skills: { type: "array", items: { type: "string" } },
          },
        },
      },
    },
    handler() {
      return db.collection("users").findOne({ name: "Oleg Tsyba" });
    },
  });
}
