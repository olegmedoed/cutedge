import * as http from "http";
import * as fastify from "fastify";
import { App } from "../../types";

export default class UserController {
  constructor(private app: App) {
    this.app = app;
  }

  create = async (
    request: fastify.FastifyRequest<http.IncomingMessage>,
    reply: fastify.FastifyReply<http.OutgoingMessage>
  ) => {
    try {
      await this.app.mongo.db.collection("user").insertOne(request.body);
    } catch (err) {
      reply.status(400);
      return {
        error: err.message,
      };
    }

    return request.body;
  };
}
