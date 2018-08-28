module.exports = function (app, db) {
    // Add new rating
    // {
    //     "id": "aUniqueID",
    //     "rating": "5",
    // }
    app.post('/api/ratings', (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        processRating(req, res, db);
    });
};

// any preprocessing such as validation
function processRating(req, res, db) {
    const fs = require('fs');
    const schema = JSON.parse(fs.readFileSync('db/ratings_schema.json', 'utf8'));
    const validateReq = validate(req, res, schema);
    if (validateReq.valid) {
        insertRating(req.body, res, db);
        return;
    }
    console.error(validateReq.err);
    res.status(400).send(validateReq.err);
}

// inserts/updates a gifs rating then returns the updated list.
function insertRating(gif, res, db) {
    const id = gif.id;
    const rating = gif.rating;
    const sql = `INSERT or REPLACE into Ratings (id, rating) VALUES (?, ?);`;
    const values = [id, rating];

    db.serialize(() => {
        db.run(sql, values, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
                return;
            }
            returnRatings(db, res);
        });
    });
}

// returns new ratings as a map of { gif_id: gif_rating }
function returnRatings(db, res) {
    const sql = `SELECT * FROM Ratings;`;
    db.serialize(() => {
      db.all(sql, 
        (err, rows = []) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
                return;
            }
            res.setHeader("Access-Control-Allow-Origin","*");
            const asMap = rows.reduce((acc, row) => {
                acc[row.id] = row.rating;
                return acc;
            }, {})
            res.send(asMap);
        }
      );
    });
}

function validate(req, res, schema) {
    const Ajv = require('ajv');
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (valid) return { valid: true };
    return {
        valid: false,
        err: `Invalid: ${ajv.errorsText(validate.errors)}`
    };
}