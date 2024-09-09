import React from 'react';
import { useRouter } from 'next/navigation';
import { GridIcon, TableIcon } from '@radix-ui/react-icons';

type ToggleViewButtonProps = {
  currentView: 'cards' | 'table';
};

const ToggleViewButton: React.FC<ToggleViewButtonProps> = ({ currentView }) => {
  const router = useRouter();

  const handleClick = (view: 'cards' | 'table') => {
    const path = view === 'cards' ? '/dashboard/projects' : '/dashboard/resume';
    router.push(path);
  };

  return (
    <div className="flex space-x-2">
      <button 
        onClick={() => handleClick('cards')}
        className={`p-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 ${
          currentView === 'cards' ? 'bg-gray-600' : ''
        }`}
        aria-label="Switch to card view"
      >
        <GridIcon className="h-5 w-5" />
      </button>
      <button 
        onClick={() => handleClick('table')}
        className={`p-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 ${
          currentView === 'table' ? 'bg-gray-600' : ''
        }`}
        aria-label="Switch to table view"
      >
        <TableIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ToggleViewButton;
