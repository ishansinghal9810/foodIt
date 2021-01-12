const express = require("express")
const mongoose = require("mongoose")
const app = express()
const bodyparser = require('body-parser') 
const Volunteer = require("./schemas/VolunteerSchema.js")
const Donater = require("./schemas/DonaterSchema.js")
const {v4 : uuidv4} = require('uuid')
const sendMail = require("./email.js")

//Mongoose COnfig//
mongoose.connect("mongodb://127.0.0.1:27017/foodItDev", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
})

//app configs//
app.set("view engine","ejs")
app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 


//IMPORTANT FUNCTIONS//

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



//ROUTES//

app.get("/",function(req,res){
    res.render("index.ejs")
})


app.post("/volunteer",function(req,res){
    jobid = uuidv4()
    jobotp = getRandomInt(9999)
    req.body.jobid = jobid
    req.body.jobotp = jobotp
    let volunteer = new Volunteer(req.body);
    volunteer.save(function(err,data){
        if(err){
            console.log(err)
        }
        else{
            console.log("Data Inserted")
            console.log(volunteer)
            res.send("OK Thanks For Your Registration WE WILL CONTACT YOU ASAP...")
        }
    })
})

app.post("/donate",function(req,res){
    jobid = uuidv4()
    jobotp = getRandomInt(9999)
    req.body.jobid = jobid
    req.body.jobotp = jobotp
    let donation = new Donater(req.body);
    donation.save(function(err,data){
        if(err){
            console.log(err)
        }
        else{
            console.log("Data Inserted")
            console.log(donation)
            Donater.find(function(err,data){
                if(err){
                    console.log(err)
                }
                else{
                    Volunteer.find({ pincode: {$eq:req.body.pincode}},function(err,foundedVolunteers){
                        if(err){
                            console.log(err)
                        }
                        else{
                            console.log("GOT THE DATA")
                            foundedVolunteers.forEach(function(volunteer){
                                sendMail(volunteer.email,0,req.body)
                            })
                        }
                    })
                }
            })
            res.send("WE WILL INFORM YOU ASAP !!!... ")
        }
    })
})

app.get("/confirmJob/:jobid",function(req,res){
    Donater.find({jobid:{$eq:req.params.jobid}},function(err,foundedJob){
        if(err){
            console.log(err)
            res.redirect("/")
        }
        else{
            console.log("GOT THE JOB")
            sendMail(foundedJob[0].email,2)
        }
    })
})

app.listen("3000",function(err){
    if(err){
        console.log(err)
    }
    else{
        console.log("Server Started")
    }
})


