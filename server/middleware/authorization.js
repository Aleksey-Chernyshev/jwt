const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = async (req, res, next) => {
try {
    //получить токен
    const jwtToken = req.header("token")
    if(!jwtToken) {
        return res.status(403).json("Не авторизован")
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret)
    req.user = payload.user
    next()
} catch (error) {
    console.error(error.message)
    return res.status(403).json("Не авторизован")
}
}