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
    {
        displayName: 'Offset Objetos Processados',
        name: 'offset_objetos',
        type: 'number',
        default: null,
        required: false,
        description: 'Offset para paginação dos objetos processados',
        typeOptions: {minValue: 0},
        displayOptions: {show: {endpoints: ['getLoteStatus']}},
    },

    // ─── listLotes ────────────────────────────────────────────────────────────
    {
        displayName: 'Tipos de Lote',
        name: 'tipos',
        type: 'multiOptions',
        default: [],
        required: false,
        description: 'Filtra por tipos de arquivo (combinados por OR). Deixe vazio para listar todos',
        options: [
            {name: 'Frequência Mensal por Matrícula - Cadastro - (3)', value: 3},
            {name: 'Matrículas - Movimentação - (5)', value: 5},
            {name: 'Frequência Mensal por Matrícula - Edição - (7)', value: 7},
            {name: 'Matrículas - Confirmar/Editar Conclusões - (8)', value: 8},
            {name: 'Matrículas - Edição - (9)', value: 9},
            {name: 'Profissionais de Educação - Cadastro - (10)', value: 10},
            {name: 'Profissionais de Educação - Edição - (11)', value: 11},
            {name: 'Profissionais de Educação - Adição de Formação - (12)', value: 12},
            {name: 'Profissionais de Educação - Adição de Função - (13)', value: 13},
            {name: 'Profissionais de Educação - Edição de Formação - (14)', value: 14},
            {name: 'Profissionais de Educação - Edição de Função - (15)', value: 15},
            {name: 'Instituições de Ensino - Cadastro - (16)', value: 16},
            {name: 'Instituições de Ensino - Edição - (17)', value: 17},
            {name: 'Turmas - Cadastro - (18)', value: 18},
            {name: 'Turmas - Edição - (19)', value: 19},
            {name: 'Estudantes sem Turma - Cadastro - (20)', value: 20},
            {name: 'Estudantes com Turma - Cadastro - (21)', value: 21},
            {name: 'Matrícula sem Turma - Cadastro - (22)', value: 22},
            {name: 'Matrícula com Turma - Cadastro - (23)', value: 23},
            {name: 'Dados Pessoais de Estudante - Edição - (24)', value: 24},
            {name: 'Componentes Curriculares - Cadastro - (25)', value: 25},
            {name: 'Componentes Curriculares - Edição - (26)', value: 26},
            {name: 'Enturmação de Matrículas - Cadastro - (29)', value: 29},
            {name: 'Enturmação de Matrículas - Edição - (30)', value: 30},
            {name: 'Avaliação de Desempenho - Cadastro - (31)', value: 31},
            {name: 'Avaliação de Desempenho - Edição - (32)', value: 32},
            {name: 'Matrículas Inativas com Frequência - Cadastro - (37)', value: 37},
            {name: 'Profissionais de Educação - Vincular Enturmação - (38)', value: 38},
            {name: 'Profissionais de Educação - Edição de Enturmação - (39)', value: 39},
        ],
        displayOptions: {show: {endpoints: ['listLotes']}},
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