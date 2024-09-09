// components/DetailsModal.tsx
import { Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import { Payment } from '@/types/payment'; // Ajuste o caminho conforme necessário

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: Payment;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, details }) => {
  if (!details) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} as="div" className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4 text-center">
        <Dialog.Panel className="relative bg-white rounded-lg max-w-sm mx-auto p-6">
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-500"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Dialog.Title className="text-lg font-medium">Detalhes do Projeto</Dialog.Title>
          <div className="mt-4">
            <p><strong>Projeto:</strong> {details.projeto}</p>
            <p><strong>Código:</strong> {details.codigo}</p>
            <p><strong>Lançar na RP:</strong> {details.lanrp.newValue}</p>
            <p><strong>Analisar:</strong> {details.analisar.newValue}</p>
            <p><strong>Aguardando:</strong> {details.aguarde.newValue}</p>
            <p><strong>Lançar no Selic:</strong> {details.lanselic.newValue}</p>
            <p><strong>Ok:</strong> {details.feito.newValue}</p>
            {details.total && <p><strong>Total:</strong> {details.total}</p>}
            {details.lastUpdated && <p><strong>Última Atualização:</strong> {new Date(details.lastUpdated).toLocaleDateString()}</p>}
          </div>
        </Dialog.Panel>
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
      </div>
    </Dialog>
  );
};

export default DetailsModal;
