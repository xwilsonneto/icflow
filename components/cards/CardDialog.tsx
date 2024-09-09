// components/CardDialog.tsx
import { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogOverlay } from '../ui/dialog';
import { Button } from '../ui/button';

interface CardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projeto: string;
  codigo: string;
  lanrp: { newValue: number };
  analisar: { newValue: number };
  aguarde: { newValue: number };
  lanselic: { newValue: number };
  feito: { newValue: number };
  total?: number;
}

const ProjectCardDialog: FC<CardDialogProps> = ({ isOpen, onClose, projeto, codigo, lanrp, analisar, aguarde, lanselic, feito, total }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogTitle>Detalhes do Projeto</DialogTitle>
      <DialogContent>
        <div className="space-y-4">
          <p><strong>Projeto:</strong> {projeto}</p>
          <p><strong>Código:</strong> {codigo}</p>
          <p><strong>Lançar na RP:</strong> {lanrp.newValue}</p>
          <p><strong>Analisar:</strong> {analisar.newValue}</p>
          <p><strong>Aguardando:</strong> {aguarde.newValue}</p>
          <p><strong>Lançar no Selic:</strong> {lanselic.newValue}</p>
          <p><strong>Ok:</strong> {feito.newValue}</p>
          {total && <p><strong>Total:</strong> {total}</p>}
          {total && <p><strong>Última Atualização:</strong> {new Date(total).toLocaleDateString()}</p>}
        </div>
        <Button onClick={onClose} className="mt-4">Fechar</Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCardDialog;
