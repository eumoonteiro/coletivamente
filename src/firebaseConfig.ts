import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, signInAnonymously, AuthError } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_3kzk0LAaEvCdW2wD3I8UIfDvLtQAd3o",
  authDomain: "coletivamente-39abb.firebaseapp.com",
  projectId: "coletivamente-39abb",
  storageBucket: "coletivamente-39abb.firebasestorage.app",
  messagingSenderId: "937660613976",
  appId: "1:937660613976:web:e73e31b83d79dca2ccd12d",
  measurementId: "G-TML64FMGRL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize Analytics conditionally (it might not work in some local envs)
export const initAnalytics = async () => {
  try {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  } catch (e) {
    console.log("Analytics initialization skipped (environment not supported).");
  }
  return null;
};

// Anonymous login for security rules
// Handles "auth/configuration-not-found" if Auth is not enabled in Console
signInAnonymously(auth).catch((error) => {
    const authError = error as AuthError;
    // Specifically catch the configuration error to give a helpful message
    if (authError.code === 'auth/configuration-not-found' || authError.code === 'auth/admin-restricted-operation') {
        console.warn("%c⚠️ Firebase Auth Warning", "font-weight: bold; font-size: 14px; color: #f59e0b;");
        console.warn("O método de autenticação 'Anônimo' não está ativado no Firebase Console.");
        console.warn("Para corrigir: Acesse o console do Firebase > Criação > Authentication > Sign-in method e ative o provedor 'Anônimo'.");
        console.warn("O app continuará funcionando, mas gravações no banco podem falhar se as regras exigirem autenticação.");
    } else {
        console.error("Firebase Auth Error:", error);
    }
});