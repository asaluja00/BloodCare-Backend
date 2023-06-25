const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
  
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    bloodgroup:{
        type:String,
        require:true
    },
    weight:{
        type:Number,
        required:true
    },
    unitreceived:{
        type:Number,
        required:true
    },
    unitdonated:{
        type:Number,
        required:true
    }
});

const User = mongoose.model('USER',userSchema);

module.exports = User ; 