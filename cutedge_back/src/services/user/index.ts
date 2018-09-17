import UserController from "./user.controller";
import { App } from "../../types";
import * as userSchema from "../../schemas/user";
import * as commonSchema from "../../schemas/common";
import { getParamsSchema } from "../../schemas/common";

export default function UserService(app: App, _opts: any, next: Function) {
  const userController = new UserController(app);

  app.route({
    url: "/users",
    method: "POST",
    schema: {
      body: userSchema.createUserBody,
      response: {
        201: userSchema.createUserResponse,
        400: commonSchema.errorSchema,
      },
    },
    handler: userController.create,
  });

  app.route({
    url: "/users/:id",
    method: "GET",
    schema: {
      params: getParamsSchema(["id"]),
      response: {
        200: userSchema.findUserResponse,
        400: commonSchema.errorSchema,
      },
    },
    handler: userController.find,
  });

  app.route({
    url: "/users/:id",
    method: "PATCH",
    schema: {
      params: getParamsSchema(["id"]),
      body: userSchema.updateUserBody,
    },
    handler: userController.update,
  });

  next();
}
