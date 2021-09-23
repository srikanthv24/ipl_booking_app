const mongoose = require('mongoose');

let conn = '';

try {
    conn = mongoose.createConnection('mongodb://localhost:27017/ipldb',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    conn.on('connected', () => {
        console.log("Mongoose default connection is open ");
    });
    conn.on('disconnected', () => {
        console.log("Mongoose default connection is disconnected");
    });
    process.on('SIGINT', () => {
        conn.close(() => {
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0);
        });
    });
} catch (error) {
    console.log("Mongoose default connection has occured " + error + " error");
}

mongoose.set('debug', (coll, method, query, doc, options) => {
    // console.log(coll, method, query, doc, options + ' --- options')
    // console.log({collection: coll, method: method, query: query, options: options})
});

module.exports = conn;