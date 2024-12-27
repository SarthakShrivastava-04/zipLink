import React, { useState } from 'react'

const useFetch = (cb, options={}) => {

   const [loading, setLoading] = useState(null);
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);
   
   const fn = async(...args) =>{
    setLoading(true);
    setError(null);
    setData(null);
    try {
        const response = await cb(options, ...args);
        setData(response);
    } catch (err) {
        setError(err);
    } finally{
        setLoading(false);
    }
   };

   return {loading, error, data, fn};
};

export default useFetch;