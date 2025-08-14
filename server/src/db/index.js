import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/BLOGIN`);
        console.log(`\n MONGODB Connected : ${connectionInstance.connection.host} `);
        
        
    } catch (error) {
        console.log("MONGODB connection error:",error);
        process.exit(1);
        
    }
}
export default connectDB;