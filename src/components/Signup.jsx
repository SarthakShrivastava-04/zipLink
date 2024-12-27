import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from './ui/button'
import { Input } from './ui/input'
import { BeatLoader } from 'react-spinners';
import Error from './Error';
import * as Yup from 'yup';
import useFetch from '@/hooks/use-fetch';
import { signup } from '@/db/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlContext } from '@/context';
  

const Signup = () => {

  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({name: "",
                                  email: "",
                                  password: "",
                                  profile_pic: null});

  const handleInputChange = (e) =>{
    const {name, value, files} = e.target;
    setFormData((prev) => ({
        ...prev,
         [name]: files? files[0] : value,
        }));
  };

const {data, loading, error, fn: fnSignup} = useFetch(signup, formData);

const navigate = useNavigate();
let [searchParams] = useSearchParams();
const longLink = searchParams.get("createNew");

const {fetchUser} = useContext(UrlContext)

useEffect(()=>{
   if(error === null && data){
     navigate(`/dashboard?${longLink? `createNew=${longLink}` : ""}`)
     fetchUser();
   }
},[data, error])

  const handleSignup = async() =>{
     setErrors([])
     try{
      const schema = Yup.object().shape({
        name: Yup.string().required("Email is required"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "password must be at least 6 characters")
            .required("Email is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });
     await schema.validate(formData, {abortEarly: false})

    //  api call
    await fnSignup();
    }

     catch(e){
       const newErrors = {}

       e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
       });

       setErrors(newErrors);
     }
  }

  return (
    <Card className='text-left'>
        <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>create your account if yoou haven&rsquo;t one</CardDescription>
            {error && <Error message={error.message}/>}
        </CardHeader>
        <CardContent className='space-y-2'>
            <div>
              <Input 
                 name='name' 
                 type='text' 
                 placeholder='Enter your name' 
                 onChange={handleInputChange}
              />
              {errors.name && <Error message={errors.name}/>}
            </div>
            <div>
              <Input 
                 name='email' 
                 type='email' 
                 placeholder='Enter your email' 
                 onChange={handleInputChange}
              />
              {errors.email && <Error message={errors.email}/>}
            </div>
            <div>
              <Input 
                 name='password' 
                 type='password' 
                 placeholder='Enter your password' 
                 onChange={handleInputChange}
              />
              {errors.password && <Error message={errors.password}/>}
            </div>
            <div>
              <Input 
                 name='profile_pic' 
                 type='file' 
                 accept='image/*'
                 onChange={handleInputChange}
              />
              {errors.profile_pic && <Error message={errors.profile_pic}/>}
            </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleSignup}>
              {loading? <BeatLoader size={10} /> : "Create account"}
            </Button>
        </CardFooter>
    </Card>

  )
}

export default Signup
