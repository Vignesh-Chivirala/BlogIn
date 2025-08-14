import express, { Router } from "express";
import { adminLogin, approveCommentById, getAllBlogsAdmin, getAllComments, getDashboard,deleteCommentById } from "../controllers/adminController.js";
import { deleteBlogById, getAllBlogs } from "../controllers/blogControllers.js";
import auth from "../middlewares/auth.js";

const adminRouter =Router();

adminRouter.route("/login").post(adminLogin)
adminRouter.route("/comments").get(auth,getAllComments)
adminRouter.route("/blogs").get(auth,getAllBlogsAdmin)
adminRouter.route("/").post(auth,deleteBlogById)
adminRouter.route("/approve-comment").post(auth,approveCommentById)
adminRouter.route("/dashboard").get(auth,getDashboard)
adminRouter.route('/delete-comment').post(auth,deleteCommentById);


export default adminRouter;