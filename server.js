//Importing the built-in 'http' module
const http = require('http');

// Importing your Express application from 'app.js' or wherever it's defined
const app = require('./app');

// Creating an HTTP server using your Express app
const server = http.createServer(app);
//create the Port the app runs
const port = 3535;

// Starting the server and listening on the specified port
server.listen(port,()=>{console.log('server On Air on port 3535');});