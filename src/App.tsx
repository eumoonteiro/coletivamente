import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Team } from './components/Team';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { WhatsAppIcon } from './components/Icons';
import { ArrowUp } from 'lucide-react';
import { initAnalytics } from './firebaseConfig';

function App() {
    const [showAdmin, setShowAdmin] = useState(false);

    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        initAnalytics();

        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);

        // Atalho "Secreto" pela URL: se acessar com /#admin, abre o painel direto
        if (window.location.hash === '#admin') {
            setShowAdmin(true);
            // Limpa o hash para ficar bonito, mas mantém o painel aberto
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToForm = () => {
        const element = document.getElementById('agendamento');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="font-sans text-stone-600 antialiased bg-amber-50/30 selection:bg-orange-200 selection:text-orange-900 relative">

            <Header />

            <main>
                <Hero />
                <Features />
                <Team />
                <ContactForm />
            </main>

            <Footer onAdminClick={() => setShowAdmin(true)} />

            {/* Sticky WhatsApp Button */}
            <button
                onClick={scrollToForm}
                className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white w-16 h-16 rounded-full shadow-2xl shadow-green-900/40 flex items-center justify-center transition hover:scale-110 z-40 cursor-pointer group"
                aria-label="Agendar via WhatsApp"
            >
                <WhatsAppIcon className="w-8 h-8 group-hover:animate-pulse" />
            </button>

            {/* Back to Top Button (Left Side) */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-6 left-6 bg-stone-100 hover:bg-stone-200 text-stone-600 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-40 cursor-pointer border border-stone-200 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                aria-label="Voltar ao topo"
            >
                <ArrowUp size={24} />
            </button>

            {/* Modals */}
            {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
        </div>
    );
}

export default App;