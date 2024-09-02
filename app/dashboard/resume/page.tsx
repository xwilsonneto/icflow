// app/page.tsx
import { DataTable } from '@/components/table/DataTable';
import { columns } from '@/components/table/columns';
import { getData } from '@/lib/mongodb';

// Exporta a configuração dinâmica
export const dynamic = 'force-dynamic'; // Adiciona essa linha para garantir que a página seja renderizada dinamicamente

const Admin = async () => {
  const data = await getData(); // Carrega os dados do servidor

  const lastUpdatedDate = data.reduce((latest, current) => {
    const lastUpdated = current.lastUpdated as string | undefined;

    if (lastUpdated) {
      return !latest || lastUpdated > latest ? lastUpdated : latest;
    }
    return latest;
  }, undefined as string | undefined);

  return (
      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <div className='flex justify-between'>
            <h1 className='header'>Bem-vinde 👋</h1>
          </div>
          <div className='flex justify-between'>
            <p className='text-dark-700'>Acompanhe o resumo das planilhas.</p>
            <p className='text-dark-700 italic'>última atualização: {lastUpdatedDate || "Sem atualização"}</p>
          </div>
        </section>
        <DataTable columns={columns} data={data} />
      </main>
    
  );
};

export default Admin;
