// app/page.tsx
import NewProjectButton from '@/components/NewProjectButton';
import { DataTable } from '@/components/table/DataTable';
import { columns } from '@/components/table/columns';
import { Button } from '@/components/ui/button';
import { getData } from '@/lib/mongodb';
import { GridIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

// Exporta a configuração dinâmica
export const dynamic = 'force-dynamic'; // Adiciona essa linha para garantir que a página seja renderizada dinamicamente

const Admin = async () => {
  const data = await getData(); // Carrega os dados do servidor

  const lastUpdatedDate = data.reduce((latest, current) => {
    const lastUpdated = current.lastUpdated as string | undefined;

    if (lastUpdated) {
      const currentDate = new Date(lastUpdated);
      if (!latest) {
        return currentDate;
      }
      return currentDate > latest ? currentDate : latest;
    }
    return latest;
  }, undefined as Date | undefined);

  // Converta a data para string no formato desejado, incluindo data e hora
  const lastUpdatedDateString = lastUpdatedDate
    ? lastUpdatedDate.toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Usa formato de 24 horas
      })
    : 'N/A';

  return (
      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <div className='flex justify-between'>
            <h1 className='header'>Bem-vinde 👋</h1>
            <div className='flex items-center gap-2'>
              <Button asChild className='bg-dark-400 border gap-2 border-gray-700 text-white hover:bg-gray-700'>
                <Link href="/dashboard/projects"><GridIcon className="h-5 w-5" /> Cards</Link>
              </Button>
              <NewProjectButton />
            </div>
          </div>
          <div className='flex justify-between'>
            <p className='text-dark-700'>Acompanhe o resumo das planilhas.</p>
            <p className='text-dark-700 italic'>última atualização: {lastUpdatedDateString || "Sem atualização"}</p>
          </div>
        </section>
        <DataTable columns={columns} data={data} />
      </main>
    
  );
};

export default Admin;
