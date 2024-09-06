const debug = false;
const validator = (requiredFields) => {
    return (req, res, next) => {
        let bodyFields = Object.keys(req.body);
        if (req.method === "GET") {
            bodyFields = Object.keys(req.query);
        }
        let missing = '';
        requiredFields.every((x) => {
            if (debug === true) {
                console.log(bodyFields.indexOf(x) + ' -- ' + x);
            }
            if (req.method === "POST") {
                if (bodyFields.indexOf(x) < 0 || !req.body[x]) {
                    missing = x;
                    return false;
                }
            }
            if (req.method === "GET") {
                if (debug === true) {
                    console.log(bodyFields.indexOf(x) < 0 || !req.query[x]);
                }
                if (bodyFields.indexOf(x) < 0 || !req.query[x]) {
                    missing = x;
                    return false;
                }
            }
            return true;
        });
        if (missing.length > 0) {
            res.send({
                error: true,
                description: `A required value was not provided : ${missing}`
            })
        } else {
            return next();
        }
    };
};

module.exports = validator;