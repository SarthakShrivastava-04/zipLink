import React, { useContext, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlContext } from '@/context'


function Auth() {

  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const {isAuthenticated, loading} = useContext(UrlContext);

  useEffect(() =>{
     if(isAuthenticated && !loading){
      navigate(`/dashboard?${longLink? `createNew=${longLink}`: ""}`)
     }
  },[isAuthenticated, loading])

  return (
    <div className='mt-24 flex flex-col gap-10 items-center'>
      <h1 className='font-extrabold text-5xl'>
        {longLink? ("Hold up! Let's login first...") : ("Login / Signup")}
      </h1>

      <Tabs defaultValue="login" className="w-[400px] ">
      <TabsList className='w-full grid grid-cols-2'>
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Signup</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Login/>
      </TabsContent>
      <TabsContent value="signup">
        <Signup/>
      </TabsContent>
    </Tabs>
    </div>
   

  )
}

export default Auth
