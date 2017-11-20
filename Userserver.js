var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser')


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


var db = mongoose.connect('mongodb://localhost/Mydb',{ useMongoClient: true});
var user = require('./model/userschema');
var userpic = require('./model/pictureschema');

//var userrouter = express.Router();
userrouter =require('./route/userroute')(user);
var userpicrouter = express.Router();

userpicrouter.use('/pic/new',function(req,res,next)
{
      var passeduserid=req.body.userid    
           user.find({userid:passeduserid},function(err,response){
                 if (err)
            console.log(err)
            else if (response.length)
           {
            req.userdata=response;            
            next();
           }
           else if(!response.length)
           {
               res.status(404).send('please pass correct userid to update the picture');
           }  
        });

});

userpicrouter.route('/pic/new')
            .post(function(req,res){
                var newuserpic = new userpic(req.body);
                newuserpic.save();   
                res.send(newuserpic)  ;
                });

userpicrouter.route('/pic')
            .get(function(req,res){
                userpic.find(req.query,function(err,result){
                    res.json(result);
                })  
            })

   
        userpicrouter.route('/pic/:id')
        .get(function(req,res){
            userpic.findById(req.params.id,function(err,result){
          //  console.log(req.params);
                res.json(result)   
            
            })
        })

        .put(function(req,res){
            userpic.findById(req.params.id,function(err,result){                            
                user.find({userid:req.body.userid},function(err,response){                    
                    if (err)
                    console.log(err)
                    else if (response.length)
                   {
                        //result.username=req.body.username;
                        result.picname=req.body.picname;
                        result.pictype=req.body.pictype;
                        result.url=req.body.url;
                        result.date=req.body.date;
                        result.save();
                        res.json(result);
                   }
                   else if(!response.length)
                   {
                       res.status(404).send('pass correct user id to update');
                   } 
                })              
                
            });

        })

        .patch(function(req,res){
            userpic.findById(req.params.id,function(err,result){
                for (var x in req.body)
                {
                    result[x]=req.body[x];
                }
                    result.save();
                    res.json(result);
            })

        })
        .delete(function(req,res)
            {
                userpic.findById(req.params.id,function(err,result){

                    result.remove();
                    res.json('Deleted')

                });

            });
         // --end of picture  API 

          app.use('/API',userrouter);
          app.use('/API',userpicrouter);


var port =process.env.port||3000;

app.get('/',function(req,res){res.send('welcome')})

app.listen(port,function(){console.log('running')});



