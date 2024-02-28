const express=require('express')
const User=require("../models/user.model.js")
const routes=express.Router()
const  jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const dotenv=require('dotenv')
dotenv.config();

routes.post('/createuser',async(req,res)=>{
    try {
        
        let success=false
        let user=await User.findOne({email:req.body.email})
        console.log(user)
        if(user){
            //User not exist

            return res.status(401).json({error:"Email already in use"});

        }

        const salt=await bcrypt.genSalt(10)
    
        const setpass= await bcrypt.hash(req.body.password,salt)
    
        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:setpass.toString()
        })
 const userId={
            user:{
                id:user.id
            }
        }

        const authToken= jwt.sign(userId,process.env.JWT_SECRET)
        success=true

        res.status(201).json({success,authToken})



    } catch (error) {
        res.status(401).send("Internal Server Found")
        
    }
})

//login Data

routes.post('/login',async(req,res)=>{
    try {
        let success=false
        const {email,password}=req.body
        if(!email || !password ){
            res.status(401).send("Fild cant Empty")
        }

        const user=await User.findOne({email:email})
        if (!user){
            res.status(401).send('User not found')
        }

        const passCompare=await bcrypt.compare(password,user.password)
        console.log(passCompare);
        const userId={
            user:{
                user:user.id
            }
        }
    
        if(!passCompare){
            res.status(401).send("Invalid Password")
        }

        const authToken= jwt.sign(userId,process.env.JWT_SECRET)
        success=true
    

        res.status(201).json({success,authToken})
    } catch (error) {
        res.status(401).send("Internal Error")
    }
})

module.exports=routes