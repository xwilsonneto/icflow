import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    
        <header className='admin-header'>
            <Link href="/dashboard" className='cursor-pointer'>
            <Image 
                src="/icons/iclogobranca.png"
                height={32}
                width={162}
                alt='Logo'
                className='h-8 w-fit'
            />
            </Link>
            <p className='text-16-semibold'>
            Controle planilhas
            </p>
        </header>
      
  )
}

export default Header