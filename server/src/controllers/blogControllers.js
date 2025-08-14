import main from '../db/gemini.js'
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from 'fs'
import imagekit from '../db/imageKit.js'
import Blog from "../models/blogModels.js";
import Comment from "../models/commentModels.js";

export const addBlog =asyncHandler( async(req,res)=>{
    const {title,description,subTitle,category,isPublished}=JSON.parse(req.body.blog);

    const imageFile =req.file;
    if(!title || !description || !category || !imageFile){
        throw new ApiError(401,"Missing required fields")
    }

    const fileBuffer=fs.readFileSync(imageFile.path)
    const response =await imagekit.upload({
        file:fileBuffer,
        fileName:imageFile.originalname,
        folder:"/blogs"
    })

    const optimizedImageUrl= imagekit.url({
        path:response.filePath,
        transformation:[
            {quality:'auto'},
            {format:'webp'},
            {width:'1280'}
        ]
    })

    const image = optimizedImageUrl;
    await Blog.create({title,subTitle,description,category,image,isPublished})

    return res
    .status(200)
    .json({success:true,message:"Blog added Successfully"})


})

export const getAllBlogs =asyncHandler( async(req,res)=>{
    
        const blogs = await Blog.find({isPublished:true})
        return res
        .status(200)
        .json({success:true,blogs})
})

export const getBlogById=asyncHandler(async(req,res)=>{

        const blogId=req.params.blogId;
        
        const blog =await Blog.findById(blogId)
        if(!blog){
            throw new ApiError(401,"message:blog not found")
        }

        return res
        .json({success:true,blog})
        
})

export const deleteBlogById=asyncHandler(async(req,res)=>{
  
        const {id}=req.body;
        await Blog.findByIdAndDelete(id)

        await Comment.deleteMany({blog:id})
        return res
        .json({success:true,message:"Blog deleted successfully"})
   
})

export const togglePublish = asyncHandler(async(req,res)=>{
        const {id}=req.body;
        const blog =await Blog.findById(id)
        blog.isPublished=!blog.isPublished;
        await blog.save();
        return res
        .json({success:true,message:"Blog status updated"})


})


export const addComment =asyncHandler(async(req,res)=>{
    const {blog,name,content}=req.body;
    await Comment.create({blog,name,content});
    return res.json({success:true,message:"Comment added for review"})

})

export const getBlogComment =asyncHandler(async(req,res)=>{
    const {blogId}=req.body;
    const comments=await Comment.find({blog:blogId,isApproved:true}).sort({createdAt:-1})

    return res.json({success:true,comments})

})

export const generateContent = asyncHandler(async (req,res)=>{
    
        const {prompt}=req.body
        const content = await main(prompt + 'Generate a blog content for this topic in simple text format and with heading')
        return res.json({success:true,content})
    } )
    
