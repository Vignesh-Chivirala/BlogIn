import mongoose,{Schema} from "mongoose";


const commentSchema =new Schema({
   blog:{
    type:Schema.Types.ObjectId,
    ref:'Blog',
    required:true
    },
    name:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    isApproved:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Comment = mongoose.model('Comment',commentSchema)
export default Comment;