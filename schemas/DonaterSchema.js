const mongoose = require("mongoose")

const DonaterSchema = new mongoose.Schema({
    fname:String,
    lname:String,
    number:String,
    addr:String,
    pincode:{type:Number,required:true},
    maps:String,
    // usertype:{type:Number,required:true},
    email:String,
    //Only Will APPLY ON DONATORS//
    foodtype:Number,
    servings:Number,
    expiry:String,
    Notes:String,
    status:{type:Number,default:0},
    jobid:{type:String,default:null},
    jobotp:{type:String,default:null}


})

module.exports = mongoose.model( 
    'Donater', DonaterSchema, 'DonaterCOllection'); 