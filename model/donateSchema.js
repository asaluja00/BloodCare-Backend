const mongoose = require('mongoose');

const donateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    donaremail:{
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
    receiveremail:{
        type:String,
        require:false
    }
});

const Donate = mongoose.model('DONATE',donateSchema);

module.exports = Donate ; 