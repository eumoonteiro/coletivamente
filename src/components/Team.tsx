
import React from 'react';
import { TEAM_DATA } from '../constants';
import { CalendarCheck } from 'lucide-react';

export const Team: React.FC = () => {
    const scrollToForm = () => {
        const element = document.getElementById('agendamento');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="profissionais" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-orange-600 font-bold tracking-widest text-xs uppercase mb-2 block">Corpo Clínico</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-green-900">Nossos Especialistas</h2>
                    <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {TEAM_DATA.map((pro) => (
                        <div key={pro.id} className="group cursor-pointer flex flex-col h-full" onClick={scrollToForm}>
                            {/* Imagem */}
                            <div className="relative overflow-hidden rounded-t-xl h-72 bg-stone-200 shrink-0">
                                <img 
                                    src={pro.image} 
                                    alt={pro.name} 
                                    className="w-full h-full object-cover group-hover:grayscale transition duration-700" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                                    <span className="text-white font-medium text-xs border border-white/30 px-3 py-1 rounded-full backdrop-blur-md">
                                        Agendar Atendimento
                                    </span>
                                </div>
                            </div>

                            {/* Conteúdo do Card */}
                            <div className="bg-white border border-stone-100 border-t-0 p-6 rounded-b-xl shadow-sm group-hover:shadow-xl transition relative z-10 flex flex-col flex-grow">
                                {/* Botão Flutuante Decorativo */}
                                <div className="absolute -top-5 right-4 bg-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md group-hover:scale-110 transition">
                                    <CalendarCheck size={18} />
                                </div>

                                {/* Cabeçalho com Abordagem Restaurada */}
                                <div className="mb-4">
                                    <h3 className="font-bold text-lg text-green-900 leading-tight mb-1">{pro.name}</h3>
                                    {/* Abordagem em destaque (Restaurado) */}
                                    <p className="text-xs text-orange-500 font-bold uppercase tracking-wide mb-2">{pro.approach}</p>
                                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">{pro.role} • {pro.crp}</p>
                                </div>

                                {/* Seção de Formação (Separada e Elegante) */}
                                {pro.education && (
                                    <div className="mb-6 pt-4 border-t border-stone-100">
                                        <ul className="space-y-2">
                                            {pro.education.map((edu, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed">
                                                    <span className="text-orange-400 mt-0.5">•</span>
                                                    <span>{edu}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Espaçador para jogar a citação para o final */}
                                <div className="mt-auto pt-4 border-t border-dashed border-stone-200">
                                    <p className="text-sm text-stone-500 italic font-serif leading-relaxed">"{pro.quote}"</p>
                                    <p className="text-xs text-orange-600 mt-2 text-right font-medium">— {pro.author}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Botão Final Iniciar Atendimento */}
                <div className="mt-20 text-center">
                    <button
                        onClick={scrollToForm}
                        className="bg-green-600 text-white px-10 py-4 rounded-full hover:bg-green-700 transition shadow-xl shadow-green-900/10 font-bold text-lg flex items-center gap-3 mx-auto transform hover:-translate-y-1 active:translate-y-0"
                    >
                        <span>Iniciar atendimento</span>
                    </button>
                </div>
            </div>
        </section>
    );
};