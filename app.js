//packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const socket = require('./socket');
const redis = require('redis');

//routes
const userRoutes = require('./routes/user');
const portfolioRoutes = require('./routes/portfolio');
const testLab = require('./routes/testLab');


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
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Request-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

//test 

app.use('/user', userRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/testLab', testLab)

app.use(multer({storage:fileStorage}).single('image'));
app.use('/images',express.static(path.join(__dirname,'images')));

mongoose.connect('mongodb+srv://sohail:987654321@cluster0-qngvp.mongodb.net/test_lab?retryWrites=true&w=majority').then(result=>{
    const server=app.listen(process.env.PORT || 5000,()=>{
        socket(server);        
    });
}).catch(err=>console.log(err));