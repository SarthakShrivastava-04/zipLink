import { UrlContext } from '@/context';
import { BarLoader } from 'react-spinners'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({children}) => {

  const navigate = useNavigate();
  const {isAuthenticated, loading} = useContext(UrlContext);

  useEffect(() =>{
    if(!isAuthenticated && !loading) 
      navigate('/auth');
  },[isAuthenticated, loading])
 
  
  if(loading)  return <BarLoader width={"100%"} color='#36d7b7'/>;

  if(isAuthenticated) return children;
}

export default RequireAuth;
