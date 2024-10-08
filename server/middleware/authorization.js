const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = function (req, res, next) {
    const jwtToken = req.header("token");

  // Check if not token
  if (!jwtToken) {
    return res.status(403).json("Not authorize");
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    req.user = payload.user;
    next();
  } catch (err) { 
    return res.status(403).json("Not authorize");
  }
}