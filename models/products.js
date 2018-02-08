const mongoose = require('mongoose');
const config = require('../config/database');


const ProductSchema = mongoose.Schema({

   title : {type:String,required:true},
   description :{type:String,required:true},
   ImagePath :{type:String,required:true},
   price : {type:Number,required:true},


});

const Product = module.exports = mongoose.model('Products',ProductSchema);