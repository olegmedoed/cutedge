const userProperties = {
  email: { type: "string", format: "email" },
  firstName: {
    type: "string",
    pattern: "^[A-Za-z][a-z]+$",
    minLength: 2,
    maxLength: 12,
  },
  lastsName: {
    type: "string",
    pattern: "^[A-Za-z][a-z]+$",
    minLength: 2,
    maxLength: 12,
  },
};

export const createUserBody = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 8, maxLength: 23 },
  },
  required: ["email", "password"],
};

export const createUserResponse = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        _id: { type: "string" },
        ...userProperties,
      },
      required: ["_id", "email"],
    },
  },
};

export const findUserResponse = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: userProperties,
      required: ["email"],
    },
  },
};

export const updateUserBody = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: userProperties,
    },
  },
};
