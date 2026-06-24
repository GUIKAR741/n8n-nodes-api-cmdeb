import type {INodeProperties} from 'n8n-workflow';

export const turmasConfig: INodeProperties[] = [

    // ─── Parâmetros de Rota (Obrigatórios) ────────────────────────────────────
    {
        displayName: 'ID SGP da Turma',
        name: 'id_sgp_turma',
        type: 'number',
        default: null,
        required: true,
        description: 'ID SGP interno da turma. Usado para buscar os componentes curriculares vinculados a ela.',
        displayOptions: {
            show: {
                endpoints: ['listComponentesCurricularesTurma']
            }
        },
    },

    // ─── Parâmetros de Busca (Query) para listTurmas ──────────────────────────
    {
        displayName: 'ID SGP da Instituição',
        name: 'id_sgp_instituicao',
        type: 'number',
        default: null,
        required: false,
        description: 'ID SGP interno da instituição',
        displayOptions: {
            show: {
                endpoints: ['listTurmas']
            }
        },
    },
    {
        displayName: 'ID SGP do Componente Curricular',
        name: 'id_sgp_componente_curricular',
        type: 'number',
        default: null,
        required: false,
        description: 'Retorna turmas que possuem esse componente curricular específico',
        displayOptions: {
            show: {
                endpoints: ['listTurmas']
            }
        },
    },
    {
        displayName: 'Código INEP da Instituição',
        name: 'co_entidade',
        type: 'string',
        default: '',
        required: false,
        description: 'Código INEP da instituição de ensino',
        displayOptions: {
            show: {
                endpoints: ['listTurmas']
            }
        },
    },
    {
        displayName: 'Nome da Turma',
        name: 'no_turma',
        type: 'string',
        default: '',
        required: false,
        description: 'Busca parcial case-insensitive pelo nome da turma',
        displayOptions: {
            show: {
                endpoints: ['listTurmas']
            }
        },
    },
    {
        displayName: 'Etapa de Ensino',
        name: 'co_etapa_ensino',
        type: 'options',
        default: '',
        required: false,
        description: 'Etapa de ensino da turma',
        options: [
            { name: 'Todas', value: '' },
            { name: 'Educação Infantil - Creche (0 a 3 anos) - (1)', value: 1 },
            { name: 'Educação Infantil - Pré-escola (4 e 5 anos) - (2)', value: 2 },
            { name: 'Educação Infantil - Unificada (0 a 5 anos) - (3)', value: 3 },
            { name: 'Ensino Fundamental 9 anos - 1º ano - (14)', value: 14 },
            { name: 'Ensino Fundamental 9 anos - 2º ano - (15)', value: 15 },
            { name: 'Ensino Fundamental 9 anos - 3º ano - (16)', value: 16 },
            { name: 'Ensino Fundamental 9 anos - 4º ano - (17)', value: 17 },
            { name: 'Ensino Fundamental 9 anos - 5º ano - (18)', value: 18 },
            { name: 'Ensino Fundamental 9 anos - 6º ano - (19)', value: 19 },
            { name: 'Ensino Fundamental 9 anos - 7º ano - (20)', value: 20 },
            { name: 'Ensino Fundamental 9 anos - 8º ano - (21)', value: 21 },
            { name: 'Ensino Fundamental 9 anos - 9º ano - (41)', value: 41 },
            { name: 'Ensino Fundamental 9 anos - Multi - (22)', value: 22 },
            { name: 'Ensino Fundamental 9 anos - Correção de Fluxo - (23)', value: 23 },
            { name: 'Educação Infantil e Ensino Fundamental Multietapa - (56)', value: 56 },
            { name: 'Ensino Médio - 1ª série - (25)', value: 25 },
            { name: 'Ensino Médio - 2ª série - (26)', value: 26 },
            { name: 'Ensino Médio - 3ª série - (27)', value: 27 },
            { name: 'Ensino Médio - 4ª série - (28)', value: 28 },
            { name: 'Ensino Médio - Não seriada - (29)', value: 29 },
            { name: 'Ensino Médio Normal/Magistério - 1ª série - (35)', value: 35 },
            { name: 'Ensino Médio Normal/Magistério - 2ª série - (36)', value: 36 },
            { name: 'Ensino Médio Normal/Magistério - 3ª série - (37)', value: 37 },
            { name: 'Ensino Médio Normal/Magistério - 4ª série - (38)', value: 38 },
            { name: 'EJA - Ensino Fundamental - Anos Iniciais (1º segmento) - (69)', value: 69 },
            { name: 'EJA - Ensino Fundamental - Anos Finais (2º segmento) - (70)', value: 70 },
            { name: 'EJA - Ensino Fundamental - Anos Iniciais e Finais (Multietapas) - (72)', value: 72 },
            { name: 'EJA - Ensino Médio (3º segmento) - (71)', value: 71 },
            { name: 'EJA - Curso FIC Integrado - Nível Fundamental - (73)', value: 73 },
            { name: 'EJA - Curso FIC Integrado - Nível Médio - (67)', value: 67 },
            { name: 'EJA - Curso Técnico Integrado - (74)', value: 74 },
            { name: 'Curso Técnico - Concomitante - (39)', value: 39 },
            { name: 'Curso Técnico - Subsequente - (40)', value: 40 },
            { name: 'Educação Profissional Mista / Curso Técnico Misto - (64)', value: 64 },
            { name: 'Curso FIC Concomitante - (68)', value: 68 },
            { name: 'Não aplicável (AEE / Atividade Complementar) - (0)', value: 0 },
        ],
        displayOptions: { show: { endpoints: ['listTurmas'] } },
    },
    {
        displayName: 'Turno da Turma',
        name: 'co_turno_turma',
        type: 'options',
        default: '',
        required: false,
        description: 'Turno em que a turma ocorre',
        options: [
            {name: 'Todos', value: ''},
            {name: 'Matutino - (1)', value: 1},
            {name: 'Vespertino - (2)', value: 2},
            {name: 'Noturno - (3)', value: 3},
            {name: 'Integral - (4)', value: 4},
        ],
        displayOptions: {
            show: {
                endpoints: ['listTurmas']
            }
        },
    },
    {
        displayName: 'Ano Letivo',
        name: 'nu_ano',
        type: 'number',
        default: new Date().getFullYear(),
        required: false,
        description: 'Ano letivo (ex: 2026)',
        typeOptions: {minValue: 2024, maxValue: new Date().getFullYear()},
        displayOptions: {
            show: {
                endpoints: ['listTurmas']
            }
        },
    },
    {
        displayName: 'Turma Ativa?',
        name: 'st_turma_ativa',
        type: 'boolean',
        default: false,
        required: false,
        description: 'Whether Se ativo, filtra turmas pela situação (ativas ou inativas). Omitir para trazer ambas.',
        displayOptions: {
            show: {
                endpoints: ['listTurmas']
            }
        },
    },

    // ─── Paginação (Compartilhada) ────────────────────────────────────────────
    {
        displayName: 'Página',
        name: 'page',
        type: 'number',
        default: 1,
        required: false,
        description: 'Número da página',
        typeOptions: {minValue: 1},
        displayOptions: {
            show: {
                endpoints: [
                    'listTurmas',
                    'listComponentesCurricularesTurma'
                ]
            }
        },
    },
    {
        displayName: 'Itens por Página',
        name: 'page_size',
        type: 'number',
        default: 100,
        required: false,
        description: 'Itens por página (padrão: 100, máximo: 5000)',
        typeOptions: {minValue: 1, maxValue: 5000},
        displayOptions: {
            show: {
                endpoints: [
                    'listTurmas',
                    'listComponentesCurricularesTurma'
                ]
            }
        },
    },

    // ─── Operações em Lote (Body Params) ──────────────────────────────────────
    {
        displayName: 'Turmas para Cadastro (JSON)',
        name: 'turmas_cadastro_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de objetos contendo os dados das turmas para cadastro.',
        displayOptions: {
            show: {
                endpoints: ['createTurmasLote']
            }
        },
    },
    {
        displayName: 'Turmas para Edição (JSON)',
        name: 'turmas_edicao_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de objetos contendo os dados das turmas para edição. Deve incluir a flag editar_turma: 1.',
        displayOptions: {
            show: {
                endpoints: ['editTurmasLote']
            }
        },
    },
];