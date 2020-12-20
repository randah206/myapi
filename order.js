const mongoose = require('mongoose');
let schema=mongoose.Schema;
let order = new schema (
    {
        o_id:String,
        ordernum:Number,
        TshirtID:String,
        Orderdatetime:Number,
        custmorphonum:Number
    }
)
module.exports= mongoose.model('Order', order);