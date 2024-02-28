const dotenv = require("dotenv")
const express=require("express")
const app=express()
const ConnectDb=require("./db.js")
const cors=require("cors")
dotenv.config()
app.use(cors())
app.use(express.json())

ConnectDb()

const port=process.env.PORT ||5000

//Routest Writing
app.get('/',(req,res)=>{
    return res.send("Welcome to the API!")
})

app.use('/api/data', require('./Routes/Data.routes.js'))
app.use('/api/auth', require('./Routes/User.Routes.js'))

app.listen(port,()=>{
    console.log(`Your App SuccessFuly Running in ${port}`)
})


