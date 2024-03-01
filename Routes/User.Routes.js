import express from 'express'
import {User} from '../Models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import APIErrors from '../Utils/APIErrors.js'
import APIResponce from '../Utils/APIResponce.js'

const routes=express.Router()
dotenv.config();

routes.post('/createuser',async(req,res)=>{
    try {
        
    
        let user=await User.findOne({email:req.body.email})
    
        if(user){
            //User not exist

        throw new APIErrors(401,"User Alredy Exist.. Please Login..!")

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
        

        res.status(201).json(new APIResponce(201,authToken,"User SuccessFully Created...!"))



    } catch (error) {
        res.status(401).json(new APIErrors(401,"Internal Server Error",error))
        
    }
})

//login Data

routes.post('/login',async(req,res)=>{
    try {
        
        const {email,password}=req.body
        if(!email || !password ){
            res.status(401).json(new APIErrors(401,"Inpute Fild Can Not To be Blank...!"))
        }

        const user=await User.findOne({email:email})
        if (!user){
            res.status(401).json(new APIErrors(401,"User Can Not Exist, Please Sinup First..!"))
        }

        const passCompare=await bcrypt.compare(password,user.password)
    
        const userId={
            user:{
                user:user.id
            }
        }
    
        if(!passCompare){
            res.status(401).json(new APIErrors(401,"Wrong Password..! ,Please Inpute  Valid Password."))
        }

        const authToken= jwt.sign(userId,process.env.JWT_SECRET)
    
    

        res.status(201).json(new APIResponce(201,authToken,"User Login SuccessFully..!"))
    } catch (error) {
        res.status(401).json(new APIErrors(401,"Internal Server Found",error))
    }
})

export default routes