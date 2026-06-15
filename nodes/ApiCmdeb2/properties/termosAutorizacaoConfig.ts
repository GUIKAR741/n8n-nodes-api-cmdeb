import type {INodeProperties} from 'n8n-workflow';

export const termosAutorizacaoConfig: INodeProperties[] = [

    // ─── Parâmetros de Busca (Query) ──────────────────────────────────────────
    {
        displayName: 'Código do Município',
        name: 'co_municipio',
        type: 'number',
        default: null,
        required: false,
        description: 'Filtro opcional por código IBGE do município',
        displayOptions: {
            show: {
                endpoints: ['listTermosAutorizacao']
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
                endpoints: ['listTermosAutorizacao']
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
                endpoints: ['listTermosAutorizacao']
            }
        },
    },
];