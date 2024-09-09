"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ProjectsDocument } from "@/models/Projects"
import CellHoverCard from "./HoverCard";
import { Payment } from '@/types/payment';

type LanrpData = {
  newValue: number;
  change: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    header: "Código",
    cell: ({ row }) => <p className="text-14-medium">{row.original.codigo}</p>
  },
  {
    accessorKey: 'projeto',
    header: 'Projeto',
    cell: ({ row }) => {
      const projeto = row.original.projeto;
      const maxLength = 32; // Set the maximum number of characters

      return (
        <p className="text-14-medium truncate">
          {projeto.length > maxLength ? `${projeto.slice(0, maxLength)}...` : projeto}
        </p>
      );
    },
  },
  {
    accessorKey: 'lanrp',
    header: 'Lançar RP',
    cell: ({ row }) => {
        const lanrpData = row.original.lanrp || { change: 0, newValue: 0 }; // Definindo valores padrão
        const changeValue = lanrpData.change !== undefined ? lanrpData.change : 0; // Obter o valor de change
        const newValue = lanrpData.newValue !== undefined ? lanrpData.newValue : 0; // Obter o valor atual
        const isIncrease = changeValue > 0; // Verifica se houve aumento
        const isDecrease = changeValue < 0; // Verifica se houve diminuição

        return (
            <div className="min-w-[64px]">
                <div
                    className={`status-badge ${changeValue !== 0 ? "cursor-pointer" : ""} 
                    ${isIncrease ? "border-green-700" : isDecrease ? "border-red-800" : "border-light-200"} 
                    border-2 bg-light-200`}
                >
                    <CellHoverCard newValue={newValue} changeValue={changeValue} />
                </div>
            </div>
        );
    }
 },
 {
  accessorKey: 'analisar',
  header: 'Análise',
  cell: ({ row }) => {
      const lanrpData = row.original.analisar || { change: 0, newValue: 0 }; // Definindo valores padrão
      const changeValue = lanrpData.change !== undefined ? lanrpData.change : 0; // Obter o valor de change
      const newValue = lanrpData.newValue !== undefined ? lanrpData.newValue : 0; // Obter o valor atual
      const isIncrease = changeValue > 0; // Verifica se houve aumento
      const isDecrease = changeValue < 0; // Verifica se houve diminuição

      return (
          <div className="min-w-[64px]">
              <div
                  className={`status-badge ${changeValue !== 0 ? "cursor-pointer" : ""} 
                  ${isIncrease ? "border-green-700" : isDecrease ? "border-red-800" : "border-light-200"} 
                  border-2 bg-light-200`}
              >
                  <CellHoverCard newValue={newValue} changeValue={changeValue} />
              </div>
          </div>
      );
  }
  },
  {
    accessorKey: 'aguarde',
    header: 'Aguardando DOC',
    cell: ({ row }) => {
        const lanrpData = row.original.aguarde || { change: 0, newValue: 0 }; // Definindo valores padrão
        const changeValue = lanrpData.change !== undefined ? lanrpData.change : 0; // Obter o valor de change
        const newValue = lanrpData.newValue !== undefined ? lanrpData.newValue : 0; // Obter o valor atual
        const isIncrease = changeValue > 0; // Verifica se houve aumento
        const isDecrease = changeValue < 0; // Verifica se houve diminuição

        return (
            <div className="min-w-[64px]">
                <div
                    className={`status-badge ${changeValue !== 0 ? "cursor-pointer" : ""} 
                    ${isIncrease ? "border-green-700" : isDecrease ? "border-red-800" : "border-light-200"} 
                    border-2 bg-light-200`}
                >
                    <CellHoverCard newValue={newValue} changeValue={changeValue} />
                </div>
            </div>
        );
    }
  },
  {
    accessorKey: 'lanselic',
    header: 'Lançar selic',
    cell: ({ row }) => {
        const lanrpData = row.original.lanselic || { change: 0, newValue: 0 }; // Definindo valores padrão
        const changeValue = lanrpData.change !== undefined ? lanrpData.change : 0; // Obter o valor de change
        const newValue = lanrpData.newValue !== undefined ? lanrpData.newValue : 0; // Obter o valor atual
        const isIncrease = changeValue > 0; // Verifica se houve aumento
        const isDecrease = changeValue < 0; // Verifica se houve diminuição

        return (
            <div className="min-w-[64px]">
                <div
                    className={`status-badge ${changeValue !== 0 ? "cursor-pointer" : ""} 
                    ${isIncrease ? "border-green-700" : isDecrease ? "border-red-800" : "border-light-200"} 
                    border-2 bg-light-200`}
                >
                    <CellHoverCard newValue={newValue} changeValue={changeValue} />
                </div>
            </div>
        );
    }
  },
  {
    accessorKey: 'feito',
    header: 'Ok/Feito',
    cell: ({ row }) => {
        const lanrpData = row.original.feito || { change: 0, newValue: 0 }; // Definindo valores padrão
        const changeValue = lanrpData.change !== undefined ? lanrpData.change : 0; // Obter o valor de change
        const newValue = lanrpData.newValue !== undefined ? lanrpData.newValue : 0; // Obter o valor atual
        const isIncrease = changeValue > 0; // Verifica se houve aumento
        const isDecrease = changeValue < 0; // Verifica se houve diminuição

        return (
            <div className="min-w-[64px]">
                <div
                    className={`status-badge ${changeValue !== 0 ? "cursor-pointer" : ""} 
                    ${isIncrease ? "border-green-700" : isDecrease ? "border-red-800" : "border-light-200"} 
                    border-2 bg-light-200`}
                >
                    <CellHoverCard newValue={newValue} changeValue={changeValue} />
                </div>
            </div>
        );
    }
  },
  {
    accessorKey: 'total',
    header: 'Total de linhas',
    cell: ({ row }) => <div className="min-w-[64px]"><div className="status-badge bg-light-200"><p className="text-14-medium text-purple-1">{row.original.total}</p></div></div>
  },
  
]