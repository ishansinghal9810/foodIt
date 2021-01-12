const mongoose = require("mongoose")

const VolunteerSchema = new mongoose.Schema({
    fname:String,
    lname:String,
    number:String,
    addr:String,
    pincode:Number,
    maps:String,
    usertype:Number,
    email:String,
    //Only For Volunteer //
    timeset:Number,
    transportType:Number,
    distance:Number,
    jobid:{type:String,default:0},
    jobotp:{type:String,default:0}

})

module.exports = mongoose.model( 
    'Volunteer', VolunteerSchema, 'VolunteerCOllection'); 