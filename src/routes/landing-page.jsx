import React, { useState } from 'react'
import { Input} from '@/components/ui/input'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [longURL, setLongURL] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
     e.preventDefault()
     if(longURL) navigate(`/auth?createNew=${longURL}`)
  };

  return (
    <div className='flex flex-col items-center'>
      {/* <h2 className='my-10 sm:my-16 text-3xl lg:text-7xl sm:text-5xl  text-center font-extrabold'>The only URL shortener <br /> you&rsquo;ll ever need! </h2> */}
      <h2 className='my-10 sm:my-16 text-3xl lg:text-7xl sm:text-5xl text-center font-extrabold' style={{ lineHeight: '1.1' }}>Simplify your links, <br /> Simplify your life</h2>

      <form onSubmit={handleSubmit} className=' flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-2/4 my-10 '>
        <Input  
          className='h-12 flex-1 px-4'
          type='url'
          placeholder='Enter your long URL here'
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
        />
        <Button className='h-full sm:h-12 text-[16px]'  type='submit' variant='destructive' >
          Shorten URL
        </Button>
      </form>

      <Accordion type="single" collapsible className='w-full text-left my-11 md:px-11'>
        <AccordionItem value="item-1">
          <AccordionTrigger>How does the URL shortener work?</AccordionTrigger>
          <AccordionContent>
          The URL shortener converts long URLs into shorter ones by generating a unique, easy-to-share link that redirects to the original URL.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Do I need an account to use the app?</AccordionTrigger>
          <AccordionContent>
          Yes, you need to create an account to access and use the full features of the app.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>What analytics does the app provide?</AccordionTrigger>
          <AccordionContent>
          The app provides analytics on the number of clicks, geolocation of clicks, and the types of devices (mobile/desktop) used.
          </AccordionContent>
        </AccordionItem>
</Accordion>

    </div>
  )
}

export default LandingPage
