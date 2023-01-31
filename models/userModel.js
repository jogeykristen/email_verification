const {Schema, model} = require('mongoose');

const userSchema = Schema({
    
    email:{
        type: String,
        required:true
    },
    
},{timestamps:true});

module.exports.User = model('user',userSchema);