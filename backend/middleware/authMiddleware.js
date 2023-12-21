const jwt = require('jsonwebtoken');
const {secretKey} = require('../core/config');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer asfasnfkajsfnjk
        if (!token) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({message: "Unauthorized"});
    }
};