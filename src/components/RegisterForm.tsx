"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const RegisterForm = () => {
    const router = useRouter();
    const [name,setName]=useState<string>("")
    const [email,setEmail]=useState<string>("");
    const [password,setPassword]=useState<string>("");
    const [error,setError]=useState<string>("");

const handleSubmit = async ( e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
     const resUserExisted = await fetch("api/userExits",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body :JSON.stringify({email}),
     });
     const {user} =await resUserExisted.json();
     if (user) {
        setError("user already exits");
        return;
     } 
     const res = await fetch("api/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({name,email,password})
     });
     if (res.ok) {
        const  form = e.target as HTMLFormElement;
        form.reset();
        router.push("/");
     }else{
        console.log("==============");
        console.log("User register failed");
        console.log("==============");
        
        
     }
    }catch (error){
     console.log("=====================");
     console.log("Error during register",error);
     console.log("=====================");
     
    }
}
  return (
    <>
     <form action="" onSubmit={handleSubmit}>
        <div>
            {error && <p>{error}</p>}
            <div>
                <Link href="/">
                <h3> LOGIN</h3></Link>
                <p>Login next-auth</p>
            </div>
            <div>
            <div><label htmlFor="">Name</label><input type="text" onChange={(e)=>setName(e.target.value)} /></div>
                <div><label htmlFor="">Email</label><input type="text" onChange={(e)=>setEmail(e.target.value)} /></div>
                <div><label htmlFor="">Password</label><input type="text" onChange={(e)=>setPassword(e.target.value)} /></div>
            <div> <button>Login</button></div>
            <div>
                <p>Create new Account {" "}</p><Link href={"/register"}> <span>Register</span></Link>
            </div>
            </div>
        </div>
     </form>
    </>
  )
}

export default RegisterForm