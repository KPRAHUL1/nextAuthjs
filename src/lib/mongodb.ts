 import mongoose from "mongoose";

 export const connectMongoDB = async ( ): Promise<void> => {
    try{
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB");
        
    }catch (error){
        console.error("Error connecting to MongoDB: ",error)
    }
 }