const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('session-token');
    if(!token) return res.status(401).json('Please sign in');
    try{
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        req.params = verified;
        next();
    } catch(err){
        return res.status(400).json('Invalid token');
    }
}