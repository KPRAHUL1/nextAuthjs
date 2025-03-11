"use client"
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const UserInformation = () => {
  const {data:session}  = useSession();
  console.log("================");
  console.log(session);
  console.log("================");
  
  return (
   <>
   <div>
    <div>
        <div>
            Name <span>{session?.user?.email}</span>
        </div>
        <div>
            Email <span>{session?.user?.email}</span>
        </div>
        <button onClick={()=>signOut()}>Log Out</button>
    </div>
   </div>
   </>
  )
}

export default UserInformation;