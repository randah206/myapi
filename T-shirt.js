const mongoose = require('mongoose');
let schema=mongoose.Schema;
let tshirt = new schema (

    {
       tshirtid:String,
       Tshirtname:String,
       Tshirtprice:Number,
       Tshirtcategoryid:String,
       Numberofavilabelitems:Number
    
    
    }
    )
    module.exports= mongoose.model('Tshirt', tshirt);

   
 