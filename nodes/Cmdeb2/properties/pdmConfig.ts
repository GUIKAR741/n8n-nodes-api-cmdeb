import type {INodeProperties} from 'n8n-workflow';

export const pdmConfig: INodeProperties[] = [

    // ─── Parâmetros de Filtro (Mutuamente Exclusivos) ─────────────────────────
    {
        displayName: 'CPF ou NIS do Estudante',
        name: 'cpf_nis',
        type: 'string',
        default: '',
        required: false,
        description: 'CPF ou NIS do estudante (11 dígitos; preenchimento automático com zeros à esquerda). Tem prioridade sobre o código da entidade.',
        displayOptions: {
            show: {
                endpoints: [
                    'listPdmElegibilidades',
                    'listPdmIncentivos'
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
        description: 'Código INEP da instituição de ensino. Filtra todos os estudantes de uma instituição.',
        displayOptions: {
            show: {
                endpoints: [
                    'listPdmElegibilidades',
                    'listPdmIncentivos'
                ]
            }
        },
    },
    {
        displayName: 'Ciclo (Ano)',
        name: 'ciclo',
        type: 'number',
        default: new Date().getFullYear(),
        required: false,
        description: 'Ano do ciclo do programa (ex: 2024)',
        typeOptions: {minValue: 2024, maxValue: new Date().getFullYear()},
        displayOptions: {
            show: {
                endpoints: [
                    'listPdmElegibilidades',
                    'listPdmIncentivos'
                ]
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
                    'listPdmElegibilidades',
                    'listPdmIncentivos'
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
                    'listPdmElegibilidades',
                    'listPdmIncentivos'
                ]
            }
        },
    },
];