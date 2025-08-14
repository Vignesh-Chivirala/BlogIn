import express from 'express'
import blogRouter from './src/routes/blogRoutes.js';
import cors from 'cors';
import connectDB from './src/db/index.js';
import dotenv from 'dotenv';
import adminRouter from './src/routes/adminRoutes.js';

dotenv.config();
const app = express();

await connectDB();  

app.use(cors());
app.use(express.json());    

app.use('/api/blog', blogRouter);
app.use('/api/admin', adminRouter);


connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error: ",error);
        throw error
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed: ",err)
})

export default app;