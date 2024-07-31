const express = require('express')
const path = require('path')
const fs = require('fs')
const main_router = require('./routers/main_router')
const login_router = require('./routers/login_router')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const secret_key = process.env.SECRET_KEY

const port = 3000 || process.env.PORT

const app = express()



app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/',main_router)
app.use('/login',login_router)
// app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname,'public')))



app.listen(port,()=>{
    console.log(`Server listening to port : ${port}`)
})