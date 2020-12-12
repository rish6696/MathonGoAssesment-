import mongoose, { Schema } from "mongoose";

const ItemSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
},{timestamps:true});

export default ItemSchema;
