import { Document,Types } from 'mongoose'

interface ItemInterface extends Document {
    title : string,
    _id : Types.ObjectId,
    createdAt :Date,
    updatedAt:Date
}

export default ItemInterface
