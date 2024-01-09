const router = require('express').Router();
const fs = require('fs');

// Get all files in the controllers folder
const controllersFolder = './controllers';
const controllerFiles = fs.readdirSync(controllersFolder);

// Require each controller file
controllerFiles.forEach((file) => {
  const controller = require(`${controllersFolder}/${file}`);
  router.use(controller);
});

// Get all files in the routes folder
const routesFolder = './routes';
const routeFiles = fs.readdirSync(routesFolder);

// Require each route file
routeFiles.forEach((file) => {
  const route = require(`${routesFolder}/${file}`);
  router.use(route);
});

module.exports = router;