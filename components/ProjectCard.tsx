// components/ProjectCard.tsx
'use client';
import { FC, useState } from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { Payment } from '@/types/payment';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowUpRight, Info } from 'lucide-react';
import { Dialog, DialogTitle, DialogContent, DialogOverlay } from './ui/dialog'; // Ajuste conforme necessário
import Link from 'next/link';

const ProjectCard: FC<Payment> = ({ codigo, projeto, proponente, cnpj, login, senha, pastaUrl, homologado, captado, porcento, receitas, lanrp, analisar, aguarde, lanselic, feito, total }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Card className='bg-light-200 text-black border-2 border-purple-1'>
        <CardHeader>
          <CardTitle className='text-md text-purple-1 truncate'>
            {projeto}
          </CardTitle>
          <CardDescription>
            <div className='flex space-x-24 content-between text-sm text-muted-foreground'>
              <div className='flex'>
                #{codigo}
              </div>
              <div className='flex items-center'>
                <FaRegCircle className="mr-1 h-3 w-3 fill-sky-600 text-sky-600" />
                Rouanet
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-3'>
            <ul className='grid gap-3'>
              <li className='flex items-center justify-between text-sm font-medium'>
                <span className='text-muted-foreground'>
                  Lançar na RP
                </span>
                <Badge className='bg-purple-1 text-light-200'>
                  {lanrp.newValue}
                </Badge>
              </li>
              <li className="flex items-center justify-between text-sm font-medium">
                <span className='text-muted-foreground'>
                  Analisar
                </span>
                <Badge className='bg-purple-1 text-light-200'>
                  {analisar.newValue}
                </Badge>
              </li>
              <li className='flex items-center justify-between text-sm font-medium'>
                <span className='text-muted-foreground'>
                  Aguardando
                </span>
                <Badge className='bg-purple-1 text-light-200'>
                  {aguarde.newValue}
                </Badge>
              </li>
              <li className='flex items-center justify-between text-sm font-medium'>
                <span className='text-muted-foreground'>
                  Lançar no Salic
                </span>
                <Badge className='bg-purple-1 text-light-200'>
                  {lanselic.newValue}
                </Badge>
              </li>
              <li className='flex items-center justify-between text-sm font-medium'>
                <span className='text-muted-foreground'>
                  Ok
                </span>
                <Badge className='bg-purple-1 text-light-200'>
                  {feito.newValue}
                </Badge>
              </li>
            </ul>
            <Button className='bg-purple-1 text-light-200 gap-2 h-7' onClick={openDialog}>
              Detalhes <Info size={18} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Renderização condicional do Dialog */}
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogOverlay />
          <DialogContent className='bg-light-200 text-purple-1 max-w-fit'>
            <div className="flex flex-row items-center justify-between">
                <div className="grid gap-2">
                    <CardTitle>{projeto}</CardTitle>
                    <CardDescription className="text-black">Proponente: {proponente}</CardDescription>
                </div>
                <Button asChild className="bg-purple-1 text-light-200 flex items-center gap-2">
                    <Link href={pastaUrl} target="_blank">
                        Link para o drive
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    
                </Button>
            </div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                <div className='text-black'>
                    <p className='text-lg font-semibold text-purple-1'>CNPJ:</p>
                    <p className='text-sm text-gray-800 break-words'>{cnpj}</p>
                    <p className='text-lg font-semibold text-purple-1 mt-2'>Login:</p>
                    <p className='text-sm text-gray-800 break-words'>{login}</p>
                    <p className='text-lg font-semibold text-purple-1 mt-2'>Senha:</p>
                    <p className='text-sm text-gray-800 break-words'>{senha}</p>
                </div>
                <div className='text-black'>
                    <p className='text-lg font-semibold text-purple-1'>Valor homologado/adequado:</p>
                    <p className='text-sm text-gray-800 break-words'>{homologado}</p>
                    <p className='text-lg font-semibold text-purple-1 mt-2'>Valor captado:</p>
                    <p className='text-sm text-gray-800 break-words'>{captado}</p>
                    <p className='text-lg font-semibold text-purple-1 mt-2'>% captado:</p>
                    <p className='text-sm text-gray-800 break-words'>{porcento}</p>
                    <p className='text-lg font-semibold text-purple-1 mt-2'>Total de receitas:</p>
                    <p className='text-sm text-gray-800 break-words'>{receitas}</p>
                </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ProjectCard;
