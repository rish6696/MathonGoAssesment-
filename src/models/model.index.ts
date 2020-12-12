import  StoreSchema  from "./Item";
import Mongoose from "mongoose";
import OrderInterface  from "../interfaces/order";
import ItemInterface from '../interfaces/item'
import OrderSchema from "./Order";
import ItemSchema from "./Item";

export const OrderModel = Mongoose.model<OrderInterface>("orders", OrderSchema);
export const ItemModel =Mongoose.model<ItemInterface>("items",ItemSchema);
