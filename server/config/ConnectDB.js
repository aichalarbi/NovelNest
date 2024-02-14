const mongoose = require("mongoose")
const config = require("config")

const connectDB =() =>{
    mongoose
    .connect(config.get("MONGO_URI"))
    .then(() =>console.log("mongoose connected"))
    .catch((err) => console.error(err));
}

module.exports = connectDB;