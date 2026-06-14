import type {INodeProperties} from 'n8n-workflow';

export const lotesConfig: INodeProperties[] = [

    // ─── Parâmetro de Rota (Comum para Consulta de Status e Erros) ────────────
    {
        displayName: 'ID do Lote',
        name: 'lote_id',
        type: 'string',
        default: '',
        required: true,
        description: 'Identificador (UUID) do lote que deseja consultar',
        displayOptions: {
            show: {
                endpoints: [
                    'getLoteStatus',
                    'getLoteErros'
                ]
            }
        },
    },

    // ─── getLoteStatus ────────────────────────────────────────────────────────
    {
        displayName: 'Retornar Objetos Processados',
        name: 'objetos_processados',
        type: 'boolean',
        default: false,
        required: false,
        description: 'Whether Se true, retorna a lista de objetos que foram processados com sucesso',
        displayOptions: {
            show: {
                endpoints: ['getLoteStatus']
            }
        },
    },
    {
        displayName: 'Limite de Objetos',
        name: 'limit_objetos',
        type: 'number',
        default: 100,
        required: false,
        description: 'Limite de objetos processados a retornar (máximo: 5000)',
        typeOptions: {minValue: 1, maxValue: 5000},
        displayOptions: {
            show: {
                endpoints: ['getLoteStatus']
            }
        },
    },

    // ─── listLotes ────────────────────────────────────────────────────────────
    {
        displayName: 'Tipos',
        name: 'tipos',
        type: 'string',
        default: '',
        required: false,
        description: 'Tipos de arquivo para filtrar (ex: 1,2 para instituições). Omitir para listar todos.',
        displayOptions: {
            show: {
                endpoints: ['listLotes']
            }
        },
    },

    // ─── Paginação (listLotes) ────────────────────────────────────────────────
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
                endpoints: ['listLotes']
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
                endpoints: ['listLotes']
            }
        },
    },
];