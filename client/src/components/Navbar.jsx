import { Home } from 'lucide-react'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ModeToggle } from './ui/mode-toggle'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Button } from './ui/button'

const Navbar = () => {
    
  return (
    <>
    <nav className='flex justify-between items-center p-2 md:px-20 px-6 bg-background/30 sticky border-b border-primary/50 top-0 backdrop-blur z-50 w-full'>
            <div className='w-full'>

            </div>
            <div className='flex items-center justify-end gap-4 w-full' >
                <Button asChild variant='outline' size={"icon"} className={'rounded-full'}>
                <Link to='/'><Home className='h-[1.2rem] w-[1.2rem]'/></Link>
                </Button>
                <ModeToggle/>
            </div>
    </nav>
    </>
  )
}

export default Navbar