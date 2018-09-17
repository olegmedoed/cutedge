import * as http from "http";
import * as fastify from "fastify";

import { App } from "../../types";
import UserModel from "./user.model";

export default class UserController {
  userModel: UserModel;

  constructor(private app: App) {
    this.userModel = new UserModel(this.app);
  }

  create = async (
    request: fastify.FastifyRequest<http.IncomingMessage>,
    reply: fastify.FastifyReply<http.OutgoingMessage>
  ) => {
    try {
      const userData = await this.userModel.create(request.body);
      reply
        .header(
          "Location",
          `http://localhost:3000/users/${userData._id.toString()}`
        )
        .status(201);
      return { data: userData };
    } catch (err) {
      this.app.log.error(err.message);
      reply.status(400);
      return { error: err.message };
    }
  };

  find = async (
    request: fastify.FastifyRequest<http.IncomingMessage>,
    reply: fastify.FastifyReply<http.OutgoingMessage>
  ) => {
    try {
      const userDoc = await this.userModel.find(request.params.id);
      if (!userDoc) {
        throw new Error("User is absent");
      }
      return { data: userDoc };
    } catch (err) {
      this.app.log.error(err.message);
      reply.status(400);
      return { error: err.message };
    }
  };

  update = async (
    request: fastify.FastifyRequest<http.IncomingMessage>,
    reply: fastify.FastifyReply<http.OutgoingMessage>
  ) => {
    try {
      await this.userModel.update(request.params.id, request.body);
      reply.status(204);
      return "";
    } catch (err) {
      this.app.log.error(err.message);
      reply.status(400);
      return { error: err.message };
    }
  };
}
