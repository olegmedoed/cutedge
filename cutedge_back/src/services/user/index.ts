import UserController from "./user.controller";
import { App } from "../../types";

export default function UserService(app: App, _opts: any) {
  const userController = new UserController(app);

  app.route({
    url: "/user",
    method: "POST",
    schema: {
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
      response: {
        201: {
          type: "object",
          properties: {
            data: {
              type: "object",
              properties: {
                email: { type: "string" },
              },
            },
          },
        },
        400: {
          type: "object",
          properties: {
            error: {
              type: "object",
              properties: {
                message: "string",
              },
            },
          },
        },
      },
    },
    handler: userController.create
  });

  return app;
}
