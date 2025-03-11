
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const LoginForm = () => {
    const router = useRouter();
    const [email,setEmail]=useState<string>("");
    const [password,setPassword]=useState<string>("");
    const [error,setError]=useState<string>("");

const handleSubmit = async ( e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
    const res = await signIn("credentials",{
        email,
        password,
        redirect:false
    });
    if (res?.error) {
        setError("Invalid Credential")
    }
    router.replace("dashboard")
    }catch (error){
     console.log("=====================");
     console.log(error);
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

export default LoginForm