
import { Document,Types } from 'mongoose'
interface orderModelInterface extends Document {
    _id :Types.ObjectId
    item_id : Types.ObjectId;
    coupon : string;
    amount: number;
    paid: boolean;
    phone :string;
    email:string;
    utm_params:{
        source:string;
        medium:string;
        campaign :string;
        term : string;
    };
    order_id:string;
    payment_id:string;
    createdAt :Date;
    updatedAt:Date
}

export default orderModelInterface
