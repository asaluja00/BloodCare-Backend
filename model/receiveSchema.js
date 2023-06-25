const mongoose = require('mongoose');

const receiveSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true
    },
    receiveremail:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    bloodgroup:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    donaremail:{
        type:String,
        require:false
    }
});

const Receive = mongoose.model('RECEIVE',receiveSchema);

module.exports = Receive ; 