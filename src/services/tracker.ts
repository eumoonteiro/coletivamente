import { doc, setDoc, increment, onSnapshot, DocumentSnapshot, collection, addDoc, serverTimestamp, query, where, getDocs, Timestamp, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ClickStats, FormData, LeadLog } from "../types";

const COLLECTION_EVENTS = "coletivamente_events";

// Agora recebe o objeto formData completo, não só o ID
export const registerClick = async (professionalId: string, formData: FormData) => {
    // 1. Local Backup (Contador simples)
    try {
        const saved = localStorage.getItem('coletivamente_stats');
        const localStats = saved ? JSON.parse(saved) : {};
        localStats[professionalId] = (localStats[professionalId] || 0) + 1;
        localStorage.setItem('coletivamente_stats', JSON.stringify(localStats));
    } catch (e) {
        console.warn("Local storage unavailable");
    }

    // 2. Firestore Cloud Update
    try {
        const isTest = formData.name.toLowerCase().includes('teste');

        // A) Atualiza o Placar Geral (SÓ SE NÃO FOR TESTE)
        if (!isTest) {
            const statsRef = doc(db, "coletivamente", "stats");
            await setDoc(statsRef, {
                [professionalId]: increment(1),
                last_updated: new Date().toISOString()
            }, { merge: true });
        }

        // B) Salva o "Lead Completo" (Nome, Telefone, etc)
        await addDoc(collection(db, COLLECTION_EVENTS), {
            professionalId: professionalId,
            patientName: formData.name,
            patientPhone: formData.phone,
            period: formData.period,
            message: formData.message,
            timestamp: serverTimestamp(),
            dateStr: new Date().toISOString().split('T')[0]
        });

        console.log(`✅ [Tracker] Lead salvo para: ${professionalId}`);

    } catch (e: any) {
        if (e.code === 'permission-denied') {
            console.warn("⚠️ [Tracker] Permissão negada! Verifique as regras do Firestore.");
        } else {
            console.error("❌ [Tracker] Erro ao salvar lead:", e);
        }
        // Não jogamos o erro (throw) para não impedir o redirecionamento do WhatsApp
    }
};

export const subscribeToStats = (callback: (stats: ClickStats) => void) => {
    const statsRef = doc(db, "coletivamente", "stats");
    return onSnapshot(statsRef, (docSnap: DocumentSnapshot) => {
        if (docSnap.exists()) {
            callback(docSnap.data() as ClickStats);
        }
    });
};

// Nova função poderosa: Busca os leads DETALHADOS
export const getLeadsReport = async (startDate: Date, endDate: Date): Promise<LeadLog[]> => {
    try {
        const q = query(
            collection(db, COLLECTION_EVENTS),
            where("timestamp", ">=", Timestamp.fromDate(startDate)),
            where("timestamp", "<=", Timestamp.fromDate(endDate)),
            orderBy("timestamp", "desc") // Do mais recente para o mais antigo
        );

        const querySnapshot = await getDocs(q);
        const leads: LeadLog[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            leads.push({
                id: doc.id,
                professionalId: data.professionalId,
                patientName: data.patientName || 'Anônimo (Antigo)',
                patientPhone: data.patientPhone || '-',
                period: data.period || '-',
                message: data.message || '-',
                timestamp: data.timestamp,
                dateStr: data.dateStr
            });
        });

        return leads;
    } catch (error) {
        console.error("Erro ao buscar relatório de leads:", error);
        return [];
    }
};