import type {INodeProperties} from 'n8n-workflow';

export const pessoasConfig: INodeProperties[] = [

    // ─── Parâmetros de Filtro (Compartilhados) ────────────────────────────────
    {
        displayName: 'ID SGP da Pessoa',
        name: 'id_sgp_pessoa',
        type: 'number',
        default: null,
        required: false,
        description: 'ID SGP interno da pessoa',
        displayOptions: {
            show: {
                endpoints: [
                    'listSolicitacoesAlteracoes',
                    'listValidacoesCadastrais'
                ]
            }
        },
    },
    {
        displayName: 'Situação do CPF (Receita Federal)',
        name: 'st_situacao_cpf',
        type: 'options',
        default: '',
        required: false,
        description: 'Situação do CPF na Receita Federal',
        options: [
            {name: 'Regular', value: 0},
            {name: 'Suspensa', value: 2},
            {name: 'Titular Falecido', value: 3},
            {name: 'Pendente de Regularização', value: 4},
            {name: 'Cancelada por Multiplicidade', value: 5},
            {name: 'Nula', value: 8},
            {name: 'Cancelada de Ofício / Cancelada', value: 9},
            {name: 'Inexistente', value: 10},
        ],
        displayOptions: {
            show: {
                endpoints: [
                    'listSolicitacoesAlteracoes',
                    'listValidacoesCadastrais'
                ]
            }
        },
    },
    {
        displayName: 'Nome Validado?',
        name: 'fl_no_pessoa_validado',
        type: 'boolean',
        default: false,
        required: false,
        description: 'Whether Se ativo, filtra pessoas cujo nome foi validado na RFB. Omitir para não filtrar por esta regra.',
        displayOptions: {
            show: {
                endpoints: [
                    'listSolicitacoesAlteracoes',
                    'listValidacoesCadastrais'
                ]
            }
        },
    },
    {
        displayName: 'Data de Nascimento Validada?',
        name: 'fl_dt_nascimento_validado',
        type: 'boolean',
        default: false,
        required: false,
        description: 'Whether Se ativo, filtra pessoas cuja data de nascimento foi validada na RFB. Omitir para não filtrar por esta regra.',
        displayOptions: {
            show: {
                endpoints: [
                    'listSolicitacoesAlteracoes',
                    'listValidacoesCadastrais'
                ]
            }
        },
    },
    {
        displayName: 'Nome da Mãe Validado?',
        name: 'fl_no_mae_validado',
        type: 'boolean',
        default: false,
        required: false,
        description: 'Whether Se ativo, filtra pessoas cujo nome da mãe foi validado na RFB. Omitir para não filtrar por esta regra.',
        displayOptions: {
            show: {
                endpoints: [
                    'listSolicitacoesAlteracoes',
                    'listValidacoesCadastrais'
                ]
            }
        },
    },

    // ─── Específicos de listSolicitacoesAlteracoes ────────────────────────────
    {
        displayName: 'Tipo de Situação da Alteração',
        name: 'co_tipo_situacao',
        type: 'number',
        default: null,
        required: false,
        description: 'Tipo de situação da solicitação de alteração',
        displayOptions: {
            show: {
                endpoints: ['listSolicitacoesAlteracoes']
            }
        },
    },
    {
        displayName: 'Data de Criação Inicial',
        name: 'dt_criacao_inicio',
        type: 'dateTime',
        default: '',
        required: false,
        description: 'Limite inferior de data/hora de criação da solicitação',
        displayOptions: {
            show: {
                endpoints: ['listSolicitacoesAlteracoes']
            }
        },
    },
    {
        displayName: 'Data de Criação Final',
        name: 'dt_criacao_fim',
        type: 'dateTime',
        default: '',
        required: false,
        description: 'Limite superior de data/hora de criação da solicitação',
        displayOptions: {
            show: {
                endpoints: ['listSolicitacoesAlteracoes']
            }
        },
    },

    // ─── Específicos de listValidacoesCadastrais ──────────────────────────────
    {
        displayName: 'Status do Cadastro Validado',
        name: 'st_cadastro_validado',
        type: 'options',
        default: '',
        required: false,
        description: 'Situação geral da validação cadastral da pessoa',
        options: [
            {name: 'Em Validação', value: 1},
            {name: 'Autenticada', value: 2},
            {name: 'Não Autenticado', value: 3},
            {name: 'Inexistente', value: 4},
        ],
        displayOptions: {
            show: {
                endpoints: ['listValidacoesCadastrais']
            }
        },
    },
    {
        displayName: 'Data de Validação Inicial',
        name: 'dt_validacao_inicio',
        type: 'dateTime',
        default: '',
        required: false,
        description: 'Limite inferior de data/hora da validação cadastral',
        displayOptions: {
            show: {
                endpoints: ['listValidacoesCadastrais']
            }
        },
    },
    {
        displayName: 'Data de Validação Final',
        name: 'dt_validacao_fim',
        type: 'dateTime',
        default: '',
        required: false,
        description: 'Limite superior de data/hora da validação cadastral',
        displayOptions: {
            show: {
                endpoints: ['listValidacoesCadastrais']
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
                    'listSolicitacoesAlteracoes',
                    'listValidacoesCadastrais'
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
                    'listSolicitacoesAlteracoes',
                    'listValidacoesCadastrais'
                ]
            }
        },
    },
];