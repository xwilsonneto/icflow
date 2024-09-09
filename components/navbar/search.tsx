// src/components/Search.tsx

import { Input } from "@/components/ui/input";

interface SearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Search({ value, onChange }: SearchProps) {
  return (
    <div>
      <Input
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Pesquisar..."
        className="bg-dark-400 text-white border border-dark-500 placeholder-dark-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-dark-500"
      />
    </div>
  );
}
