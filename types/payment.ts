// types/payment.ts
export interface Lanrp {
    change: number;
    newValue: number;
  }
  
  export interface Payment {
    codigo: string;
    projeto: string;
    proponente: string,
    cnpj: string,
    login: string,
    senha: string,
    pastaUrl: string,
    homologado: string,
    captado: string,
    porcento: string,
    receitas: string,
    lanrp: Lanrp;
    analisar: Lanrp;
    aguarde: Lanrp;
    lanselic: Lanrp;
    feito: Lanrp;
    total: number;
    lastUpdated?: Date;
  }
  