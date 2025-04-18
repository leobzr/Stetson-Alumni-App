const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Alumni App API',
      version: '1.0.0',
      description: 'API for Stetson University Alumni App',
    },
    servers: [
      {
        url: 'http://157.230.236.229:5000', // Your IP address
        description: 'Alumni App API Server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;