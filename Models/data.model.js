import mongoose from "mongoose";

const dataSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    price:{
        type:Number,
        required:true
    },
    work:{
        type:Number,
        required:true
    },
    dailywork:{
        type:Number,
        default:function(){
            return this.price*this.work
        }
    },
    date:{
        type:String,
        default: function(){
            const d = new Date();
            let date=d.getDate();
            let month=d.getMonth()+1;
            let year=d.getFullYear()

const dateshow= `${date}/${month}/${year}`;
const part=dateshow.split('/')
return `${part[0].padStart(2,'0')}/${part[1].padStart(2,'0')}/${part[2]}`
        }
    },
    monthyear:{
        type:String,
        default: function(){
            const date=new Date();
            const monthName = date.toLocaleString('default', { month: 'long' });
            const year=date.getFullYear();
            return `${monthName}-${year}`

        }
    }
})

export const UserData=mongoose.model("UserData",dataSchema)
