const mongoose = require("mongoose")
const schema = mongoose.Schema

const userSchema = new schema({
    fullName: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type:  String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    favoriteGenre : {
        type:  String,
        require: true
    }


})

const User = mongoose.model("users", userSchema)
module.exports = User