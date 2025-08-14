import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';
import {ApiResponse} from '../utils/ApiResponse.js';
import Blog from '../models/blogModels.js';
import Comment from '../models/commentModels.js';

 export const adminLogin =asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

   if(email!==process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD){
    throw new ApiError(401,"Invalid credentaials");
   }
  const token =jwt.sign({email},process.env.JWT_SECRET)
  return res
  .status(200)
  .json({success:true,token});

})

export const getAllBlogsAdmin =asyncHandler(async(req,res)=>{
  const blogs = await Blog.find({}).sort({createdAt:-1});
  return res
  .json({success:true,blogs})
})

export const getAllComments =asyncHandler(async(req,res)=>{
  const comments = await Comment.find({}).populate("blog","title").sort({createdAt:-1})
    return res
  .json({success:true,comments})


})

export const getDashboard = asyncHandler(async(req,res)=>{
  const recentBlogs = await Blog.find({}).sort({createdAt:-1}).limit(5);
  const blogs =await Blog.countDocuments()
  const comments=await Comment.countDocuments()
  const drafts=await Blog.countDocuments({isPublished:false})

  const dashboardData={
    blogs,comments,drafts,recentBlogs
  }
  return res
  .json({success:true,dashboardData})
})

export const deleteCommentById=asyncHandler( async(req,res)=>{
  const {id}=req.body;
  await Comment.findByIdAndDelete(id);
  return res
  .json({success:true,message:"Comment deleted successfully"})
})

export const approveCommentById=asyncHandler( async(req,res)=>{
  const {id}=req.body;
  await Comment.findByIdAndUpdate(id,{isApproved:true},{ new: true });
  return res
  .json({success:true,message:"Comment approved successfully"})
})