export const responseSchemas = {
  // Error Response
  ErrorResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Something went wrong. Please, try again later",
      },
    },
  },

  // Validation Error
  ValidationError: {
    type: "object",
    properties: {
      errors: {
        type: "object",
        additionalProperties: {
          type: "array",
          items: {
            type: "string",
          },
        },
        example: {
          name: ["Name is required"],
          bio: ["Bio is required"],
          skills: ["Skills is required"],
          goals: ["Goals are required"],
        },
      },
    },
  },
};
