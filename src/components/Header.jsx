import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LinkIcon, LogOut } from 'lucide-react';
import { UrlContext } from '@/context';
import useFetch from '@/hooks/use-fetch';
import { login, logout } from '@/db/apiAuth';
import { BarLoader } from 'react-spinners';

function Header() {

 const navigate = useNavigate();
 const {user, fetchUser} = useContext(UrlContext);
 const {loading, fn: fnlogout} = useFetch(logout);

  return (
    <>
      <nav className='sticky top-0 z-50 py-4 bg-[#030819] flex justify-between items-center'>
      <Link to="/">
        <img  src="/newLogo.svg" className="h-14 text-white" alt="" />
      </Link>
      <div className=''>
        {!user?
          (<Button onClick={()=> navigate("/auth")}>Login</Button>)
          :
          (<DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage className='object-contain' src={user?.user_metadata.profile_pic} />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <Link to="/">
              <DropdownMenuLabel onClick>{user?.user_metadata.name}</DropdownMenuLabel>
            </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem >
                <Link to="/dashboard" className='flex justify-between'>
                  <LinkIcon className='h-4 w-4 mr-2'/>
                  My links
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='text-red-400'>
                <LogOut className='mr-2 h-4 w-4'/>
                <span
                  onClick={() =>{
                     fnlogout().then(()=> {
                      fetchUser();
                      navigate('/');
                    });
                  }}
                >
                  Logout
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          )
        }
       </div>
      </nav>
      {loading && <BarLoader width={"100%"} color='#36d7b7'/>}
    </>
  )
}

export default Header
