const express=require('express');
const mongoose = require('mongoose');
const bodyparser=require('body-parser');
 var CronJob = require('cron').CronJob;
var app=express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

const db =require("./url/myurl").mongoURL; 


mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    .then(()=>console.log('mongo db connected Successfully'))
    .catch(err=>console.log(err));

    const Person=require("./models/schema");


    app.get('/',(req,res)=>{
        res.send('Hello I am anurag Mishra In big Stack');
    });


app.post('/add',(req,res)=>{
    const newSchema= new Person({
        task_name:req.body.task_name,
        task_description:req.body.task_description,
        creator:req.body.creator,
        duration:req.body.duration,

    });

    newSchema
    .save()
    .then(person => res.json(person))
    .catch(err => console.log(err))
})


app.get("/list",
 
 (req, res) =>{
        Person.find()
        .then(lists=>{
            res.json(lists)
        }).catch(err=>console.log(err));
    }
);



var job = new CronJob('* * * * * *', function(req,res) {
    Person.find().then(lists=>{
        // var data =lists.map(v=>{
        //     console.log(v.createdAt);
        // })
        var len=lists.length
       
        for(i=0;i<len;i++){
            
            var y=new Date;
        // console.log(y);
        var z=y.setMinutes(y.getMinutes());
        // var z1=(lists[i].createdAt).setMinutes((lists[i].createdAt).getMinutes());
        // console.log(z);
        // console.log(z1);
        var x=((lists[i].createdAt).setMinutes( (lists[i].createdAt).getMinutes()) + (lists[i].duration)*1000*60 );
        // console.log(x)
         if(z>=x){
             Person.findOneAndDelete().then(lists=>{
                 console.log("dataremoved")
             }).catch(err=>console.log(err))
         }

        }
        
        
        
    }).catch(err=>console.log(err))
    
  }, null, true, 'America/Los_Angeles');
  job.start();


    const port=process.env.PORT || 4000;

    app.listen(port,()=>console.log(`Server is running at port ${port}`))