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

  MenteeMentorshipRequest: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      mentorId: { type: "integer", example: 3 },
      mentor: {
        type: "object",
        properties: {
          name: { type: "string", nullable: true, example: "John Doe" },
          bio: {
            type: "string",
            nullable: true,
            example: "Senior developer with 10 years of experience.",
          },
          skills: {
            type: "array",
            items: { type: "string" },
            nullable: true,
            example: ["JavaScript", "TypeScript", "React"],
          },
          goals: {
            type: "string",
            nullable: true,
            example: "Help mentees achieve career growth.",
          },
        },
      },
      status: {
        type: "string",
        enum: ["Pending", "Accepted", "Rejected"],
        example: "Pending",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2025-08-11T14:48:00.000Z",
      },
    },
  },

  MentorMentorshipRequest: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      menteeId: { type: "integer", example: 1 },
      mentee: {
        type: "object",
        properties: {
          name: { type: "string", nullable: true, example: "Jane Smith" },
          bio: {
            type: "string",
            nullable: true,
            example:
              "Aspiring software engineer passionate about backend development.",
          },
          skills: {
            type: "array",
            items: { type: "string" },
            nullable: true,
            example: ["Node.js", "Express", "MongoDB"],
          },
          goals: {
            type: "string",
            nullable: true,
            example: "Find guidance on backend development best practices.",
          },
        },
      },
      status: {
        type: "string",
        enum: ["Pending", "Accepted", "Rejected"],
        example: "Pending",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2025-08-11T14:48:00.000Z",
      },
    },
  },
};
