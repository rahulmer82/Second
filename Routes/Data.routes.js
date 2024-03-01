import  express from 'express'
import {UserData}  from '../Models/data.model.js'
import fetchuser from '../midelware/auth.js'
import APIErrors from '../Utils/APIErrors.js'
import APIRescponce from '../Utils/APIResponce.js'
const routes=express.Router()

routes.get('/mydata',fetchuser,async(req,res)=>{
try {
const data=await UserData.find({user:req.user.id})
if(!data){
    throw new APIErrors(401,'No Data Found')
}
res.status(201).json(new APIRescponce(201,data,"Data SuccessFully Fetched..!"))
    
} catch (error) {
    res.status(401).json(new APIErrors(401,error.message,error))
}
})

//add data

routes.post('/addwork',fetchuser,async(req,res)=>{
    try {
        const{price,work}=req.body


        const Newnote= await new UserData({price,work,user:req.user.id})

        if(!Newnote){
            throw new APIErrors(401,"Work Data Not Found..")
        }
       
        const data=await Newnote.save()
        res.status(201).json(new APIRescponce(201,data,"Work Data Added Succesfully...!"))
        
    } catch (error) {
        res.status(402).json(new APIErrors(402,error.message,error))
    }

})

//delete data

routes.delete('/delete/:id',fetchuser,async(req,res)=>{
    try {
        let data=await UserData.findById(req.params.id)
        if (!data) {
            throw new APIErrors(401,"This Work Data is not Exist.")
          }
          data=await UserData.findByIdAndDelete(req.params.id);
          res.status(200).json(new APIRescponce(201,data,"Work Data Deleted Succesfully..!"));
        
    } catch (error) {
        res.status(402).json(new APIRescponce(402,"Internal Server Error Found",error))
    }
})

//update notes

routes.patch('/update/:id',fetchuser,async(req,res)=>{
    try {
        const {price,work,date}=req.body
        const newdata={}
        if(price){newdata.price=price}
        if(work){newdata.work=work}
        if(date){newdata.date=date}

        let note=await UserData.findById(req.params.id)
      if(!note){
          throw new APIErrors(401, "Data Not Found...!")
        }
        // if(note.user.toString() !==req.user.id){
        //   throw new APIErrors(401,"This Is not Vaid Requiest..")
        // };

         note=await UserData.findByIdAndUpdate(req.params.id,{$set:newdata},{new:true})

         res.status(201).json(new APIRescponce(201,note,"Data  SuccessFully Updated..!"))
    } catch (error) {
        res.status(402).json(new APIErrors(402,"Internal Server Errors",error))
    }
})

export default routes