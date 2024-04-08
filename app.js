//import  dotenv module for use
require('dotenv').config();
//import  express module for use
const express = require('express');
const app=express();
//import  morgan module for use
const morgan = require('morgan');
//import mongoose module for the mongoDB 
const mongoose = require('mongoose');
//import express-session module for the session 
const session = require('express-session');
//MongoDB session store for Express
const MongoStore = require('connect-mongo');

//apply Morgan middleware with the 'dev' format using app.use(morgan('dev')).
app.use(morgan('dev'));

//middleware functions provided by Express to handle parsing of JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded());

//Import the Book router
const bookRouter = require('./API/V1/Routes/BookRout');
//Import the User router
const userRouter = require('./API/V1/Routes/UserRout');

//Connection to mongoDB
const ConnStr = process.env.MONGO_CONN;
mongoose.connect(ConnStr +'SemiProject').then((status)=>{
    if (status)
        console.log('Connected to MongoDB');
    else
        console.log('Not connected');
});

//Print The Book Items in the mongoDB
const bookModle= require('./API/V1/Models/BookModel');
bookModle.find().then((data)=>{
    console.log(data);
});
//Print The User Items in the mongoDB
const userModel= require('./API/V1/Models/UserModel');
userModel.find().then((data)=>{
    console.log(data);
});

//time the session exist
const twentyMin = 1000 * 60 * 20;

//create session
app.use(session({
    secret:'NodeProject',
resave:false,
saveUninitialized:true,
cookie:{maxAge:twentyMin},
store:MongoStore.create({
    mongoUrl:ConnStr + 'SemiProject',
    collectionName:'sessionTable'
})
}));

//Use the Book Router
app.use('/book',bookRouter);
//Use the User Router
app.use('/user',userRouter);

// ensures that any request that doesn't match any other route in application will receive a 404 response.
app.all('*',(req,res)=>{
    return res.status(404).json({msg:'404 Not Found'});
});

module.exports=app;