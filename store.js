
const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectID
let schema=mongoose.Schema;
let store = new schema (
    {    
      
        
        storeId:String,
        tshirts:[ { type : ObjectId,ref:'Tshirt'}],
        newcategores:[{ type : ObjectId,ref:'newCategory'}],
        
        orders:[{type: ObjectId,ref:'Order'}]
      

    }
)
module.exports= mongoose.model('Store', store);