var fs = require('fs');
var sqlSchema = fs.readFileSync('db/ratings_schema.sql')
                  .toString();

module.exports = (db) => {
    db.serialize(() =>  {
        db.run(sqlSchema);
    });
};