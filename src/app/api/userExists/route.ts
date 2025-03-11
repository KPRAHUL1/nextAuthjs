import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";


interface UserExistsRequestBody{
    email:string;
}
export  async function POST(req:Request) {
    try{
        await connectMongoDB();
        const {email}: UserExistsRequestBody =await req.json();
        const user = await User.findOne({email}).select("_id");
        return NextResponse.json({user});
    }catch (error) {
  console.log(error);
  
    }
}