module.exports = function(app, db) {
  // Get a single rating based on gif ID
  app.get('/api/ratings/id/:id', (req, res) => {
      processData(res, `SELECT * FROM Ratings WHERE id == ${req.params.id};`);
  });

  // Get all ratings
  app.get('/api/ratings', (req, res) => {
      processData(res, "SELECT * FROM Ratings;");
  });

  function processData(res, sql){
    db.serialize(() => {
      db.all(
        sql, 
        (err, rows = []) => {
          if (err) {
            console.error(err);
            res.status(500).send(err);
            return;
          }
          const asMap = rows.reduce((acc, row) => {
              acc[row.id] = row.rating;
              return acc;
          }, {})
          res.setHeader("Access-Control-Allow-Origin","*");
          res.send(asMap);
        }
      );
    });
  }
};