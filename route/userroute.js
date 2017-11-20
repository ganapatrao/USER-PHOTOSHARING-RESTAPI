var express = require('express');
var mongoose = require('mongoose');
//var user = require('./model/userschema');

var user = function(userdata){

    var userrouter = express.Router()
    userrouter.route('/user')
    .post(function(req,res){
        var newuser = new userdata(req.body);
        newuser.save();   
        res.send(newuser)  ;        

    })

    .get(function(req,res){
        
        userdata.find(req.query,function(err,result){
         //  res.send("hi")
          res.json(result);
      })  
    })

    userrouter.route('/user/:id')
              .get(function(req,res){
                userdata.findById(req.params.id,function(err,result){
                  //console.log(req.params);
                      res.json(result)   
                  
                  })
              })

              .put(function(req,res){
                userdata.findById(req.params.id,function(err,result){
                     //console.log(req.body);
                     
                     result.username=req.body.username;
                      result.email=req.body.email;
                     result.contactno=req.body.contactno;
                     result.userid=req.body.userid;
                     result.save();
                     res.json(result);
                  });

              })

              .patch(function(req,res){
                userdata.findById(req.params.id,function(err,result){
                      for (var x in req.body)
                      {
                          result[x]=req.body[x];
                      }
                          result.save(function(err){
                              if (err)
                             res.status(500).send(err)
                             else
                             res.json(result);
                          });
                          //res.json(result);
                  })

              })
              .delete(function(req,res)
                  {
                    userdata.findById(req.params.id,function(err,result){

                          result.remove();
                            res.send('Deleted')
                      });

                  });

                  return userrouter;


}

module.exports=user