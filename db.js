import dotenv from 'dotenv'
import mongoose from 'mongoose'
import APIErrors from './Utils/APIErrors.js'

dotenv.config()
const ConnectDb=async()=>{
try {
  const conect=  await mongoose.connect(process.env.MONGODB_URI,)

  if(conect){
    console.log("Your Data DB Successfully Conected")
   
  }
} catch (error) {
    throw new APIErrors(401,"DataBass Can Not Connected",error)
}
}

export default ConnectDb