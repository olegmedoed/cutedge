import { App } from "../types";

export default async function createFirstService(app: App, __opts: any, next: Function) {
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
    async handler(_request, reply) {
      reply.header("Set-Cookie", "some=thing; path=/");

      return {
        name: "Oleg Tsyba",
        age: "27",
        skills: ["armwrestler", "programmer"],
      };
    },
  });

  next();
}
