export const AvailabilitySchemas = {
  AvailabilityBase: {
    type: "object",
    properties: {
      day: {
        type: "string",
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        example: "Monday",
      },
      startTime: {
        type: "string",
        pattern: "^([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$",
        example: "09:00:00",
      },
      endTime: {
        type: "string",
        pattern: "^([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$",
        example: "17:00:00",
      },
    },
  },
  CreateAvailabilityDto: {
    allOf: [
      { $ref: "#/components/schemas/AvailabilityBase" },
      {
        type: "object",
        required: ["day", "startTime", "endTime"],
      },
    ],
  },
  Availability: {
    allOf: [
      {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
        },
      },
      { $ref: "#/components/schemas/AvailabilityBase" },
    ],
  },
};
