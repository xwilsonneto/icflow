// components/ProjectDialog.tsx
import { FC } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog'; // ajuste conforme necessário
import { Payment } from '@/types/payment'; // ajuste o caminho conforme necessário

interface ProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: Payment;
}

const ProjectDialog: FC<ProjectDialogProps> = ({ isOpen, onClose, project }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle>Detalhes do Projeto</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <div className='flex flex-col space-y-4'>
          <div className='text-lg font-semibold'>
            Projeto: {project.projeto}
          </div>
          <div className='text-lg'>
            Código: #{project.codigo}
          </div>
        </div>
      </DialogContent>
      <DialogClose onClick={onClose} />
    </Dialog>
  );
};

export default ProjectDialog;
