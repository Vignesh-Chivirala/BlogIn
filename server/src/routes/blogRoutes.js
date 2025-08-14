import express, { Router } from "express"
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComment, togglePublish } from "../controllers/blogControllers.js"
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.js";

const blogRouter=Router()

blogRouter.route('/add').post(auth,upload.single('image'),addBlog);
blogRouter.route('/all').get(getAllBlogs);
blogRouter.route('/:blogId').get(getBlogById);
blogRouter.route('/delete').post(auth,deleteBlogById);
blogRouter.route('/toggle-publish').post(auth,togglePublish);


blogRouter.route('/add-comment').post(addComment);

blogRouter.route('/comments').post(getBlogComment);
blogRouter.route('/generate').post(auth,generateContent);
export default blogRouter