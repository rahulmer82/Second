import  express from 'express'
import {UserData}  from '../Models/data.model.js'
import fetchuser from '../midelware/auth.js'
const routes=express.Router()

routes.get('/mydata',fetchuser,async(req,res)=>{
try {
const data=await UserData.find({user:req.user.id})
if(!data){
    res.status(401).send("usedata Not Found")
}
res.json(data)
    
} catch (error) {
    res.status(402).send("Internal Server problem")
}
})

//add data

routes.post('/addwork',fetchuser,async(req,res)=>{
    try {
        const{price,work}=req.body


        const Newnote= await new UserData({price,work,user:req.user.id})
       
        const data=await Newnote.save()
        res.status(201).json(data)
        
    } catch (error) {
        res.status(402).send("Internal Server problem")
    }

})

//delete data

routes.delete('/delete/:id',fetchuser,async(req,res)=>{
    try {
        let data=await UserData.findById(req.params.id)
        if (!data) {
            return res.status(400).send("No User is found by this id");
          }
          console.log("user",data)
          data=await UserData.findByIdAndDelete(req.params.id);
          res.status(200).json({"sucess: your data ScessFully Deleted":data});
        
    } catch (error) {
        res.status(402).send("Internal Server problem")
    }
})

//update notes

routes.put('/update/:id',fetchuser,async(req,res)=>{
    try {
        const {price,work,date}=req.body
        const newdata={}
        if(price){newdata.price=price}
        if(work){newdata.work=work}
        if(date){newdata.date=date}

        let note=await UserData.findById(req.params.id)
      if(!note){
          return res.status(400).send("Not Found Data")
        }
        if(note.user.toString() !==req.user.id){
          return res.status(401).send("This is not Valid Action")
        };

         note=await UserData.findByIdAndUpdate(req.params.id,{$set:newdata},{new:true})

         res.status(201).json({note})
    } catch (error) {
        res.status(402).send("Internal Server problem")
    }
})

export default routes