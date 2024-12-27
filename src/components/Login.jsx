// import React, { useContext, useEffect, useState } from 'react'
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
//   } from "@/components/ui/card"
// import { Button } from './ui/button'
// import { Input } from './ui/input'
// import { BeatLoader } from 'react-spinners';
// import Error from './Error';
// import * as Yup from 'yup';
// import useFetch from '@/hooks/use-fetch';
// import { login } from '@/db/apiAuth';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { UrlContext } from '@/context';
  

// const Login = () => {

//   const [errors, setErrors] = useState([]);
//   const [formData, setFormData] = useState({email: "", password: "",});

//   const handleInputChange = (e) =>{
//     const {name, value} = e.target;
//     setFormData((prev) => ({
//         ...prev,
//          [name]: value
//         }));
//   };

// const {data, loading, error, fn: fnLogin} = useFetch(login, formData);

// const navigate = useNavigate();
// let [searchParams] = useSearchParams();
// const longLink = searchParams.get("createNew");

// const {fetchUser} = useContext(UrlContext)

// useEffect(()=>{
//    if(error === null && data){
//      navigate(`/dashboard?${longLink? `createNew=${longLink}` : ""}`)
//      fetchUser();
//    }
// },[data, error])

//   const handleLogin = async() =>{
//      setErrors([])
//      try{
//       const schema = Yup.object().shape({
//         email: Yup.string()
//             .email("Invalid email")
//             .required("Email is required"),
//         password: Yup.string()
//             .min(6, "password must be at least 6 characters")
//             .required("Email is required")
//       });
//      await schema.validate(formData, {abortEarly: false})

//     //  api call
//     await fnLogin();

//     }
//      catch(e){
//        const newErrors = {}

//        e?.inner?.forEach((err) => {
//         newErrors[err.path] = err.message;
//        });

//        setErrors(newErrors);
//      }
//   }

//   return (
//     <Card className='text-left'>
//         <CardHeader>
//             <CardTitle>Login</CardTitle>
//             <CardDescription>to your account if you already have one</CardDescription>
//             {error && <Error message={error.message}/>}
//         </CardHeader>
//         <CardContent className='space-y-2'>
//             <div>
//               <Input 
//                  name='email' 
//                  type='email' 
//                  placeholder='Enter your email' 
//                  onChange={handleInputChange}
//               />
//               {errors.email && <Error message={errors.email}/>}
//             </div>
//             <div>
//               <Input 
//                  name='password' 
//                  type='password' 
//                  placeholder='Enter your password' 
//                  onChange={handleInputChange}
//               />
//               {errors.password && <Error message={errors.password}/>}
//             </div>
//         </CardContent>
//         <CardFooter>
//             <Button onClick={handleLogin}>
//               {loading? <BeatLoader size={10} /> : "Login"}
//             </Button>
//         </CardFooter>
//     </Card>

//   )
// }

// export default Login


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
import { login } from '@/db/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlContext } from '@/context';

const Login = () => {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const { data, loading, error, fn: fnLogin } = useFetch(login, formData);

    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const { fetchUser } = useContext(UrlContext);

    useEffect(() => {
        if (error === null && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
            fetchUser();
           
            setFormData({ email: "", password: "" });
        }
    }, [data, error]);

    const handleLogin = async () => {
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email("Invalid email")
                    .required("Email is required"),
                password: Yup.string()
                    .min(6, "Password must be at least 6 characters")
                    .required("Password is required")
            });
            await schema.validate(formData, { abortEarly: false });

            // API call
            await fnLogin();
        }
        catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
    };

    return (
        <Card className='text-left'>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>to your account if you already have one</CardDescription>
                {error && <Error message={error.message} />}
            </CardHeader>
            <CardContent className='space-y-2'>
                <div>
                    <Input
                        name='email'
                        type='email'
                        placeholder='Enter your email'
                        value={formData.email} 
                        onChange={handleInputChange}
                    />
                    {errors.email && <Error message={errors.email} />}
                </div>
                <div>
                    <Input
                        name='password'
                        type='password'
                        placeholder='Enter your password'
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {errors.password && <Error message={errors.password} />}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleLogin}>
                    {loading ? <BeatLoader size={10} /> : "Login"}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Login;
