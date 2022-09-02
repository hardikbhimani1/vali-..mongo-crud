const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModel = require("../model/model");
const controller = require("../controller/controller");

// mongoose connect
mongoose.connect("mongodb://localhost:27017/mongodb_data", {
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err,connection)=>{
    if(err)throw err
    else{
        console.log("DB Connection Done......")
    }
})

const register = express.Router();

//API
register.post("/insert", controller.insert);
register.get("/find", controller.finddata);
register.put("/update", controller.update);
register.delete("/delete", controller.delete);

module.exports = register;