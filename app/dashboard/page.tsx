'use client'

import CardMenu from '@/components/CardMenu'
import React from 'react'

const page = () => {
  return (
    <main className='admin-main'>
        <section className='w-full space-y-4'>
          <div className='flex justify-between'>
            <h1 className='header'>Bem-vinde 👋</h1>
          </div>
        </section>
        <section className='admin-stat'>
            <CardMenu 
                label="Tabela com o resumo projetos"
                menuItem="Resumo"
                icon="/icons/project.svg"
            />
            <CardMenu 
                label="Informações mais detalhadas dos projetos"
                menuItem="Resumo"
                icon="/icons/project.svg"
            />
        </section>
        
    </main>
  )
}

export default page