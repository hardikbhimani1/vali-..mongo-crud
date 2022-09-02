const mongoose = require("mongoose")

const userdata = new mongoose.Schema({
    name :{type : String,required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone_no:{type : String,require:true}
})

const userModel = new mongoose.model("userdata", userdata);

module.exports = userModel