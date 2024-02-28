const dotenv = require('dotenv');
const mongoose=require('mongoose');

dotenv.config()
const ConnectDb=async()=>{
try {
  const conect=  await mongoose.connect(process.env.MONGODB_URI,)

  if(conect){
    console.log("Your Data DB Successfully Conected")
   
  }
} catch (error) {
    console.log(`Databass Conection Faill..`,error)
}
}

module.exports=ConnectDb;