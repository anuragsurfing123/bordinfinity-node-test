const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const SampleSchema=new Schema({

    
    task_name:{
        type:String,
        required:true
    },
   task_description:{
       type:String,
       required:true
   },
   creator:{
    type:String,
    required:true

   },
duration:{
     type:Number,
   
    

   },
    createdAt:{
        type:Date,
        
        default:Date.now,
        
        },
        
    
});


module.exports=Person=mongoose.model("mySchema",SampleSchema);