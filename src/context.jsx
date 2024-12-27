import { getCurrentUser } from "./db/apiAuth";
import useFetch from "./hooks/use-fetch";
import { createContext, useEffect} from "react";

export const UrlContext = createContext();

const UrlProvider = ({children}) =>{

    const {data: user, loading, fn: fetchUser} = useFetch(getCurrentUser);

    const isAuthenticated = user?.role === "authenticated";

    useEffect(()=>{
       fetchUser();
    },[])

    return <UrlContext.Provider value={{user, loading,fetchUser, isAuthenticated}}> {children} </UrlContext.Provider>
}

export default UrlProvider;