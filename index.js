import dotenv from 'dotenv'
import express from 'express'
import ConnectDb from './db.js'
import cors from 'cors'
const app=express()
dotenv.config()
app.use(express.json())

ConnectDb()
const corsOptions = {
    origin: "https://http://localhost:3000" // frontend URI (ReactJS)
}
app.use(cors(corsOptions))

const port=process.env.PORT ||5000

//Routest Writing
app.get('/',(req,res)=>{
    return res.send("Welcome to the API!")
})

import data from './Routes/Data.routes.js'
import user from './Routes/User.Routes.js'

app.use('/api/data', data)
app.use('/api/auth', user)

app.listen(port,()=>{
    console.log(`Your App SuccessFuly Running in ${port}`)
})


