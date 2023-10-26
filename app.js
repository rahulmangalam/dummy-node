const express = require("express");
const mongoose =require("mongoose");
const User = require('./models/user');
const app =express();

app.use(express.json());
require('dotenv/config');

const port = process.env.PORT;
const dbName = process.env.DB_NAME;
const connString =process.env.CONNECTION_STRING;

app.use('/',(req,res,next)=>{
    console.log("api logs");
    next();
});


//get 
app.get('/get-user',async(req,res)=>{
    try{
        const user = await User.find({});
        res.status(200).json({message:'user detail faithced',user});

     } catch(error){
         res.status(500).json({message:error.message});
     }
})

//post

app.post('/add',async(req,res)=>{
    try{
        const user = await User.create(req.body);
        res.status(200).json({message:'user added',user});

     } catch(error){
         res.status(500).json({message:error.message});
     }
})

//put
app.put('/update-user/:id',async(req,res)=>{
    try{
        const {id} =req.params;
        const user = await User.findByIdAndUpdate(id,req.body);
        console.log(user)
        res.status(200).json({message:'user updated',user});
    } catch(error){
        res.status(404).json({message:error.message});
    }
});

//patch
app.patch('/update-name/:id',async(req,res)=>{
    try{
        const {id} =req.params;
        const {name} =req.body;
        const user = await User.updateOne({
            "_id": id
          },
          {
            "$set": {
                "name":name
            }
          });
        res.status(200).json({message:'user updated',user});
    } catch(error){
        res.status(404).json({message:error.message});
    }
});

//delete
app.delete('/delete-user/:id',async(req,res)=>{
    try{
        const {id} =req.params;
        const user = await User.deleteOne({"_id": id});
        res.status(200).json({message:'user deleted',user});
    } catch(error){
        res.status(404).json({message:error.message});
    }
});


mongoose.connect(connString,{ dbName })
.then(_ => console.log("CONNECTION WITH DB ESTABLISHED SUCCESSFULLY!"))
.catch(_ => console.error("ERROR IN ESTABLISHING CONNECTION WITH THE DB."));

app.listen(port,()=>{
    console.log("server started!");
});