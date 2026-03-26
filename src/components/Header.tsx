import React, { useState, useEffect } from 'react';
import { LOGO_URL } from '../constants';
import { WhatsAppIcon } from './Icons';

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToId = (id: string) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        
                        {/* Logo Image with Fallback */}
                        <div className="h-10 w-auto flex items-center justify-center">
                            <img 
                                src={LOGO_URL} 
                                alt="ColetivaMente Logo" 
                                className="h-full w-auto object-contain"
                                onError={(e) => {
                                    // Fallback if image fails to load
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.innerHTML = '<div class="w-10 h-10 bg-gradient-to-br from-green-900 to-green-700 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl">C</div>';
                                }}
                            />
                        </div>

                        <div className="flex flex-col">
                            <span className="font-serif font-bold text-xl text-green-900 leading-none">ColetivaMente</span>
                            <span className="text-[10px] text-orange-600 tracking-widest uppercase font-bold">Núcleo de Psicologia</span>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <button 
                            onClick={() => scrollToId('agendamento')} 
                            className="bg-green-600 text-white px-6 py-2.5 rounded-full hover:bg-green-700 transition shadow-lg shadow-green-900/10 font-medium text-sm flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <WhatsAppIcon className="w-4 h-4" />
                            <span>Agendar</span>
                        </button>
                    </div>

                    {/* Mobile Toggle - Removed menu items as requested, keeping only logo on mobile is handled by hidden desktop menu and no mobile menu */}
                </div>
            </div>
        </nav>
    );
};