export const schemas = {
  // User Schema
  User: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
      email: {
        type: "string",
        example: "mentee@email.com",
      },
      role: {
        type: "string",
        enum: ["Admin", "Mentor", "Mentee"],
        example: "Mentee",
      },
    },
  },

  //   Create Profile
  CreateProfileDto: {
    type: "object",
    required: ["name", "bio", "skills", "goals"],
    properties: {
      name: {
        type: "string",
        example: "Jane Doe",
      },
      bio: {
        type: "string",
        example: "Experienced software engineer and mentor.",
      },
      skills: {
        type: "array",
        items: {
          type: "string",
        },
        example: ["JavaScript", "React", "Node.js"],
      },
      goals: {
        type: "string",
        example: "To help mentees grow their careers in tech.",
      },
    },
  },

  //   UserProfile
  UserProfile: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
      name: {
        type: "string",
        example: "Jane Doe",
      },
      bio: {
        type: "string",
        example: "Experienced software engineer and mentor.",
      },
      skills: {
        type: "array",
        items: {
          type: "string",
        },
        example: ["JavaScript", "React", "Node.js"],
      },
      goals: {
        type: "string",
        example: "To help mentees grow their careers in tech.",
      },
      role: {
        type: "string",
        enum: ["Admin", "Mentor", "Mentee"],
        example: "Mentor",
      },
      userId: {
        type: "integer",
        example: 1,
      },
    },
  },

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

  // Add other schemas here...
};
