const getRoutes = require('./get-routes');
const postRoutes = require('./post-routes');
const loadDatabase = require('../db/setup-db');

module.exports = function (app, db) {
  /* DB -- initialize db */
  loadDatabase(db);
  /* ROUTES -- endpoint handlers */
  getRoutes(app, db);
  postRoutes(app, db);
};