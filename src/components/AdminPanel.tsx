import React, { useState, useEffect } from 'react';
import { TEAM_DATA } from '../constants';
import { ClickStats, LeadLog } from '../types';
import { subscribeToStats, getLeadsReport } from '../services/tracker';
import { getCurrentQueueState } from '../services/queue';
import { X, Lock, Wifi, WifiOff, Calendar, Loader2, ChevronDown, User, Phone, MessageSquare, Clock, ListOrdered, FileDown, Search, Filter } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Props {
    onClose: () => void;
}

type TimeFilter = 'total' | 'today' | 'yesterday' | '7days' | '15days' | '30days' | 'custom' | 'month';

export const AdminPanel: React.FC<Props> = ({ onClose }) => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [stats, setStats] = useState<ClickStats>({});
    const [leads, setLeads] = useState<LeadLog[]>([]);
    const [isOnline, setIsOnline] = useState(true);
    const [filter, setFilter] = useState<TimeFilter>('7days');
    const [customStart, setCustomStart] = useState('');
    const [customEnd, setCustomEnd] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [isLoading, setIsLoading] = useState(false);
    const [nextIndex, setNextIndex] = useState<number | null>(null);
    const [expandedProId, setExpandedProId] = useState<string | null>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'acessocoletivamentepremium') {
            setIsAuthenticated(true);
        } else {
            alert('Senha incorreta.');
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;

        const loadData = async () => {
            setIsLoading(true);
            const now = new Date();
            let start = new Date();
            let end = new Date();

            if (filter === 'today') {
                start.setHours(0, 0, 0, 0);
            } else if (filter === 'yesterday') {
                start.setDate(now.getDate() - 1);
                start.setHours(0, 0, 0, 0);
                end.setDate(now.getDate() - 1);
                end.setHours(23, 59, 59, 999);
            } else if (filter === '7days') {
                start.setDate(now.getDate() - 7);
            } else if (filter === '15days') {
                start.setDate(now.getDate() - 15);
            } else if (filter === '30days') {
                start.setDate(now.getDate() - 30);
            } else if (filter === 'custom' && customStart && customEnd) {
                start = new Date(customStart + 'T00:00:00');
                end = new Date(customEnd + 'T23:59:59');
            } else if (filter === 'month') {
                start = new Date(selectedYear, selectedMonth, 1);
                end = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59);
            } else {
                start.setDate(now.getDate() - 90);
            }

            try {
                // 1. Leads e Stats
                const leadsData = await getLeadsReport(start, end);
                setLeads(leadsData);

                if (filter === 'total') {
                    subscribeToStats(setStats);
                } else {
                    const calculatedStats: ClickStats = {};
                    leadsData.forEach(lead => {
                        calculatedStats[lead.professionalId] = (calculatedStats[lead.professionalId] || 0) + 1;
                    });
                    setStats(calculatedStats);
                }

                // 2. Estado da Fila (Para avaliar se o rodízio está certo)
                const currentIdx = await getCurrentQueueState();
                setNextIndex(currentIdx);

                setIsOnline(true);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [isAuthenticated, filter, customStart, customEnd, selectedMonth, selectedYear]);

    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Data", "Paciente", "Telefone", "Profissional", "Mensagem"];
        const tableRows: any[] = [];

        leads.forEach(lead => {
            const date = lead.timestamp?.toDate ? lead.timestamp.toDate() : new Date(lead.timestamp);
            const proName = TEAM_DATA.find(t => t.id === lead.professionalId)?.name || 'N/A';
            const leadData = [
                date.toLocaleDateString('pt-BR'),
                lead.patientName,
                lead.patientPhone,
                proName,
                lead.message || '-'
            ];
            tableRows.push(leadData);
        });

        doc.text("ColetivaMente - Relatório de Leads", 14, 15);
        const filterText = filter === 'month' 
            ? `Mês: ${new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(selectedYear, selectedMonth))} / ${selectedYear}`
            : filter === 'custom' 
                ? `Período: ${customStart} a ${customEnd}`
                : `Filtro: ${filter}`;
        
        doc.setFontSize(10);
        doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 22);
        doc.text(filterText, 14, 27);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 32,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [20, 83, 45] } // Green-900
        });

        doc.save(`leads_coletivamente_${new Date().getTime()}.pdf`);
    };

    const formatTimestamp = (timestamp: any) => {
        if (!timestamp) return '-';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
    };

    if (!isAuthenticated) {
        return (
            <div className="fixed inset-0 z-[60] bg-stone-900/90 backdrop-blur-md flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-stone-200">
                    <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-red-500 transition"><X size={20} /></button>
                    <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-serif text-center text-green-900 mb-2">Área Restrita</h2>
                    <p className="text-stone-500 text-center text-sm mb-8">Identifique-se para acessar o núcleo de gestão.</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            autoFocus
                            className="w-full border border-stone-200 bg-stone-50 rounded-xl p-4 focus:ring-2 focus:ring-orange-500 outline-none transition text-center text-lg tracking-widest"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button type="submit" className="w-full bg-green-900 text-white rounded-xl py-4 font-bold hover:bg-green-800 transition-all shadow-lg active:scale-95">Acessar Painel</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[60] bg-stone-50 overflow-y-auto font-sans">
            <div className="max-w-6xl mx-auto p-4 md:p-8">
                {/* Top Header */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-green-900 text-white p-3 rounded-2xl">
                            <ListOrdered size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-serif font-bold text-green-900 leading-tight">Gestão de Pacientes</h1>
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                                <span className="text-xs text-stone-500 uppercase font-bold tracking-tighter">Sistema Operacional</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={exportToPDF}
                            className="px-6 py-2 bg-green-600 text-white rounded-full font-bold text-sm hover:bg-green-700 transition shadow-sm flex items-center gap-2"
                        >
                            <FileDown size={16} /> Exportar PDF
                        </button>
                        <button onClick={onClose} className="px-6 py-2 bg-white border border-stone-200 text-stone-600 rounded-full font-bold text-sm hover:bg-red-50 hover:text-red-600 transition shadow-sm">
                            Fechar Painel
                        </button>
                    </div>
                </div>

                {/* Dashboard Grid & Filters */}
                <div className="grid lg:grid-cols-4 gap-6 mb-8">
                    {/* Status da Fila */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex flex-col md:flex-row items-center gap-6">
                        <div className="bg-orange-50 p-4 rounded-xl text-orange-600 shrink-0">
                            <Clock size={32} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-1">Próxima da Fila</h3>
                            <div className="text-xl font-bold text-green-900">
                                {nextIndex !== null ? TEAM_DATA[nextIndex].name : 'Carregando...'}
                            </div>
                            <p className="text-[10px] text-stone-500 mt-1">Alternância automática entre profissionais.</p>
                        </div>
                        <div className="flex gap-1">
                            {TEAM_DATA.map((_, idx) => (
                                <div key={idx} className={`w-6 h-1.5 rounded-full transition-all ${idx === nextIndex ? 'bg-orange-500 w-10' : 'bg-stone-200'}`}></div>
                            ))}
                        </div>
                    </div>

                    {/* Filtros de Data */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 lg:col-span-2">
                        <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Calendar size={14} /> Filtro Temporal
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value as TimeFilter)}
                                className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-green-900 outline-none"
                            >
                                <option value="7days">Últimos 7 dias</option>
                                <option value="15days">15 dias</option>
                                <option value="30days">30 dias</option>
                                <option value="month">Mês Específico</option>
                                <option value="custom">Período Custom</option>
                                <option value="total">Histórico Completo</option>
                                <option value="today">Hoje</option>
                                <option value="yesterday">Ontem</option>
                            </select>

                            {filter === 'month' && (
                                <>
                                    <select
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                        className="p-2.5 bg-orange-50 border border-orange-200 rounded-xl text-xs font-bold text-orange-700 outline-none"
                                    >
                                        {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].map((m, i) => (
                                            <option key={i} value={i}>{m}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                        className="p-2.5 bg-orange-50 border border-orange-200 rounded-xl text-xs font-bold text-orange-700 outline-none"
                                    >
                                        {[2023, 2024, 2025, 2026].map(y => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                </>
                            )}

                            {filter === 'custom' && (
                                <>
                                    <input 
                                        type="date" 
                                        value={customStart}
                                        onChange={e => setCustomStart(e.target.value)}
                                        className="p-2 bg-stone-50 border border-stone-200 rounded-xl text-[10px] font-bold outline-none"
                                    />
                                    <input 
                                        type="date" 
                                        value={customEnd}
                                        onChange={e => setCustomEnd(e.target.value)}
                                        className="p-2 bg-stone-50 border border-stone-200 rounded-xl text-[10px] font-bold outline-none"
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Professionals List */}
                {isLoading ? (
                    <div className="h-64 flex flex-col items-center justify-center text-stone-400">
                        <Loader2 size={40} className="animate-spin mb-4 text-orange-500" />
                        <p className="font-medium">Sincronizando com o banco de dados...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {TEAM_DATA.map((pro) => {
                            const proLeads = leads.filter(l => l.professionalId === pro.id);
                            const isExpanded = expandedProId === pro.id;

                            return (
                                <div key={pro.id} className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-2 ring-orange-500/20 border-orange-200 shadow-xl' : 'border-stone-200 shadow-sm'}`}>
                                    <div
                                        className="p-5 flex flex-col md:flex-row items-center justify-between cursor-pointer group"
                                        onClick={() => setExpandedProId(isExpanded ? null : pro.id)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img src={pro.image} alt={pro.name} className="w-14 h-14 rounded-xl object-cover grayscale group-hover:grayscale-0 transition duration-500" />
                                                {TEAM_DATA[nextIndex || 0].id === pro.id && (
                                                    <div className="absolute -top-2 -right-2 bg-orange-500 text-white p-1 rounded-full animate-bounce">
                                                        <Clock size={12} />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-green-900">{pro.name}</h3>
                                                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">{pro.crp}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8 mt-4 md:mt-0">
                                            <div className="text-center md:text-right">
                                                <span className="block text-2xl font-serif font-bold text-green-900 leading-none">
                                                    {stats[pro.id] || 0}
                                                </span>
                                                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Contatos</span>
                                            </div>
                                            <div className={`text-stone-300 transition-transform ${isExpanded ? 'rotate-180 text-orange-500' : ''}`}>
                                                <ChevronDown size={20} />
                                            </div>
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="bg-stone-50/50 border-t border-stone-100 p-6 animate-slide-down">
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="text-sm font-bold text-stone-600 flex items-center gap-2">
                                                    <User size={16} className="text-orange-500" /> Pacientes Interessados
                                                </h4>
                                            </div>

                                            {proLeads.length === 0 ? (
                                                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-stone-200">
                                                    <p className="text-sm text-stone-400 italic">Nenhum registro encontrado para este filtro.</p>
                                                </div>
                                            ) : (
                                                <div className="grid gap-3">
                                                    {proLeads.map((lead, idx) => {
                                                        const isTest = lead.patientName.toLowerCase().includes('teste');
                                                        return (
                                                            <div
                                                                key={idx}
                                                                className={`bg-white p-4 rounded-xl border border-stone-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition ${isTest ? 'opacity-40 border-dashed bg-stone-50' : ''}`}
                                                                title={isTest ? "Registro de teste (Não contabilizado no placar)" : ""}
                                                            >
                                                                <div>
                                                                    <div className="font-bold text-green-900 flex items-center gap-2">
                                                                        {lead.patientName}
                                                                        {isTest && <span className="text-[9px] bg-red-100 text-red-600 px-1 rounded uppercase tracking-wider border border-red-200">Teste</span>}
                                                                        <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded text-stone-500 font-bold uppercase tracking-widest">{lead.period}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 text-sm text-stone-500 mt-1">
                                                                        <Phone size={14} className="text-green-500" />
                                                                        {lead.patientPhone}
                                                                        <a
                                                                            href={`https://wa.me/55${lead.patientPhone.replace(/\D/g, '')}`}
                                                                            target="_blank" rel="noreferrer"
                                                                            className="ml-2 text-green-600 hover:text-green-700 p-1 hover:bg-green-50 rounded transition"
                                                                        >
                                                                            <WhatsAppIcon className="w-4 h-4" />
                                                                        </a>
                                                                    </div>
                                                                    {lead.message && (
                                                                        <div className="text-xs text-stone-400 mt-2 bg-stone-50 p-2 rounded-lg italic border-l-2 border-stone-200">
                                                                            "{lead.message}"
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="text-[10px] font-bold text-stone-300 uppercase bg-stone-50 px-3 py-2 rounded-lg flex flex-col items-end">
                                                                    <div className="flex items-center gap-1 text-stone-500">
                                                                        <Clock size={10} /> {formatTimestamp(lead.timestamp)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="mt-12 text-center text-stone-400 text-xs">
                    <p>ColetivaMente v2.5 • Sistema de Rodízio Seguro via Transações Cloud</p>
                </div>
            </div>
        </div>
    );
};