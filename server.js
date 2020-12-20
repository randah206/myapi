const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
const db = mongoose.connect('mongodb://localhost/shop',{
     useNewUrlParser: true,
useUnifiedTopology: true,}
)
let Tshirt = require ('./onlineshop/T-shirt')
let Store =require('./onlineshop/store');
let newCategory=require('./onlineshop/newcategory')
let Order=require('./onlineshop/order');


app.post('/T-shirt', function(req,res)
{
    let newtshirt=new Tshirt ()
       newtshirt. tshirtid =req.body. tshirtid;
       newtshirt.Tshirtname=req.body.Tshirtname;
      newtshirt.Tshirtprice=req.body.Tshirtprice;
       newtshirt.Tshirtcategoryid=req.body.Tshirtcategoryid;
       newtshirt.Numberofavilabelitems=req.body.Numberofavilabelitems;
    
    newtshirt.save(function(err,newTshirt)
    {
        if (err){
            res.status(500).send( {error :"couldn't add new tshirt"})


        }
        else{
            res.send(newTshirt)
        }
    }
    )

}
)
 app.get('/T-shirt' ,function (req,res) {
     Tshirt.find({},function(err,tshirts)
    {
      if(err){
            res.status(500).send({Error:"couldn't get newtshirt"})
         }else{
            res.send(tshirts)
        }

   
    }
    )
})


app.post('/newcategory', function(req,res)
{
    let Newcategory =new newCategory ()
    Newcategory._id=req.body._id;
    Newcategory.categoryname=req.body.categoryname;
      
    
    Newcategory.save(function(err,NewCategory)
    {
        if (err){
            res.status(500).send( {error :"couldn't add new one"})


        }
        else{
            res.send(NewCategory)
        }
    }
    )

}
)
app.post('/store', function(req,res) {

    let newstore = new Store ()
    
    newstore.storeId=req.body.storeId
 
    newstore.save(function(err,saveditems)
    {
        if (err){
            res.status(500).send( {error :"couldn't find the store"})


        }
        else{
            res.send(saveditems)
        }
    }
    )

}
)




    app.post('/order', function(req,res)
{
    let neworder=new Order ()
    neworder._id=req.body._id
    neworder.ordernum=req.body.ordernum
    neworder.TshirtID=req.body.TshirtID
    neworder.Orderdatetime=req.body.Orderdatetime
    neworder.custmorphonum=req.body.custmorphonum
    
   neworder.save(function(err,neworder)
    {
        if (err){
            res.status(500).send( {error :"couldn't add new oredr"})


        }
        else{
            res.send(neworder)
        }
    }
    )

}
)
app.get('/store' ,function (req,res){

    Store.find({}).populate(
      [ { 
           path :'orders',
        model:'Order',
    },{ path:'newcategores',
    model:'newCategory'
    },
    {path:'tshirts',
    model:'Tshirt'

    }

       ]
    )
    .exec(function(err,shop)
    {
      if(err){
          res.status(500).send({Error:"couldn't find new order"})
      }else{
  res.send(shop);
      }}
      )
  })
  
  app.put('/store/Tshirt/add' ,function (req,res)
  {
      
      let orderID= req.body.orderId
   
      let storeID= req.body.storeId

      Order.findOne({_id:orderID},function(err,order)
      {
          if(err){
              res.status(500).send({Error:"coudnt find new order"})

          }
            else{
     Store.updateOne({_id:storeID},{$inc:{ Numberofavilabelitems:-1},$addToSet:{orders:order._id}},function(err,status){
        if(err){
            res.status(500).send({err:"coudnt find new order"})

        }else{
            res.send(status)
        }
                 }
          )
      }
      
    }
    )
}
    )


//   app.put('/store/Tshirt/add' ,function (req,res)
//   {
//       let categoryID= req.body.categorytId
//       let storeID = req.body.storeId
//      newCategory.findOne({_id :categoryID},function(err,category)
      
//       {
//           if(err){
//               res.status(500).send({Error:"couldn't find the new category"})
//           }else{
//               newCategory.updateOne({_id:storeID},
//                   {$addToSet:{ newcategores:category._id}},function(err,status){
//                       if(err) {  res.status(500).send({Error:"couldn't update the store"})
  
  
//                       }else{
//                           res.send(status)
//                       }
//                   })
//           }
  
//   } 
//    )
  
  
//   })

//   app.put('/store/Tshirt/add' ,function (req,res)
//   {
//       let tshirtID= req.body.tshirtId
//       let storeID = req.body.storeId
//      Tshirt.findOne({_id:tshirtID},function(err,tshirt)
      
//       {
//           if(err){
//               res.status(500).send({Error:"couldn't find the new tshirt"})
//           }else{
//               Store.updateOne({_id:storeID},
//                   {$addToSet:{tshirts:tshirt._id}},function(err,status){
//                       if(err) {  res.status(500).send({Error:"couldn't update the store"})
  
  
//                       }else{
//                           res.send(status)
//                       }
//                   })
//           }
  
//   } 
//    )
  
  
//   })
  



app.listen(3001,function () {
    console.log("servsr is running");

})
      