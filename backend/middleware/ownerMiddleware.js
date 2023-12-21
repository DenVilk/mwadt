const jwt = require('jsonwebtoken');
const {secretKey} = require('../core/config');

module.exports = function (req, res, next) {
    if (req.method === "PUT") {
        try {
            const {id} = req.params;
            const token = req.headers.authorization.split(' ')[1]; // Bearer asfasnfkajsfnjk
            if (!token) {
                return res.status(403).json({message: "Permission denied"});
            }
            const decoded = jwt.verify(token, secretKey);
            req.user = decoded;
            if (decoded.id != id) return res.status(403).json({message: "Permission denied"});
            next();
        } catch (e) {
            res.status(403).json({message: "Permission denied"});
        }
    }else next();
};