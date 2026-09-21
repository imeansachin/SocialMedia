const mongoose = require("mongoose");
async function connectDB (){
await mongoose.connect("mongodb+srv://yt:3cys0NQBKzUR5lXS@backend.4dtnypw.mongodb.net/project-1")
console.log("mongoose is connected")
}

module.exports = connectDB;