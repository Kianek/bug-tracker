const bugsRoutes = require('./bugs');
/**
 * Adds routes to the app
 */
module.exports = app => {
  app.use('/bugs', bugsRoutes);
};
