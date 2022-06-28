const mongoose = require('mongoose')
const AccountModel = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    role: { type: String },
})
module.exports = mongoose.model("Account", AccountModel)