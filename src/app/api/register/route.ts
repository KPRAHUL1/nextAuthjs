import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

interface RegisterRequestBody{
    name:string;
    email:string;
    password:string;
}

export async function POST(req:Request) {
    try{
const {name,email,password}:RegisterRequestBody = await req.json();
const hashedPassword = await bcrypt.hash(password,10);
await connectMongoDB();
await User.create({name,email,password:hashedPassword})
return NextResponse.json({
    message:"User Created Succesuffly",
},{status:201})
    }catch(error){
        if (error instanceof Error) {
            console.error("error while register user", error.message);
        }
        return NextResponse.json({
            message:"User register failed"
        },{status:500});

    }
}