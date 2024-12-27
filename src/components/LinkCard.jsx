import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Copy, Trash, Download } from 'lucide-react'
import useFetch from '@/hooks/use-fetch'
import { deleteUrl } from '@/db/apiUrls'
import { BeatLoader } from 'react-spinners'

const LinkCard = ({url, fetchUrls}) => {

  const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl, url?.id);

  return (
    <div className='flex flex-col md:flex-row gap-5 border p-4 rounded-lg bg-gray-900'>
      <img src={url?.qrs} alt="" className='h-32  object-contain ring ring-gray-300 self-start' />

      <Link to={`/link/${url.id}`} className='flex flex-col text-left flex-1'>
         <span className='text-3xl font-extrabold hover:underline cursor-pointer'>{url?.title}</span>
         <span className='text-2xl font-bold hover:underline cursor-pointer'>{url?.custom_url? url.custom_url : url.short_url}</span>
         <span className='hover:underline cursor-pointer'>{url?.original_url}</span>
         <span className='flex items-end flex-1 text-xs font-extralight'>{new Date(url?.created_at).toLocaleString()}</span>
      </Link>

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
              fnDelete().then(() => fetchUrls())
          }}
        >
            {loadingDelete? <BeatLoader size={5} color='#36d7b7'/> : <Trash/>}
        </Button>
      </div>
    </div>
  )
}

export default LinkCard
