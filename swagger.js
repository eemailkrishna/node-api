// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Documentation',
    description: 'Automatically generated Swagger documentation for this API',
  },
  host: 'localhost:3000', // Replace with your server host if necessary
  schemes: ['http'],
};

const outputFile = './swagger-output.json'; // Generated Swagger file
const endpointsFiles = ['./app.js']; // File(s) with your routes

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated');
});
