import UserController from "./user.controller";
import { App } from "../../types";
import * as userSchema from "../../schemas/user";
import * as sharedSchema from "../../schemas/shared";

export default function UserService(app: App, _opts: any, next: Function) {
  const userController = new UserController(app);

  app.route({
    url: "/users",
    method: "POST",
    schema: {
      body: userSchema.createUserBody,
      response: {
        201: userSchema.createUserResponse,
        400: sharedSchema.errorSchema,
      },
    },
    handler: userController.create,
  });

  app.route({
    url: "/users/:id",
    method: "GET",
    schema: {
      params: sharedSchema.getParamsSchema(["id"]),
      response: {
        200: userSchema.findUserResponse,
        400: sharedSchema.errorSchema,
      },
    },
    handler: userController.find,
  });

  app.route({
    url: "/users/:id",
    method: "PATCH",
    schema: {
      params: sharedSchema.getParamsSchema(["id"]),
      body: userSchema.updateUserBody,
    },
    handler: userController.update,
  });

  next();
}
