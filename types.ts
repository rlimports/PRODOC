
export enum UserRole {
  ADMIN = 'ADMIN',
  PARTNER = 'PARTNER'
}

export enum ProcessStatus {
  RECEIVED = 'Recebido',
  IN_ANALYSIS = 'Em análise',
  PENDING_DOCS = 'Documentos pendentes',
  FILED = 'Protocolado no DETRAN',
  IN_PROGRESS = 'Em andamento',
  FINISHED = 'Concluído',
  WAITING_THIRD_PARTY = 'Aguardando terceiros',
  PROBLEM_IDENTIFIED = 'Problema identificado'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company?: string;
}

export interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  plate: string;
  renavam: string;
  services: string[];
  description: string;
  createdAt: string;
  status: 'PENDING' | 'CONVERTED';
}

export interface Process {
  id: string;
  leadId?: string;
  partnerId?: string;
  customerName: string;
  plate: string;
  services: string[];
  status: ProcessStatus;
  updatedAt: string;
  createdAt: string;
  documents: string[];
}

export const DETRAN_SERVICES = [
  "Transferência de propriedade",
  "Emissão de CRLV / CRV",
  "Comunicação de venda",
  "Regularização de pendências",
  "Débitos e multas",
  "Bloqueios e restrições",
  "Segunda via de documentos",
  "Consultas veiculares",
  "Casos complexos",
  "Serviços para lojistas"
];
