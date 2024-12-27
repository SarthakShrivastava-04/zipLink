import { Button } from '@/components/ui/button';
import { UrlContext } from '@/context';
import { getClicksStats } from '@/db/apiClicks';
import { deleteUrl, getUrl } from '@/db/apiUrls';
import useFetch from '@/hooks/use-fetch';
import { Copy, Download, LinkIcon, Trash } from 'lucide-react';
import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { BeatLoader, BarLoader } from 'react-spinners';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LocationStats from '@/components/LocationStats';
import DeviceInfo from '@/components/DeviceInfo';


function Link() {

  const {id} = useParams();
  const {user} = useContext(UrlContext);
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, {id, user_id: user?.id});

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksStats, id);

  const {
    loading: loadingDelete,
    fn: fnDelete,
  } = useFetch(deleteUrl, id)

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if(error){
    navigate('/dashboard');
  }
  
  let link = "";
  if(url){
    link = url?.custom_url? url.custom_url : url.short_url; 
  }

  return (
    <>
      {(loading || loadingDelete) && (
        <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/>
      )}

      <div className='flex flex-col sm:flex-row gap-8 justify-between'>
        <div className='flex flex-col gap-8 rounded-lg md:w-2/5'>
          <span className='text-5xl md:text-6xl font-extrabold self-start '>{url?.title}</span>
          <a 
           href= {link}
           target="_blank"
           className='text-3xl md:text-4xl hover:underline font-bold text-blue-400 pl-1'
          >
            {link}
          </a>
          <a 
            href={url?.original_url} 
            target="_blank" 
            className='flex items-center gap-1 hover:underline pl-2'
          >
            <LinkIcon className='p-1'/>
            {url?.original_url}
          </a>
          <span className='font-extralight text-sm flex pl-3'>{new Date(url?.created_at).toLocaleString()}</span>

          <div className='flex gap-1 '>
            <Button
              variant="ghost"
              onClick={()=>{
                navigator.clipboard.writeText(`${url?.short_url}`)
              }}
            >
                <Copy/>
            </Button >
            <Button variant="ghost" >
                <Download/>
            </Button>
            <Button 
              variant="ghost" 
              onClick={()=>{
                  fnDelete();
              }}
            >
              {loadingDelete? <BeatLoader size={5} color='#36d7b7'/> : <Trash/>}
            </Button>
          </div>
          <img 
            src={url?.qrs} 
            className='w-5/8 object-contain self-start ring ring-gray-400 p-1' 
          />
        </div>
        <div className='md:w-3/5'>
          <Card>
            <CardHeader>
              <CardTitle className='text-4xl font-extrabold'>Stats</CardTitle>
            </CardHeader>
            {stats && stats?.length ? (
              <CardContent className='flex flex-col gap-6'>
                <Card>
                  <CardHeader>
                    <CardTitle >Total Clicks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl pl-3'>{stats?.length}</p>
                  </CardContent>
                </Card>
                <CardTitle>Location Data</CardTitle>
                <LocationStats stats={stats}/>
                <CardTitle>Device Info</CardTitle>
                <DeviceInfo stats={stats}/>
              </CardContent>
             ) : (
              <CardContent>
                {loadingStats? "Loading statistics..." : "No stats yet!"}
              </CardContent>
             )}
          </Card>
          
        </div>
      </div>
    </>
  )
}

export default Link
