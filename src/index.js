require('./db/database')
const express=require('express')
const path =require('path')
const app =express()
const mongoose =require('mongoose')
const session= require('express-session')
const UserRouter=require('./routes/User')
// const ejs =require('ejs')
const port =3000
// /Defining path for Express config


//
app.use(express.urlencoded({extended:false}))
app.use(express.json())
// app.use(
//     session({
//         secret:"My secret",
//         saveUninitialized:true,
//         resave:false
//     })
// )
// app.use((req,res,next)=>{
//     res.locals.message=req.session.message;
//     delete req.session.message
// })
// app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


 app.use(UserRouter)

// app.get("/",(req,res)=>{
//     res.send("Hello World")

// })

app.listen(port,(req,res)=>{
console.log("Serdver is Up on " + port)
})