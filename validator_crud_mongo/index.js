const express = require("express");
const app = express();
const formData = require('express-form-data');
const bodyparser = require('body-parser')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use(formData.parse());
app.use(express.json())

const register = require("./router/router");
app.use("/register",register);

const port = 5151;
app.listen(port,()=>{
    console.log(`listing port : ${port}`)
});