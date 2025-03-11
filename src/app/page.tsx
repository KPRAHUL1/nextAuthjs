"use client"

import LoginForm from "@/components/LoginForm";
import { useSession } from "next-auth/react";
import {  useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const {data:session,status}=useSession();
 const router = useRouter();

  useEffect(()=>{
    if (status === "authenticated") {
      router.push("/dashboard")
    }
  },[session,status,router])
  return (
   <>
   <main>
    <LoginForm/> 
   </main>
   </>
  );
}
