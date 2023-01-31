const{Schema,model} = require('mongoose');

const tokenSchema = Schema({
    email:{
        type: String,
        required: true
    },
    verification_code:{
        type: String,
        required: true
    }
});

module.exports.email_verification = model('email_verification',tokenSchema);