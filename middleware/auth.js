const config = require("config");
const jwt = require("jsonwebtoken")


function auth (req, res, next) {
    const token = req.header("x-auth-token")
    if(!token) return res.status(400).send("no token provided")

   try{
    //todo: private key
    const decoded = jwt.verify(token, config.get("jwtPrivatekey"));
    req.user = decoded
    next()
   }
   catch(ex) {
    res.status(400).send("invalid token")
   }

}

module.exports = auth