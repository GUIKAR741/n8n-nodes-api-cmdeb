import type {INodeProperties} from 'n8n-workflow';

export const componentesCurricularesConfig: INodeProperties[] = [

    // ─── listComponentesCurriculares ──────────────────────────────────────────
    {
        displayName: 'ID SGP do Componente Curricular',
        name: 'id_sgp_componente_curricular',
        type: 'number',
        default: null,
        required: false,
        description: 'ID SGP do componente curricular base — filtra todas as instâncias por instituição',
        displayOptions: {show: {endpoints: ['listComponentesCurriculares']}},
    },
    {
        displayName: 'Área de Conhecimento',
        name: 'co_area_conhecimento',
        type: 'options',
        default: '',
        required: false,
        description: 'Área de conhecimento do componente curricular',
        options: [
            {name: 'Todas', value: ''},
            {name: 'Linguagens - (1)', value: 1},
            {name: 'Matemática - (2)', value: 2},
            {name: 'Ciências da Natureza - (3)', value: 3},
            {name: 'Ciências Humanas e Sociais - (4)', value: 4},
            {name: 'Outras Áreas - (99)', value: 99},
        ],
        displayOptions: {show: {endpoints: ['listComponentesCurriculares']}},
    },
    {
        displayName: 'Ativo',
        name: 'st_ativo',
        type: 'options',
        default: '',
        required: false,
        description: 'Filtra componentes ativos ou inativos',
        options: [
            {name: 'Todos', value: ''},
            {name: 'Ativo', value: 'true'},
            {name: 'Inativo', value: 'false'},
        ],
        displayOptions: {show: {endpoints: ['listComponentesCurriculares']}},
    },
    {
        displayName: 'Nome do Componente',
        name: 'no_componente_curricular',
        type: 'string',
        default: '',
        required: false,
        description: 'Busca parcial case-insensitive pelo nome do componente',
        displayOptions: {show: {endpoints: ['listComponentesCurriculares']}},
    },
    {
        displayName: 'Página',
        name: 'page',
        type: 'number',
        default: 1,
        required: false,
        description: 'Número da página',
        typeOptions: {minValue: 1},
        displayOptions: {show: {endpoints: ['listComponentesCurriculares']}},
    },
    {
        displayName: 'Itens por Página',
        name: 'page_size',
        type: 'number',
        default: 100,
        required: false,
        description: 'Itens por página (padrão: 100, máximo: 5000)',
        typeOptions: {minValue: 1, maxValue: 5000},
        displayOptions: {show: {endpoints: ['listComponentesCurriculares']}},
    },

    // ─── listComponentesCurricularesTurma ─────────────────────────────────────
    {
        displayName: 'ID SGP da Turma',
        name: 'id_sgp_turma_componentes',
        type: 'number',
        default: null,
        required: true,
        description: 'ID SGP da turma para listar os componentes curriculares vinculados',
        displayOptions: {show: {endpoints: ['listComponentesCurricularesTurma']}},
    },
    {
        displayName: 'Página',
        name: 'page',
        type: 'number',
        default: 1,
        required: false,
        description: 'Número da página',
        typeOptions: {minValue: 1},
        displayOptions: {show: {endpoints: ['listComponentesCurricularesTurma']}},
    },
    {
        displayName: 'Itens por Página',
        name: 'page_size',
        type: 'number',
        default: 100,
        required: false,
        description: 'Itens por página (padrão: 100, máximo: 5000)',
        typeOptions: {minValue: 1, maxValue: 5000},
        displayOptions: {show: {endpoints: ['listComponentesCurricularesTurma']}},
    },

    // ─── createComponentesCurricularesLote ───────────────────────────────────
    {
        displayName: 'Disciplinas (JSON)',
        name: 'disciplinas_cadastro_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de componentes curriculares a cadastrar. Campos obrigatórios: co_componente_curricular_area_conhecimento, co_componente_curricular, componente_curricular_carga_horaria, sistema_avaliacao_desempenho',
        displayOptions: {show: {endpoints: ['createComponentesCurricularesLote']}},
    },

    // ─── editComponentesCurricularesLote ─────────────────────────────────────
    {
        displayName: 'Disciplinas (JSON)',
        name: 'disciplinas_edicao_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de componentes curriculares a editar. Cada item deve conter editar_componente_curricular=1 e id_sgp_componente_curricular além dos demais campos obrigatórios',
        displayOptions: {show: {endpoints: ['editComponentesCurricularesLote']}},
    },
];