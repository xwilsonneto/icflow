// components/CardHeader.tsx
import { FC } from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { CardDescription, CardTitle, CardHeader } from '../ui/card';

interface CardHeaderProps {
  codigo: string;
  projeto: string;
}

const ProjectCardHeader: FC<CardHeaderProps> = ({ codigo, projeto }) => {
  return (
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
  );
};

export default ProjectCardHeader;
