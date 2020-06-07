//packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

//routes
const userRoutes = require('./routes/users');


const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        cb(null,"zeek-"+file.originalname);
    }
});

app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,UPDATE');
    res.setHeader('Acess-Control-Allow-Headers','Content-Type','Authorization');
    next();
})

app.use('/user',userRoutes);

app.use(multer({storage:fileStorage}).single('image'));
app.use('/images',express.static(path.join(__dirname,'images')));

mongoose.connect('mongodb+srv://sohail:987654321@cluster0-qngvp.mongodb.net/test_lab?retryWrites=true&w=majority').then(result=>{
    const server=app.listen(8080,()=>{
        console.log("Server and database started!");
    });
}).catch(err=>console.log(err));