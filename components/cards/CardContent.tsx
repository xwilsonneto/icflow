// components/CardContent.tsx
import { FC } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Info } from 'lucide-react';
import ProjectCardItem from './CardItem';

interface CardContentProps {
  lanrp: { newValue: number };
  analisar: { newValue: number };
  aguarde: { newValue: number };
  lanselic: { newValue: number };
  feito: { newValue: number };
  onOpenDialog: () => void;
}

const ProjectCardContent: FC<CardContentProps> = ({ lanrp, analisar, aguarde, lanselic, feito, onOpenDialog }) => {
  return (
    <div className='grid gap-3'>
      <ul className='grid gap-3'>
        <ProjectCardItem label="Lançar na RP" value={lanrp.newValue} />
        <ProjectCardItem label="Analisar" value={analisar.newValue} />
        <ProjectCardItem label="Aguardando" value={aguarde.newValue} />
        <ProjectCardItem label="Lançar no Selic" value={lanselic.newValue} />
        <ProjectCardItem label="Ok" value={feito.newValue} />
      </ul>
      <Button className='bg-purple-1 text-light-200 gap-2 h-7' onClick={onOpenDialog}>
        Detalhes <Info size={18} />
      </Button>
    </div>
  );
};

export default ProjectCardContent;
