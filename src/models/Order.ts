import mongoose, { Schema } from "mongoose";

const OrderSchema: Schema = new mongoose.Schema({
  item_id : { type: mongoose.Types.ObjectId, required: true,ref:"items" },
  coupon : {type:String,required:true },
  amount : {type:Number,required:true },
  paid: { type: Boolean, required: true },
  phone :{ type:String ,required:true},
  email :{ type:String ,required:true},
  utm_params :{
     source : { type:String,required:true },
     medium :{type:String,required:true},
     campaign :{type:String,required:true},
     term : {type:String,required:true}
  },
  order_id :  { type:String ,required:true},
  payment_id :{ type:String ,required:true},
},{timestamps:true});

export default OrderSchema;


