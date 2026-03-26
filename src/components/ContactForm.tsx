import React, { useState } from 'react';
import { TEAM_DATA } from '../constants';
import { FormData } from '../types';
import { registerClick } from '../services/tracker';
import { getNextProfessionalIndex } from '../services/queue';
import { Lock, Loader2, Phone } from 'lucide-react';
import { WhatsAppIcon } from './Icons';

export const ContactForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        period: 'indiferente',
        message: ''
    });

    // Formatação simples de telefone enquanto digita
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove não números
        if (value.length > 11) value = value.slice(0, 11);

        // Máscara visual (21) 99999-9999
        if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        }
        if (value.length > 10) {
            value = `${value.slice(0, 10)}-${value.slice(10)}`;
        }

        setFormData({ ...formData, phone: value });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) return alert("Por favor, preencha seu nome.");
        if (!formData.phone || formData.phone.length < 14) return alert("Por favor, preencha um WhatsApp válido com DDD.");

        setIsLoading(true);

        try {
            // 1. RODÍZIO: Define quem vai atender
            const index = await getNextProfessionalIndex();
            const targetProfessional = TEAM_DATA[index];

            // 2. Monta a Mensagem para o WhatsApp
            const periodText = formData.period !== 'indiferente' ? `no período da *${formData.period}*` : 'em qualquer horário';
            const userMsg = formData.message ? `\n\nMinha queixa principal é: ${formData.message}` : '';

            const text = `Olá, *${targetProfessional.name}*.
Me chamo *${formData.name}*.
Meu contato é: *${formData.phone}*.
Gostaria de agendar um atendimento psicológico, de preferência ${periodText}.${userMsg}`;

            const whatsappUrl = `https://wa.me/${targetProfessional.phone}?text=${encodeURIComponent(text)}`;

            // 3. REGISTRO: Salva no banco (agora com todos os dados)
            await registerClick(targetProfessional.id, formData);

            // 4. REDIRECIONA
            if (typeof (window as any).gtag_report_conversion === 'function') {
                (window as any).gtag_report_conversion();
            }
            window.open(whatsappUrl, '_blank');

            // 5. LIMPA
            setFormData({ name: '', phone: '', period: 'indiferente', message: '' });

        } catch (error) {
            console.error("Erro no processo de agendamento:", error);
            alert("Ocorreu um erro ao redirecionar. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="agendamento" className="py-24 bg-green-900 relative overflow-hidden">
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fbbf24 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
                {/* Copy */}
                <div className="md:w-1/2 text-white text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-serif mb-6">Comece sua jornada agora.</h2>
                    <p className="text-green-100 text-lg mb-8 font-light leading-relaxed">
                        Preencha o formulário para ser direcionado automaticamente ao WhatsApp de um de nossos especialistas.
                        <br /><br />
                        <strong>Simples, rápido e confidencial.</strong>
                    </p>
                    <div className="hidden md:flex items-center gap-4 text-green-200 text-sm">
                        <Lock size={16} />
                        <span>Seus dados são armazenados com segurança e sigilo.</span>
                    </div>
                </div>

                {/* Form Card */}
                <div className="md:w-1/2 w-full">
                    <div className="bg-white rounded-2xl shadow-2xl shadow-green-950/50 p-8">
                        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                            {/* Nome */}
                            <div>
                                <label className="block text-xs font-bold text-green-900 uppercase tracking-wider mb-2">Seu Nome</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                                    placeholder="Como gostaria de ser chamado(a)?"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    disabled={isLoading}
                                />
                            </div>

                            {/* WhatsApp (Novo Campo) */}
                            <div>
                                <label className="block text-xs font-bold text-green-900 uppercase tracking-wider mb-2">Seu WhatsApp</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                                        <Phone size={16} />
                                    </div>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-10 p-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                                        placeholder="(DD) 99999-9999"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* Período */}
                            <div>
                                <label className="block text-xs font-bold text-green-900 uppercase tracking-wider mb-2">Período de Preferência</label>
                                <select
                                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                                    value={formData.period}
                                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                    disabled={isLoading}
                                >
                                    <option value="indiferente">Tenho flexibilidade de horário</option>
                                    <option value="Manhã">Manhã</option>
                                    <option value="Tarde">Tarde</option>
                                    <option value="Noite">Noite</option>
                                </select>
                            </div>

                            {/* Mensagem */}
                            <div>
                                <label className="block text-xs font-bold text-green-900 uppercase tracking-wider mb-2">Mensagem (Opcional)</label>
                                <textarea
                                    rows={2}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                                    placeholder="Gostaria de adiantar o motivo da consulta?"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    disabled={isLoading}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-bold py-4 rounded-lg transition transform hover:scale-[1.01] active:scale-95 shadow-lg flex items-center justify-center gap-2 mt-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        <span>Direcionando...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Agendar consulta online</span>
                                        <WhatsAppIcon className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                            <p className="text-xs text-stone-400 text-center mt-2">Você será redirecionado para o WhatsApp de um profissional disponível.</p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};