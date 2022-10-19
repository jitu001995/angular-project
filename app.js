const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require('mongoose');

require('dotenv/config')

const api= process.env.API_URL
//Middleware
app.use(express.json());
app.use(morgan('tiny'))

//mongodb connection
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
}).then(()=>{
    console.log('Database connection is ready');
}).catch((err)=>{
    console.log(err);
})

//schema 
const productSchema=mongoose.Schema({
    name:String,
    image:String,
    countInStock:Number
})
const product = mongoose.model('product',productSchema);

app.get(`${api}/products`,(req,res)=>{
    //res.send('helllo API !');
    const product ={
        id:1,
        name:'hair dresser',
        image:"some_url"
    }
    res.send(product);
})


app.post(`${api}/products`,(req,res)=>{
    //res.send('helllo API !');
   const products = new product({
     name:req.body.name,
     image:req.body.image,
     countInStock:req.body.countInStock
   })
   products.save().then((createdProduct=>{
    res.status(201).json(createdProduct)
   })).catch((err)=>{
    res.status(500).json({
        error:err,
        success:false
    })
   })
})



app.listen(3000,()=>{
    console.log(api);
    console.log(`server is running on http://localhost:3000`);
})