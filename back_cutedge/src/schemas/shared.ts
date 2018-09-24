export const errorSchema = {
  type: "object",
  properties: {
    error: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

/**
 * Create schema for list of params
 *
 * const schema = getParamSchema(["id"])
 * assert.deepEqual(schema, {
 *    type: "object",
 *    properties: {id: {type: "string"}},
 *    required: ["id"]
 * })
 *
 * @param [String] paramNames - list of params
 * @return schema
 */

export function getParamsSchema(paramNames: string[]) {
  const properties: any = {};
  for (const key of paramNames) {
    properties[key] = { type: "string" };
  }

  return {
    type: "object",
    properties: properties,
    required: paramNames,
  };
}
