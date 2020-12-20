const mongoose = require('mongoose');
let schema=mongoose.Schema;
let category = new schema (

    {
        C_id:String,
       categoryname:String


    
    })
    module.exports= mongoose.model('newCategory', category);