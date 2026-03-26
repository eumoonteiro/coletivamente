import { doc, runTransaction, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { TEAM_DATA } from "../constants";

const QUEUE_DOC_ID = "queue";
const COLLECTION_NAME = "coletivamente";

/**
 * Obtém o índice do próximo profissional da fila e incrementa.
 */
export const getNextProfessionalIndex = async (): Promise<number> => {
    const totalProfessionals = TEAM_DATA.length;

    try {
        const nextIndex = await runTransaction(db, async (transaction) => {
            const queueRef = doc(db, COLLECTION_NAME, QUEUE_DOC_ID);
            const queueDoc = await transaction.get(queueRef);

            let currentIndex = -1;
            if (queueDoc.exists()) {
                currentIndex = queueDoc.data().lastIndex;
            }

            const nextIndex = (currentIndex + 1) % totalProfessionals;
            transaction.set(queueRef, { lastIndex: nextIndex }, { merge: true });

            return nextIndex;
        });

        return nextIndex;

    } catch (error) {
        console.warn("Fila Global indisponível, usando Rodízio Local.", error);
        return getLocalNextIndex(totalProfessionals);
    }
};

/**
 * Apenas consulta quem é o próximo da fila (para o Admin)
 */
export const getCurrentQueueState = async (): Promise<number> => {
    try {
        const queueRef = doc(db, COLLECTION_NAME, QUEUE_DOC_ID);
        const queueDoc = await getDoc(queueRef);

        if (queueDoc.exists()) {
            const lastIndex = queueDoc.data().lastIndex;
            return (lastIndex + 1) % TEAM_DATA.length;
        }
        return 0;
    } catch (e) {
        return 0;
    }
};

const getLocalNextIndex = (total: number): number => {
    try {
        const storageKey = 'coletivamente_last_index';
        const savedItem = localStorage.getItem(storageKey);

        let nextIndex;
        // Se não tem histórico (Novo Usuário/Ads), escolhe ALEATÓRIO para distribuir
        if (savedItem === null) {
            nextIndex = Math.floor(Math.random() * total);
        } else {
            // Se já tem histórico, faz o rodízio sequencial pessoal
            const savedIndex = parseInt(savedItem);
            nextIndex = (savedIndex + 1) % total;
        }

        localStorage.setItem(storageKey, nextIndex.toString());
        return nextIndex;
    } catch (e) {
        return Math.floor(Math.random() * total);
    }
};