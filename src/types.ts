export interface Professional {
    id: string;
    name: string;
    role: string;
    crp: string;
    approach: string;
    phone: string;
    image: string;
    quote: string;
    author: string;
    education?: string[];
}

export interface ClickStats {
    [key: string]: number;
}

export interface FormData {
    name: string;
    phone: string; // Novo campo
    period: string;
    message: string;
}

// Interface para o Log detalhado que aparecerá no Admin
export interface LeadLog {
    id?: string;
    professionalId: string;
    patientName: string;
    patientPhone: string;
    period: string;
    message: string;
    timestamp: any; // Firestore Timestamp
    dateStr: string;
}