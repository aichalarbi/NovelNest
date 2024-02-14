const jwt = require("jsonwebtoken")
const User = require("../models/user")


const isAuth = async (req, res,  next) => {
    try{
        const token = req.headers["autorisation"]
        if (!token) {
            res.send({msg: "no token"})
        } else {
            const decoded = await jwt.verify(token, "jhvbekvbkeubv")
            const user = await User.findById(decoded.id)
            if (!user) {
                res.send({msg: "no user connected"})
            } else {
                req.user = user
                next()
            }
        }

    } catch (err) {
        res.status(500).json({msg: "token invalide"})
    }

}

module.exports = isAuth