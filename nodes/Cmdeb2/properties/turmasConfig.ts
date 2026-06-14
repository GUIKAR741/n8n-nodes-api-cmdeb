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
        type: 'number',
        default: null,
        required: false,
        description: 'Código da etapa de ensino da turma',
        displayOptions: {
            show: {
                endpoints: ['listTurmas']
            }
        },
    },
    {
        displayName: 'Turno da Turma',
        name: 'co_turno_turma',
        type: 'options',
        default: '',
        required: false,
        description: 'Turno em que a turma ocorre',
        options: [
            {name: 'Matutino', value: 1},
            {name: 'Vespertino', value: 2},
            {name: 'Noturno', value: 3},
            {name: 'Integral', value: 4},
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