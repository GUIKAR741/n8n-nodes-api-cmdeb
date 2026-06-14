import type {INodeProperties} from 'n8n-workflow';

export const profissionaisConfig: INodeProperties[] = [

    // ─── listProfissionais (Parâmetros de Busca) ──────────────────────────────
    {
        displayName: 'ID SGP do Profissional',
        name: 'id_sgp_profissional',
        type: 'number',
        default: null,
        required: false,
        description: 'ID SGP interno do profissional',
        displayOptions: {
            show: {
                endpoints: ['listProfissionais']
            }
        },
    },
    {
        displayName: 'ID SGP da Instituição',
        name: 'id_sgp_instituicao',
        type: 'number',
        default: null,
        required: false,
        description: 'ID SGP da instituição — filtra profissionais com função nessa instituição',
        displayOptions: {
            show: {
                endpoints: ['listProfissionais']
            }
        },
    },
    {
        displayName: 'CPF do Profissional',
        name: 'profissional_cpf',
        type: 'string',
        default: '',
        required: false,
        description: 'CPF do profissional (apenas números)',
        displayOptions: {
            show: {
                endpoints: ['listProfissionais']
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
                endpoints: ['listProfissionais']
            }
        },
    },
    {
        displayName: 'Nome do Profissional',
        name: 'profissional_nome',
        type: 'string',
        default: '',
        required: false,
        description: 'Busca parcial case-insensitive pelo nome do profissional',
        displayOptions: {
            show: {
                endpoints: ['listProfissionais']
            }
        },
    },
    {
        displayName: 'Código da Função/Ocupação',
        name: 'co_ocupacao_funcao',
        type: 'number',
        default: null,
        required: false,
        description: 'Código da função ou ocupação (Ex: 1=Docente, 10=Diretor)',
        displayOptions: {
            show: {
                endpoints: ['listProfissionais']
            }
        },
    },
    {
        displayName: 'Situação do Vínculo',
        name: 'co_situacao_profissional_educacao_funcao',
        type: 'number',
        default: null,
        required: false,
        description: 'Situação do vínculo do profissional na educação (Ex: 1=Ativo, 2=Inativo)',
        displayOptions: {
            show: {
                endpoints: ['listProfissionais']
            }
        },
    },

    // ─── Paginação (listProfissionais) ────────────────────────────────────────
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
                endpoints: ['listProfissionais']
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
                endpoints: ['listProfissionais']
            }
        },
    },

    // ─── Operações em Lote (Body Params) ──────────────────────────────────────
    {
        displayName: 'Profissionais para Cadastro (JSON)',
        name: 'profissionais_cadastro_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de objetos contendo os dados dos profissionais para cadastro.',
        displayOptions: {
            show: {
                endpoints: ['createProfissionaisLote']
            }
        },
    },
    {
        displayName: 'Profissionais para Edição (JSON)',
        name: 'profissionais_edicao_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de objetos contendo os dados (pessoais/cadastrais) dos profissionais para edição.',
        displayOptions: {
            show: {
                endpoints: ['editProfissionaisLote']
            }
        },
    },
    {
        displayName: 'Funções para Adição (JSON)',
        name: 'profissionais_funcoes_adicao_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de objetos contendo as funções a serem adicionadas aos profissionais já existentes.',
        displayOptions: {
            show: {
                endpoints: ['addFuncoesProfissionaisLote']
            }
        },
    },
    {
        displayName: 'Funções para Edição (JSON)',
        name: 'profissionais_funcoes_edicao_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de objetos contendo as funções a serem editadas.',
        displayOptions: {
            show: {
                endpoints: ['editFuncoesProfissionaisLote']
            }
        },
    },
    {
        displayName: 'Formações para Adição (JSON)',
        name: 'profissionais_formacoes_adicao_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de objetos contendo as formações acadêmicas a serem adicionadas.',
        displayOptions: {
            show: {
                endpoints: ['addFormacoesProfissionaisLote']
            }
        },
    },
    {
        displayName: 'Formações para Edição (JSON)',
        name: 'profissionais_formacoes_edicao_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de objetos contendo as formações acadêmicas a serem editadas.',
        displayOptions: {
            show: {
                endpoints: ['editFormacoesProfissionaisLote']
            }
        },
    },
];