export const sessionSchemas = {
  CreateSessionDto: {
    type: "object",
    required: ["mentorId", "date", "time"],
    properties: {
      mentorId: {
        type: "integer",
        example: 2,
      },
      date: {
        type: "string",
        pattern: "^\\d{4}-\\d{2}-\\d{2}$",
        example: "2025-08-20",
      },
      time: {
        type: "string",
        pattern: "^([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$",
        example: "14:00:00",
      },
    },
  },
  BaseSession: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      mentorId: { type: "integer", example: 2 },
      menteeId: { type: "integer", example: 3 },
      dateTime: {
        type: "string",
        format: "date-time",
        example: "2025-08-20T14:00:00.000Z",
      },
      feedback: { type: "string", example: "Great session!" },
      rating: { type: "integer", example: 5 },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2025-08-19T10:00:00.000Z",
      },
    },
  },

  MenteeSession: {
    allOf: [
      { $ref: "#/components/schemas/BaseSession" },
      {
        type: "object",
        properties: {
          mentor: {
            type: "object",
            properties: {
              name: { type: "string", example: "Jane Mentor" },
              skills: {
                type: "array",
                items: { type: "string" },
                example: ["JavaScript", "React"],
              },
            },
          },
        },
      },
    ],
  },

  MentorSession: {
    allOf: [
      { $ref: "#/components/schemas/BaseSession" },
      {
        type: "object",
        properties: {
          mentee: {
            type: "object",
            properties: {
              name: { type: "string", example: "John Mentee" },
              bio: { type: "string", example: "Aspiring developer" },
              skills: {
                type: "array",
                items: { type: "string" },
                example: ["Python", "Django"],
              },
            },
          },
        },
      },
    ],
  },
};
