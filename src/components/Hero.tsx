import React from 'react';
import { WhatsAppIcon } from './Icons';
import { HERO_IMAGE_URL } from '../constants';

export const Hero: React.FC = () => {
    const scrollToForm = () => {
        const element = document.getElementById('agendamento');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
             {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 z-0"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    
                    {/* Text Content */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-6 tracking-wider uppercase">
                            Atendimento Online
                        </span>
                        <h1 className="text-5xl lg:text-6xl font-serif font-medium text-green-900 leading-[1.1] mb-6">
                            Saúde mental com <br/>
                            <span className="text-orange-600 italic">excelência</span> e propósito.
                        </h1>
                        <p className="text-lg text-stone-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            O <strong>Núcleo ColetivaMente</strong> oferece psicoterapia especializada sem fronteiras geográficas. Conectamos você a profissionais experientes com rigor técnico e acolhimento.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button 
                                onClick={scrollToForm} 
                                className="bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition shadow-xl shadow-green-900/20 font-medium flex items-center justify-center gap-3 transform hover:-translate-y-1"
                            >
                                <span>Iniciar Atendimento</span> 
                                <WhatsAppIcon className="w-5 h-5" />
                            </button>
                            <a 
                                href="#sobre" 
                                className="px-8 py-4 rounded-full text-green-600 border border-green-600/20 hover:bg-green-50 transition font-medium text-center flex items-center justify-center"
                            >
                                Conhecer o Núcleo
                            </a>
                        </div>
                    </div>

                    {/* Image Content */}
                    <div className="lg:w-1/2 relative">
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square group">
                            {/* Imagem configurável via constants.ts (hero.jpg na pasta public/img) */}
                            <img 
                                src={HERO_IMAGE_URL} 
                                alt="Ambiente terapêutico acolhedor" 
                                className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                                onError={(e) => {
                                    console.warn("⚠️ A imagem local 'hero.jpg' não foi encontrada. Carregando imagem de backup.");
                                    console.warn("DICA: Verifique se o arquivo 'hero.jpg' está na pasta 'public/img' e se você rodou 'npm run build' antes do deploy.");
                                    // Se a pessoa não colocou a foto 'hero.jpg' ainda, carrega a do Unsplash como backup
                                    e.currentTarget.src = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 text-white">
                                <p className="font-serif text-2xl italic">"O autoconhecimento é libertador."</p>
                            </div>
                        </div>
                         {/* Decorative Element */}
                         <div className="absolute -z-10 top-10 -right-10 w-full h-full border-2 border-orange-200 rounded-[2rem]"></div>
                    </div>
                </div>
            </div>
        </header>
    );
};