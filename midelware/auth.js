const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()
const fetchuser=(req,res,next)=>{
    try {
        let token=req.header("auth-token")
        if(!token){
            res.status(401).send("Invalid Auth-Token")
        }
        
        const data=jwt.verify(token,process.env.JWT_SECRET)
        req.user=data.user;
        next();
        
    } catch (error) {
        res.status(4001).send("Found A middlwer problem")   
    }
}

module.exports=fetchuser