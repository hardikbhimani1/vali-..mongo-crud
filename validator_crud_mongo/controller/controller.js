const userModel = require("../model/model")
const express = require("express");
const app = express();
const isSet = require("isset");
const formData = require('express-form-data');
const bcrypt = require('bcrypt');
app.use(formData.parse());

exports.insert = (async (req, res) => {
        const salt = await bcrypt.genSalt(10)
        var a = req.body
        console.log(a);
        const name = req.body.name
        var alfa = /^[a-zA-Z()]+$/
        const email = req.body.email
        var temp1 = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
        const password = req.body.password
        var ptemp = /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/
        const phone_no = req.body.phone_no
        var temp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
        
        if(!isSet(name)){
                res.send({data: "pls enter name",status: false,responsecode: 0})
                return;
         }
        if( name == ' ' ||  !name.match(alfa)  ){
                res.send({data: "pls enter valid name",status: false,responsecode: 0})
                return;
        }
        if(!isSet(email)){
                res.send(JSON.stringify({data: "pls enter email ",status: false,responsecode: 0}))
                return
        }
        if( email == ' ' ||  !email.match(temp1))
        {
                res.send({data: "pls enter valid email ",status: false,responsecode: 0})
                return;
        }
        if(!isSet(password)){
                res.send({data: "pls enter password ",status: false,responsecode: 0})
                return
        }
        if(  password == ' ' ||  !password.match(ptemp))
        {
                res.send({data: "pls enter cepital char,small char, special char and number totel char 6,",status: false,responsecode: 0})
                return;
        }
        if(!isSet(phone_no)){
                res.send({data: "pls enter contact",status: false,responsecode: 0})
        }
            if( phone_no == ' ' ||  !phone_no.match(temp))
        {
                res.send({data: "pls enter valid contact",status: false,responsecode: 0})
                return;
        }
        var passwords = await bcrypt.hash(password, salt)

       userModel.findOne({ email: req.body.email }).then((data)=>{
        if(data != null){
                res.send(JSON.stringify({data: "email alredy inserted",status: false,responsecode: 0}));
                return;
               
        }
        else{
                dataa =  {
                        "name":name,
                        "email":email,
                        "password": passwords,
                        "phone_no":phone_no
                        }       
                 userModel.create(dataa).then(dataa => res.send({status: true,responsecode: 1,massage:"Data Inserted",data:dataa})).catch(e => res.send(e)) 
        }
        })

})

exports.finddata = (async (req, res) => {
const user = await userModel.find();
console.log("user",user)
        if(user == " "){
                res.send({massage:"enter valid email",responsecode:0,status:false})
        }
        else{
                res.send({massage:"data finded", responsecode:1,status:true,data:user})
        }
})

exports.update = (async(req, res) =>{
         const salt = await bcrypt.genSalt(10)
        var a = req.body
        console.log(a);
        const name = req.body.name
        var alfa = /^[a-zA-Z()]+$/
        const email = req.body.email
        var temp1 = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
        const password = req.body.password
        var ptemp = /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/
        const phone_no = req.body.phone_no
        var temp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
        
        if(!isSet(name)){
                res.send({data: "pls enter name",status: false,responsecode: 0})
                return;
         }
        if( name == ' ' ||  !name.match(alfa)  ){
                res.send({data: "pls enter valid name",status: false,responsecode: 0})
                return;
        }
        if(!isSet(email)){
                res.send(JSON.stringify({data: "pls enter email ",status: false,responsecode: 0}))
                return
        }
        if( email == ' ' ||  !email.match(temp1))
        {
                res.send({data: "pls enter valid email ",status: false,responsecode: 0})
                return;
        }
        if(!isSet(password)){
                res.send({data: "pls enter password ",status: false,responsecode: 0})
                return
        }
        if(  password == ' ' ||  !password.match(ptemp))
        {
                res.send({data: "pls enter cepital char,small char, special char and number totel char 6,",status: false,responsecode: 0})
                return;
        }
        if(!isSet(phone_no)){
                res.send({data: "pls enter contact",status: false,responsecode: 0})
        }
            if( phone_no == ' ' ||  !phone_no.match(temp))
        {
                res.send({data: "pls enter valid contact",status: false,responsecode: 0})
                return;
        }
        var passwords = await bcrypt.hash(password, salt)

        console.log(salt,passwords);
        var a = userModel.updateOne({ email: email }, {$set: {name: name,password:passwords,phone_no:phone_no}}).then(data => console.log(data))
        if (a) {
                const user = await userModel.findOne({ email: req.body.email });
                console.log(user)
                res.status(200).json({status: true,responsecode: 1 ,data:user });
        }
         else {
                res.status(400).json({ data:"pls enter right details",status: false,responsecode: 0 });
        }
})

exports.delete = ((req, res) => userModel.deleteOne(req.body).then(data => (data.deletedCount == 0) ? res.json({data: " data not found",status: false,responsecode: 0 }) : res.json({data: " deleted Successfully.",status: true,responsecode: 1 })).catch(e => console.log(e)))