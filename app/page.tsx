// /app/page.tsx
import { DataTable } from '@/components/table/DataTable'
import { columns } from '@/components/table/columns'
import { getData } from '@/lib/mongodb'
import Image from 'next/image'
import Link from 'next/link'
import { Payment } from '@/types/payment';

const Admin = async () => {
  const data = await getData();
  const lastUpdatedDate = data.reduce((latest, current) => {
    const lastUpdated = current.lastUpdated as string | undefined; // Use type assertion

    // If we have a lastUpdated date
    if (lastUpdated) {
      // If latest is undefined or the current lastUpdated is more recent
      return !latest || lastUpdated > latest ? lastUpdated : latest;
    }
    return latest; // If no lastUpdated, return the latest found
  }, undefined as string | undefined);

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='admin-header'>
        <Link href="/" className='cursor-pointer'>
          <Image 
              src="/icons/iclogobranca.PNG"
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
      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <div className='flex justify-between'>
            <h1 className='header'>Bem-vinde, wil ✌</h1>
          </div>
          <div className='flex justify-between'>
            <p className='text-dark-700'>Acompanhe o resumo das planilhas.</p>
            <p className='text-dark-700 italic'>última atualização: {lastUpdatedDate ? lastUpdatedDate : "Sem atualização"}</p>
          </div>
        </section>
        <DataTable columns={columns} data={data} />
      </main>
    </div>
  )
}

export default Admin;
