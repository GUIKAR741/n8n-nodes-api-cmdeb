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
    {
        displayName: 'Incluir Endereço',
        name: 'include_endereco',
        type: 'boolean',
        default: false,
        required: false,
        description: 'Whether inclui dados de endereço do profissional',
        displayOptions: {show: {endpoints: ['listProfissionais']}},
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

    // ─── listProfissionaisEnturmacao ──────────────────────────────────────────
    {
        displayName: 'ID SGP da Turma',
        name: 'id_sgp_turma',
        type: 'number',
        default: '',
        required: false,
        description: 'ID SGP da turma para filtrar as alocações',
        displayOptions: {show: {endpoints: ['listProfissionaisEnturmacao']}},
    },
    {
        displayName: 'ID SGP do Componente Curricular',
        name: 'id_sgp_componente_curricular',
        type: 'number',
        default: '',
        required: false,
        description: 'ID SGP do componente curricular para filtrar as alocações',
        displayOptions: {show: {endpoints: ['listProfissionaisEnturmacao']}},
    },
    {
        displayName: 'ID SGP da Função',
        name: 'id_sgp_funcao',
        type: 'number',
        default: '',
        required: false,
        description: 'ID SGP do vínculo/função do profissional',
        displayOptions: {show: {endpoints: ['listProfissionaisEnturmacao']}},
    },
    {
        displayName: 'Código INEP da Instituição',
        name: 'co_entidade',
        type: 'string',
        default: '',
        required: false,
        description: 'Código INEP da instituição de ensino',
        displayOptions: {show: {endpoints: ['listProfissionaisEnturmacao']}},
    },
    {
        displayName: 'Página',
        name: 'page',
        type: 'number',
        default: 1,
        required: false,
        description: 'Número da página',
        typeOptions: {minValue: 1},
        displayOptions: {show: {endpoints: ['listProfissionaisEnturmacao']}},
    },
    {
        displayName: 'Itens por Página',
        name: 'page_size',
        type: 'number',
        default: 100,
        required: false,
        description: 'Itens por página (padrão: 100, máximo: 5000)',
        typeOptions: {minValue: 1, maxValue: 5000},
        displayOptions: {show: {endpoints: ['listProfissionaisEnturmacao']}},
    },

    // ─── createProfissionaisEnturmacaoLote ────────────────────────────────────
    {
        displayName: 'Alocações (JSON)',
        name: 'profissionais_enturmacao_cadastro_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de vínculos de profissionais a turmas/componentes curriculares a cadastrar',
        displayOptions: {show: {endpoints: ['createProfissionaisEnturmacaoLote']}},
    },

    // ─── editProfissionaisEnturmacaoLote ──────────────────────────────────────
    {
        displayName: 'Alocações (JSON)',
        name: 'profissionais_enturmacao_edicao_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de vínculos de profissionais a turmas/componentes curriculares a editar',
        displayOptions: {show: {endpoints: ['editProfissionaisEnturmacaoLote']}},
    },
];