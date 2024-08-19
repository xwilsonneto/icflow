// types/payment.ts
export interface Lanrp {
    change: number;
    newValue: number;
  }
  
  export interface Payment {
    codigo: string;
    projeto: string;
    lanrp: Lanrp;
    analisar: Lanrp;
    aguarde: Lanrp;
    lanselic: Lanrp;
    feito: Lanrp;
    total: number;
    lastUpdated?: Date;
  }
  