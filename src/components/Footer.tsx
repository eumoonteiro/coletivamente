import { LOGO_URL } from '../constants';
import { Instagram, Facebook, Lock } from 'lucide-react';

interface Props {
    onAdminClick: () => void;
}

export const Footer: React.FC<Props> = ({ onAdminClick }) => {
    return (
        <>
            {/* ATENDIMENTO ONLINE */}
            <section id="suporte" className="py-16 bg-stone-100 border-t border-stone-200">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h3 className="text-2xl font-serif text-green-900 mb-4">Atendimento Online</h3>
                    <p className="text-stone-600 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                        Fale com uma de nossas especialistas agora mesmo e marque uma consulta online.
                    </p>
                    <button
                        onClick={() => {
                            const element = document.getElementById('agendamento');
                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition font-medium flex items-center justify-center gap-2 mx-auto shadow-sm group"
                    >
                        Iniciar atendimento
                    </button>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        {/* Logo */}
                        <img
                            src={LOGO_URL}
                            alt="ColetivaMente"
                            className="h-10 w-auto opacity-90 hover:opacity-100 transition"
                        />
                        <div className="hidden sm:flex flex-col">
                            <span className="font-serif text-lg text-stone-200 leading-tight">ColetivaMente</span>
                            <span className="text-[10px] text-stone-500 uppercase tracking-widest">Núcleo de Psicologia</span>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-6 text-sm">
                        <div className="flex gap-5 border-b md:border-b-0 md:border-r border-stone-800 pb-4 md:pb-0 md:pr-6">
                            <a href="https://www.instagram.com/coletivamente.psi/" target="_blank" rel="noreferrer" className="hover:text-orange-500 transition-colors transform hover:scale-110"><Instagram size={20} /></a>
                            <a href="https://www.facebook.com/profile.php?id=61566342667198" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors transform hover:scale-110"><Facebook size={20} /></a>
                        </div>
                        <span>&copy; 2025 Todos os direitos reservados.</span>

                        {/* Botão de Admin Mais Visível */}
                        <button
                            onClick={onAdminClick}
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600 hover:text-white transition bg-stone-800 hover:bg-stone-700 px-3 py-1 rounded-md"
                            title="Acesso Restrito à Gestão"
                        >
                            <Lock size={12} />
                            Acesso Administrativo
                        </button>
                    </div>
                </div>
            </footer>
        </>
    );
};