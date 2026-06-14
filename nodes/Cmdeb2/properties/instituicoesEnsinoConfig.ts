import type {INodeProperties} from 'n8n-workflow';

export const instituicoesEnsinoConfig: INodeProperties[] = [

    // ─── listInstituicoesEnsino (Parâmetros de Busca) ─────────────────────────
    {
        displayName: 'ID SGP da Instituição',
        name: 'id_sgp_entidade',
        type: 'number',
        default: null,
        required: false,
        description: 'ID SGP interno da instituição de ensino',
        displayOptions: {
            show: {
                endpoints: ['listInstituicoesEnsino']
            }
        },
    },
    {
        displayName: 'Código INEP da Instituição',
        name: 'co_entidade',
        type: 'string',
        default: '',
        required: false,
        description: 'Código INEP da instituição de ensino (8 dígitos)',
        displayOptions: {
            show: {
                endpoints: ['listInstituicoesEnsino']
            }
        },
    },
    {
        displayName: 'Nome da Instituição',
        name: 'no_entidade',
        type: 'string',
        default: '',
        required: false,
        description: 'Busca parcial case-insensitive pelo nome da instituição de ensino',
        displayOptions: {
            show: {
                endpoints: ['listInstituicoesEnsino']
            }
        },
    },
    {
        displayName: 'UF',
        name: 'co_uf',
        type: 'string',
        default: '',
        required: false,
        description: 'Código ou sigla da Unidade Federativa da instituição',
        displayOptions: {
            show: {
                endpoints: ['listInstituicoesEnsino']
            }
        },
    },

    // ─── Paginação (listInstituicoesEnsino) ───────────────────────────────────
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
                endpoints: ['listInstituicoesEnsino']
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
                endpoints: ['listInstituicoesEnsino']
            }
        },
    },

    // ─── Operações em Lote (Body Params) ──────────────────────────────────────
    {
        displayName: 'Instituições para Cadastro (JSON)',
        name: 'instituicoes_cadastro_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de objetos contendo os dados das instituições de ensino para cadastro.',
        displayOptions: {
            show: {
                endpoints: ['createInstituicoesEnsinoLote']
            }
        },
    },
    {
        displayName: 'Instituições para Edição (JSON)',
        name: 'instituicoes_edicao_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de objetos contendo os dados das instituições de ensino para edição. Cada item deve conter editar_instituicao_ensino: 1.',
        displayOptions: {
            show: {
                endpoints: ['editInstituicoesEnsinoLote']
            }
        },
    },
];