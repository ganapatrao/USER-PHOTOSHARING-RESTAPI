 
 var express= require('express');
var mongoose = require('mongoose')

var pictureschema = mongoose.Schema(
    {
       // username:{type:String},
        picname:{type:String},
        userid:{type:Number},
        date:{type:Date,default:Date.now},
        pictype:{type:String},
        url:{type:String}
    }
)


var picture =mongoose.model('picture',pictureschema);
module.exports=picture