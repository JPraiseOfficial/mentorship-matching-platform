import swaggerJSDoc from "swagger-jsdoc";
import { userSchemas } from "./schemas/user.schema.js";
import { responseSchemas } from "./schemas/responses.schema.js";
import { mentorshipRequestSchemas } from "./schemas/mentorshipRequests.schema.js";
import { AvailabilitySchemas } from "./schemas/mentorAvailabilty.schema.js";
import { sessionSchemas } from "./schemas/session.schema.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mentorship Matching Platform API",
      version: "1.0.0",
      description: "API documentation for Mentorship Matching Platform",
    },
    tags: [
      {
        name: "Auth",
        description: "APIs for authentication and authorisation",
      },
      {
        name: "User",
        description: "APIs for any logged in user",
      },
      {
        name: "Admin",
        description: "APIs for admin routes",
      },
      {
        name: "Mentor",
        description: "APIs for mentor routes",
      },
      {
        name: "Mentee",
        description: "APIs for mentee routes",
      },
    ],
    servers: [
      {
        url: "https://mentorship-matching-platform-rxo7.onrender.com",
        description: "Production",
      },
      {
        url: "http://localhost:3000",
        description: "Development",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "jwtToken",
        },
      },
      schemas: {
        ...userSchemas,
        ...responseSchemas,
        ...mentorshipRequestSchemas,
        ...AvailabilitySchemas,
        ...sessionSchemas,
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
