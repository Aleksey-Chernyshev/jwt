const db = require('../db')


class DashboardController{
    async dashboard(req,res){
        try {
            
            res.json(req.user)

            // const user = await db.query("SELECT * FROM users WHERE users_id = $1", [req.user])
            // res.json(user.rows[0])
        } catch (error) {
            console.error(error.message)
            res.status(500).json("Server Error")
        }
    }
}

module.exports = new DashboardController