const express = require('express')
const path = require('path')
const fs = require('fs')
// const {find_user} = require('../controllers/login')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret_key = process.env.SECRET_KEY
const admin_hashed_password = process.env.admin_hashed_password
const admin_email = process.env.admin_email
const routers = express.Router()

const login_page = fs.readFileSync(path.join(__dirname,'../public/login.html'),'utf-8')

routers.get('/',(req,res)=>{
    res.end(login_page)
})



routers.post('/verify',(req,res)=>{
    const details = req.body
    try{
    
        if (admin_email === details.email){
        bcrypt.compare(details.password,admin_hashed_password,(err,result)=>{
            
            if (result){
                const token = jwt.sign({email: details.email},secret_key,{expiresIn: 60*60*24*30})
                res.cookie('adsid',token,{maxAge: 30*24*60*60*1000})
                res.send(true)

            }
            else if(err){
                console.error(err)
            }
            else{
                res.send("Wrong password")
            }
        })
    }
    else{
        res.send("Wrong email address")
    }
        
}
catch{

}
    
})




module.exports = routers