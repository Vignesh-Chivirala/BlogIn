import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";

const auth = asyncHandler(async(req,res,next)=>
{
    const token=req.headers.authorization;
    
    try {
        const token = req.headers.authorization?.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET);

        next()
        
    } catch (error) {
        throw new ApiError(402,"Invalid Token")
        
    }
})

export default auth