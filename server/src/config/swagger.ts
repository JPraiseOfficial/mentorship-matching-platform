import swaggerJSDoc from "swagger-jsdoc";

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
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Something went wrong. Please, try again later",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
