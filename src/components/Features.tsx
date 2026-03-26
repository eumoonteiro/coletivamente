import { Eye, Star, Clock, Lock, MapPin, Award } from 'lucide-react';
import { WhatsAppIcon } from './Icons';

export const Features: React.FC = () => {
    return (
        <>
            {/* SOBRE */}
            <section id="sobre" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-serif text-green-900 mb-6">Nossa Identidade</h2>
                        <p className="text-xl text-stone-500 font-light leading-relaxed mb-12">
                            Somos o <strong>Núcleo ColetivaMente</strong>. Nossa proposta é oferecer Psicanálise e Psicoterapia online com rigor técnico e ética, adaptando-se à vida contemporânea.
                        </p>
                        <div className="grid md:grid-cols-2 gap-8 text-left mt-16 mb-16">
                            <div className="p-8 bg-amber-50 rounded-2xl border border-amber-100 hover:border-amber-200 transition">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 text-orange-600">
                                    <Eye size={24} />
                                </div>
                                <h3 className="font-bold text-green-900 text-lg mb-2">Visão Integrativa</h3>
                                <p className="text-stone-600 text-sm leading-relaxed">
                                    Promover saúde mental de qualidade, superando barreiras logísticas e temporais, sem perder a profundidade do vínculo terapêutico.
                                </p>
                            </div>
                            <div className="p-8 bg-green-50 rounded-2xl border border-green-100 hover:border-green-200 transition">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-700">
                                    <Star size={24} />
                                </div>
                                <h3 className="font-bold text-green-900 text-lg mb-2">Compromisso Ético</h3>
                                <p className="text-stone-600 text-sm leading-relaxed">
                                    Atendimento pautado na confidencialidade, respeito à singularidade de cada sujeito e excelência teórica contínua.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                const element = document.getElementById('agendamento');
                                if (element) element.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-green-600 text-white px-10 py-4 rounded-full hover:bg-green-700 transition shadow-xl shadow-green-900/10 font-bold text-lg inline-flex items-center gap-3 transform hover:-translate-y-1 active:translate-y-0"
                        >
                            <span>Iniciar atendimento</span>
                            <WhatsAppIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* DIFERENCIAIS */}
            <section id="diferenciais" className="py-24 bg-stone-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-orange-600 font-bold tracking-widest text-xs uppercase mb-2 block">Por que escolher o online?</span>
                        <h2 className="text-3xl md:text-4xl font-serif text-green-900">A Terapia no seu Tempo</h2>
                        <div className="w-16 h-1 bg-orange-400 mx-auto mt-4 rounded-full"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: Clock, title: 'Flexibilidade', text: 'Sessões que se adaptam à sua agenda executiva ou pessoal.' },
                            { icon: Lock, title: 'Privacidade', text: 'Ambiente seguro e criptografado para sua total confidencialidade.' },
                            { icon: MapPin, title: 'Sem Fronteiras', text: 'Mantenha seu tratamento mesmo em viagens ou mudanças.' },
                            { icon: Award, title: 'Qualidade', text: 'Mesma eficácia do presencial, com profissionais selecionados.' }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 border border-stone-100 group">
                                <div className="w-12 h-12 bg-green-900 text-white rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                                    <item.icon size={20} />
                                </div>
                                <h3 className="font-bold text-green-900 mb-3">{item.title}</h3>
                                <p className="text-sm text-stone-500 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};