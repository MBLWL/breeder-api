const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type:String,minglength: 5,maxlength:50
    },
    email: {
        type:String,trim:true,unique: 1 
    },
    password: {
        type: String,minglength: 6
    },
    role : {
        type:Number,default: 0 //0 for regular,1 for admin
    },
    isAdmin:{ type:Boolean, default:false},
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Date
    },
    active : {
        type:Number,default: 0 //0 for not active,1 for active
    },
    secretToken:String,//for email confirmation
    resetToken:String,//for forget password
    //resetTokenExp:Date
})


userSchema.pre('save', function( next ) {
    var user = this;
    // downcase email
    user.email=this.email.toLowerCase()
    if(user.isModified('password')){    
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});



userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token =  jwt.sign(user._id.toHexString(),'secret')
    user.token = token;  
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;
    jwt.verify(token,'secret',function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}



const User = mongoose.model('User', userSchema);
module.exports = { User }