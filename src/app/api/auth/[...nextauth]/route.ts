import NextAuth from "next-auth"
import   CredentialsProvider   from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs"

export const authOptions :NextAuthOptions={
  providers: [
    CredentialsProvider({
      name:"credentials",
      credentials:{},
      async authorize(credentials) {
        const {email,password}=credentials as {email:string;password:string  }
        try{
          await connectMongoDB() 
          const user = await  User.findOne({email});
          if (!user) {
            return null;
          }
          const  passwordMatch = await bcrypt.compare(password,user.password);
          if (!passwordMatch) {
            return null;
          }
          return user;

        }catch(error){
          console.log("Error",error);
        }
      }
    })    
  ],
  session:{
    strategy:"jwt",
  },
  secret:process.env.NEXTAUTH_SECRET,
  pages:{
    signIn:"/"
  },
};
const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};