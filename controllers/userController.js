const bcrypt = require('bcrypt');
const nodemailer =  require('nodemailer');
const otpGenerator = require('otp-generator');
const { MailtrapClient } = require("mailtrap");
const _ = require('lodash');


const {User} = require('../models/userModel');
const {email_verification} = require('../models/token');


module.exports.signUp = async(req,res) =>{
    console.log("Email = ",req.body.email)
    const user = await User.findOne({
        email: req.body.email
    })
    if(user)return res.status(400).send("User already registered")
    const OTP = otpGenerator.generate(6,{
        digits: true,
        alphabets: false,
        upperCaseAlphabets: false,
        lowerCaseAlphabets:false,
        specialChars: false
    })
    console.log(OTP)

    // 
    const email =  req.body.email;
    const name =  req.body.name;

    const otp = new email_verification({email: email,verification_code:OTP})
    console.log("otp = ",otp);
    console.log("otp.otp = ",otp.verification_code);
    const saltRounds =await bcrypt.genSalt(10);
    otp.verification_code = await bcrypt.hash(otp.verification_code, saltRounds)
    const result = otp.save();
    return res.status(200).send("otp send successfully");
}

module.exports.verifyMail = async(req,res)=>{
    console.log("hi")
    const otpHolder = await email_verification.find({
        email:req.body.email
    })
    if (otpHolder.length == 0)return res.status(400).send("user token expired")
    const rightotpHolder = otpHolder[otpHolder.length-1];
    // console.log("again = ",rightotpHolder.verification_code)
    // console.log("data = ",req.body.verification_code)
    const validUser = await bcrypt.compare(req.body.verification_code,rightotpHolder.verification_code);
    if(rightotpHolder.email === req.body.email && validUser){
        const user = new User(_.pick(req.body,["email"]))
        const result = await user.save();
        const OTPDelete = await email_verification.deleteMany({
            email:rightotpHolder.email
        })
        return res.status(200).send({
            message: "User registerd successfully",
            //token: token,
            data: result 
        })
    }else{
        return res.status(400).send("Wrong otp")
    }
    
}
