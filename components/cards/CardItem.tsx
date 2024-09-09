import { FC } from 'react';
import { Badge } from '../ui/badge';

interface CardItemProps {
  label: string;
  value: number;
}

const ProjectCardItem: FC<CardItemProps> = ({ label, value }) => {
  return (
    <li className='flex items-center justify-between text-sm font-medium'>
      <span className='text-muted-foreground'>{label}</span>
      <Badge className='bg-purple-1 text-light-200'>{value}</Badge>
    </li>
  );
};

export default ProjectCardItem;