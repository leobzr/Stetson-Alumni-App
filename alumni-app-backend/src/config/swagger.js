import swaggerJsdoc from 'swagger-jsdoc';

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
        url: 'http://165.227.84.162',
        description: 'Alumni App API Server',
      },
    ],
  },
  apis: ['./src/features/**/*Routes.js'], // Updated path to reflect new structure
};

const specs = swaggerJsdoc(options);

export default specs;