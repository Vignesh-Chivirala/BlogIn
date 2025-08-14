import mongoose,{Schema} from "mongoose";


const blogSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    subTitle:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    isPublished:{
        type:Boolean,
        default:false,
    }  
    
},{timestamps:true})

const Blog = mongoose.model('Blog',blogSchema)
export default Blog;