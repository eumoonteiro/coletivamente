import { Professional } from "./types";

export const SUPPORT_PHONE = '5521964492913';

// --- CONFIGURAÇÃO DE IMAGENS ---
// Certifique-se que os arquivos na pasta public/img tenham EXATAMENTE
// os nomes abaixo: ana.jpg, cintia.jpg, patricia.jpg, aline.jpg

// Adicionei "?v=4" para forçar o navegador a recarregar a imagem nova
export const LOGO_URL = '/img/logo.png?v=4';

// IMAGEM DE CAPA (HERO)
// Coloque sua foto na pasta public/img com o nome "hero.jpg"
// Atualizei para v=4 para garantir que o navegador baixe a nova versão
export const HERO_IMAGE_URL = '/img/hero.jpg?v=4';

export const TEAM_DATA: Professional[] = [
    {
        id: 'aline',
        name: 'Aline Gomes',
        role: 'Psicóloga',
        crp: 'CRP 05/83580',
        approach: 'TCC e Terapias Contextuais',
        phone: '5521978776780',
        image: '/img/aline.jpg',
        quote: 'Regular as emoções não é eliminar o desconforto é sobre aprender, responder a ele de uma forma mais funcional.',
        author: 'Autoral',
        education: [
            'Psicóloga formada pela Faculdade Maria Thereza',
            'Experiência no acompanhamento clínico adolescente e adultos',
            'Especializanda em Terapia Cognitiva Comportamental ( TCC)',
            'Especializanda em análise do comportamento aplicada (ABA)'
        ]
    },
    {
        id: 'ana',
        name: 'Ana Lúcia Rodrigues',
        role: 'Psicóloga',
        crp: 'CRP 05/80983',
        approach: 'Psicanálise',
        phone: '5521971643070',
        image: '/img/ana.jpg',
        quote: 'Qual a sua responsabilidade na desordem da qual você se queixa?',
        author: 'Sigmund Freud',
        education: [
            'Psicóloga formada pela Faculdade Maria Thereza',
            'Especializanda em Saúde Pública',
            'Psicanalista em permanente percurso psicanalítico'
        ]
    },
    {
        id: 'cintia',
        name: 'Cintia Carvalho',
        role: 'Psicóloga',
        crp: 'CRP 05/81548',
        approach: 'TCC, Neuropsicologia e AHSD',
        phone: '5521975546617',
        image: '/img/cintia.jpg',
        quote: 'Ser empático é ver o mundo com os olhos do outro e não ver o nosso mundo refletido nos olhos dele.',
        author: 'Carl Rogers',
        education: [
            'Psicóloga formada pela Faculdade Maria Thereza',
            'Especialista em Terapia Cognitivo Comportamental (TCC)',
            'Especialista em Altas Habilidades e/ou Superdotação (AHSD)',
            'Pós-graduanda em neuropsicologia',
            'Especialista em psicopedagogia',
            'Curso de formação em Transtorno do Espectro Autista (TEA) para adolescentes e adultos'
        ]
    },
    {
        id: 'patricia',
        name: 'Patrícia Bernardes',
        role: 'Psicóloga',
        crp: 'CRP 05/83937',
        approach: 'Psicanálise',
        phone: '5521983866784',
        image: '/img/patricia.jpg',
        quote: 'Volte seus olhos para dentro, contemple suas próprias profundezas, aprenda primeiro a conhecer-se.',
        author: 'Sigmund Freud',
        education: [
            'Psicóloga formada pela Faculdade Maria Thereza',
            'Formação clínica em Psicanálise desde 2020 (atendimento adulto)',
            'Especializanda em Clínica Psicanalítica'
        ]
    }
];