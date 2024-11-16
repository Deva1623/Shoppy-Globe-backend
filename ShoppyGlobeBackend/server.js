import express from 'express';
import mongoose from 'mongoose';
import open from 'open';
import app from './app.js';

const mongoURL = 'mongodb://localhost:27017/shoppyglobe';
const port = 5555;

mongoose.connect(mongoURL)
.then(()=>console.log('connected to mongoDB'))
.catch((error)=>console.log('connection error' ,error));


app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
    open(`http://localhost:${port}`)

})
