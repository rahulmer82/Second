import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import APIErrors from '../Utils/APIErrors.js'
dotenv.config()
const fetchuser=(req,res,next)=>{
    try {
        let token=req.header("auth-token")
        if(!token){
            res.status(401).json(new APIErrors(401,"Login Is Required"))
        }
        
        const data=jwt.verify(token,process.env.JWT_SECRET)
        req.user=data.user;
        next();
        
    } catch (error) {
        res.status(401).json(new APIErrors(401,"Midleware Server Problem found",error))   
    }
}

export default fetchuser