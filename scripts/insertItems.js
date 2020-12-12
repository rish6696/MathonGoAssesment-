

const cursor = db.getCollection('orders')
   .aggregate([
      {$match:{
         createdAt:{
            $gt: new ISODate("2019-12-05T12:30:11.053Z"),
            $lt: new ISODate("2023-12-05T12:30:11.053Z")
         }
      }},
      {
         $facet:{
            "totalOrders":[{
               $count:"total"
            }],
            "successfulTransactions":[
               {
                 $match: { paid:true }
               },
               {
                  $lookup:
                    {
                      from: "items",
                      localField: "item_id",
                      foreignField: "_id",
                      as: "itemInfo"
                    }
               },
               {
                  $addFields:{
                     itemInfo: { $arrayElemAt: [ "$itemInfo", 0 ] }
                  }
               },
               {
                  $group:{
                     _id:null,
                     count :{$sum:1},
                     volume : { $sum : "$amount" },
                     data : { $push:{
                        order_id:"$order_id",
                        payment_id:"$payment_id",
                        createdAt:"$createdAt",
                        updatedAt:"$updatedAt",
                        item_id:"$item_id",
                        item_name:"$itemInfo.title",
                        coupon:"$coupon",
                        amount:"$amount",
                        paid_status:"$paid",
                        phone:"$phone",
                        email:"$email",
                        utm_params_source:"$utm_params.source",
                        utm_params_medium:"$utm_params.medium",
                        utm_params_campaign:"$utm_params.campaign",
                        utm_params_term:"$utm_params.term"
                     }  }

                  }
               },
               {
                  $project:{count:1,volume :1,_id:0,data : 1 }
               }
            ]
         }
      }
      
   ])


// const cursor = db.createCollection( "items",
//     {
//       title:"string"
//     }
//  )

// const x = db.items.insertMany(itemsArray);

while (cursor.hasNext()) {
   printjson(cursor.next());
}




