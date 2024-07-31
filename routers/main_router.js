const express = require('express')
const path = require('path')
const fs = require('fs')
const {add_user,get_emp,delete_emp,delete_all,edit} = require('../controllers/add_emp')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const routers = express.Router()
const secret_key = process.env.SECRET_KEY

const middleware = (req,res,next)=>{
    const token = req.cookies.adsid
if (token){
    jwt.verify(token,secret_key,(err,result)=>{
        if(err){
            res.redirect('/login')
        }
        else if (result){
            next()
        }
    })
}
else{
    res.redirect('/login')
}

}

const content = fs.readFileSync(path.join(__dirname,'../public/index.html'))
const add_page = fs.readFileSync(path.join(__dirname,'../public/add_emp.html'))

routers.get('/',middleware,(req,res)=>{
    res.end(content)
})

routers.get('/add',middleware,(req,res)=>{
    res.end(add_page)
})

routers.post('/add_employee',middleware,(req,res)=>{
    const details = req.body
    add_user(details).then(result=>{
        if (result){
            res.redirect('/')
        }
        else{
            res.redirect('/add_employee')
        }
    })
    .catch(err=>{
        console.log(err)
    })
})

routers.post('/get_employee',middleware,async (req,res)=>{
    try{
        const employees = await get_emp()
        res.json(employees)
    }
    catch{
        res.send("An error occured")
    }
})

routers.post('/delete_employee',middleware,async (req,res)=>{
    const details = req.body
    if (await delete_emp(details)){
        res.send("deleted")
    }
    else{
        res.send("not found")
    }
})

routers.post('/delete_all',middleware,async (req,res)=>{
    if (await delete_all()){
        res.send("deleted")
    }
    else{
        res.send("not found")
    }
})

routers.post('/edit',middleware,async(req,res)=>{
    const details = req.body
    if (await edit(details)){
        res.send("edited")
    }
    else{
        res.send("not found")
    }
})
module.exports = routers