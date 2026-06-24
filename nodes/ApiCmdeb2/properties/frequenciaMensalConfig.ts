import type {INodeProperties} from 'n8n-workflow';

export const frequenciaMensalConfig: INodeProperties[] = [

    // ─── Parâmetros de Rota (Obrigatórios) ────────────────────────────────────
    {
        displayName: 'Ano de Referência',
        name: 'ano_referencia',
        type: 'number',
        default: new Date().getFullYear(),
        required: true,
        description: 'Ano de referência (YYYY)',
        typeOptions: {minValue: 2024, maxValue: new Date().getFullYear()},
        displayOptions: {
            show: {
                endpoints: [
                    'listFrequenciaMensalPeriodo',
                    'listFrequenciaMensalFaltantes',
                    'createFrequenciaMensalLote',
                    'editFrequenciaMensalLote'
                ]
            }
        },
    },
    {
        displayName: 'Mês de Referência',
        name: 'mes_referencia',
        type: 'number',
        default: new Date().getMonth() + 1,
        required: true,
        description: 'Mês de referência (1 a 12)',
        typeOptions: {minValue: 1, maxValue: 12},
        displayOptions: {
            show: {
                endpoints: [
                    'listFrequenciaMensalPeriodo',
                    'listFrequenciaMensalFaltantes',
                    'createFrequenciaMensalLote',
                    'editFrequenciaMensalLote'
                ]
            }
        },
    },

    // ─── Parâmetros de Busca (Opcionais) para a Listagem Genérica ─────────────
    {
        displayName: 'Ano de Referência',
        name: 'ano_referencia_query',
        type: 'number',
        default: new Date().getFullYear(),
        required: false,
        description: 'Ano de referência (YYYY). Opcional na listagem genérica.',
        typeOptions: {minValue: 2024, maxValue: new Date().getFullYear()},
        displayOptions: {
            show: {
                endpoints: ['listFrequenciaMensal']
            }
        },
    },
    {
        displayName: 'Mês de Referência',
        name: 'mes_referencia_query',
        type: 'number',
        default: new Date().getMonth() + 1,
        required: false,
        description: 'Mês de referência (1 a 12). Requer que o Ano de Referência esteja preenchido.',
        typeOptions: {minValue: 1, maxValue: 12},
        displayOptions: {
            show: {
                endpoints: ['listFrequenciaMensal']
            }
        },
    },

    // ─── Parâmetros de Filtro (Query) Compartilhados ──────────────────────────
    {
        displayName: 'ID SGP da Instituição',
        name: 'id_sgp_entidade',
        type: 'number',
        default: null,
        required: false,
        description: 'ID SGP interno da instituição de ensino',
        displayOptions: {
            show: {
                endpoints: [
                    'listFrequenciaMensal',
                    'listFrequenciaMensalPeriodo',
                    'listFrequenciaMensalFaltantes'
                ]
            }
        },
    },
    {
        displayName: 'ID SGP da Matrícula',
        name: 'id_sgp_matricula',
        type: 'number',
        default: null,
        required: false,
        description: 'ID SGP da matrícula do estudante',
        displayOptions: {
            show: {
                endpoints: [
                    'listFrequenciaMensal',
                    'listFrequenciaMensalPeriodo'
                ]
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
                endpoints: [
                    'listFrequenciaMensal',
                    'listFrequenciaMensalPeriodo',
                    'listFrequenciaMensalFaltantes'
                ]
            }
        },
    },
    {
        displayName: 'CPF do Estudante',
        name: 'estudante_cpf',
        type: 'string',
        default: '',
        required: false,
        description: 'CPF do estudante',
        displayOptions: {
            show: {
                endpoints: [
                    'listFrequenciaMensal',
                    'listFrequenciaMensalPeriodo',
                    'listFrequenciaMensalFaltantes'
                ]
            }
        },
    },
    {
        displayName: 'Filtrar Pé-de-Meia (Apenas EM)',
        name: 'pdm',
        type: 'boolean',
        default: false,
        required: false,
        description: 'Filtra apenas etapas de ensino referentes ao Pé-de-Meia (Ensino Médio)',
        displayOptions: {
            show: {
                endpoints: ['listFrequenciaMensalFaltantes']
            }
        },
    },

    // ─── Paginação ────────────────────────────────────────────────────────────
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
                    'listFrequenciaMensal',
                    'listFrequenciaMensalPeriodo',
                    'listFrequenciaMensalFaltantes'
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
                    'listFrequenciaMensal',
                    'listFrequenciaMensalPeriodo',
                    'listFrequenciaMensalFaltantes'
                ]
            }
        },
    },

    // ─── Body Params: Operações de Lote ───────────────────────────────────────
    {
        displayName: 'Frequências (JSON)',
        name: 'frequencias_cadastro_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de objetos com dados de cadastro das frequências.',
        displayOptions: {
            show: {
                endpoints: ['createFrequenciaMensalLote']
            }
        },
    },
    {
        displayName: 'Frequências para Edição (JSON)',
        name: 'frequencias_edicao_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de objetos com os dados da edição. Campos obrigatórios: editar_frequencia, justificativa_edicao_frequencia, id_sgp_matricula, ano_referencia, mes_referencia, hl_ofertada_periodo, hl_presente_estudante_periodo.',
        displayOptions: {
            show: {
                endpoints: ['editFrequenciaMensalLote']
            }
        },
    },

    // ─── createFrequenciaMatriculasInativasLote ───────────────────────────────
    {
        displayName: 'Frequências (JSON)',
        name: 'frequencias_matriculas_inativas_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de frequências de matrículas inativas a cadastrar. Consulte a documentação para os campos obrigatórios',
        displayOptions: {show: {endpoints: ['createFrequenciaMatriculasInativasLote']}},
    },
];