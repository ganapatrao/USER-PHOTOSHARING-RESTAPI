var express= require('express');
var mongoose = require('mongoose')

var userschema = mongoose.Schema(
    {
        username:{type:String},
        userid:{type:Number,require},
        email:{type:String},
        contactno:{type:Number}
    }
)


var user =mongoose.model('user',userschema)
module.exports=user