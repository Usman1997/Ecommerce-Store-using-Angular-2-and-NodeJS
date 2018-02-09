const express  = require('express');
const router = express.Router();
const User  = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config =require('../config/database');
const Product = require('../models/products');
router.post('/register',(req,res,next)=>{
    let newUser = new User({

         name : req.body.name,
         email :req.body.email,
         username :req.body.username,
         password : req.body.password
    });
    User.addUser(newUser,(err,user)=>{
  
        if(err){
           return res.json({success:false,msg:'Fail to register user'});

        }else{
            return res.json({success:true,msg:'User Registered'});
        }
    });
})

router.post('/authenticate',(req,res,next)=>{
 const username = req.body.username;
 const password = req.body.password;
 
 User.getUserByUsername(username,(err,user)=>{
    if(err){
        throw err;
    } 
    if(!user){
       return res.json({success:false,msg:'User not found'});
    }
    User.comparePassword(password,user.password,(err,isMatch)=>{
        if(err)throw err;
        if(isMatch){
           const token = jwt.sign({data:user},config.secret,{
               expiresIn : 604800
           });
       
           res.json({
               success :true,
               token : 'Bearer '+token,
               user:{
                   id : user._id,
                   name:user.name,
                   username:user.username,
                   email:user.email
       
               }
           });
        }else{
           return res.json({success:false,msg:'Wrong Password'});
        }
    });
});

});

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{

          res.json({user:req.user});
});

router.get('/getProducts',(req,res,next)=>{

    Product.find({},(err,products)=>{
   
    if(err){
     res.json({success:false,msg:err});
    }
    else if(!products){
     res.json({success:false,msg:'No Products'});
   
    }else{
     res.json({success:true,products:products});
    }
   
    }).sort({'_id':-1});
   
   });

   router.get('/add-to-cart/:id',function(req,res,next){
   
      var ProductId = req.params.id;
      var cart = new cart(req.session.cart ? req.session.cart : {});
      Product.findById(ProductId,function(err,product){
                 if(err){
                     res.json({success:false,msg:err});
                 }
                 cart.add(product,product.id);
                 req.session.cart = cart;
                 console.log(req.session.cart);
      });

   });
   

module.exports = router;