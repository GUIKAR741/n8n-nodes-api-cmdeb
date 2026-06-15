import type {INodeProperties} from 'n8n-workflow';

export const avaliacaoDesempenhoConfig: INodeProperties[] = [

    // ─── listAvaliacaoDesempenho ──────────────────────────────────────────────
    {
        displayName: 'ID SGP da Matrícula',
        name: 'id_sgp_matricula',
        type: 'number',
        default: null,
        required: false,
        description: 'ID SGP da matrícula',
        displayOptions: {show: {endpoints: ['listAvaliacaoDesempenho']}},
    },
    {
        displayName: 'ID SGP do Componente Curricular',
        name: 'id_sgp_componente_curricular',
        type: 'number',
        default: null,
        required: false,
        description: 'ID SGP do componente curricular da instituição',
        displayOptions: {show: {endpoints: ['listAvaliacaoDesempenho']}},
    },
    {
        displayName: 'ID SGP da Turma',
        name: 'id_sgp_turma',
        type: 'number',
        default: null,
        required: false,
        description: 'ID SGP da turma — filtra avaliações dos alunos dessa turma',
        displayOptions: {show: {endpoints: ['listAvaliacaoDesempenho']}},
    },
    {
        displayName: 'Código da Área de Conhecimento',
        name: 'co_area_conhecimento',
        type: 'number',
        default: null,
        required: false,
        description: 'Código da área de conhecimento do componente',
        displayOptions: {show: {endpoints: ['listAvaliacaoDesempenho']}},
    },
    {
        displayName: 'Ano Letivo da Matrícula',
        name: 'nu_ano_matricula',
        type: 'number',
        default: new Date().getFullYear(),
        required: false,
        description: 'Ano letivo da matrícula, ex: 2024',
        typeOptions: {minValue: 2024, maxValue: new Date().getFullYear()},
        displayOptions: {show: {endpoints: ['listAvaliacaoDesempenho']}},
    },
    {
        displayName: 'Etapa de Ensino',
        name: 'co_etapa_ensino',
        type: 'number',
        default: null,
        required: false,
        description: 'Etapa de ensino da matrícula',
        displayOptions: {show: {endpoints: ['listAvaliacaoDesempenho']}},
    },
    {
        displayName: 'Página',
        name: 'page',
        type: 'number',
        default: 1,
        required: false,
        description: 'Número da página',
        typeOptions: {minValue: 1},
        displayOptions: {show: {endpoints: ['listAvaliacaoDesempenho']}},
    },
    {
        displayName: 'Itens por Página',
        name: 'page_size',
        type: 'number',
        default: 100,
        required: false,
        description: 'Itens por página (padrão: 100, máximo: 5000)',
        typeOptions: {minValue: 1, maxValue: 5000},
        displayOptions: {show: {endpoints: ['listAvaliacaoDesempenho']}},
    },

    // ─── createAvaliacaoDesempenhoLote ────────────────────────────────────────
    {
        displayName: 'Avaliações (JSON)',
        name: 'avaliacoes_cadastro_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de avaliações de desempenho a cadastrar. Campos obrigatórios: id_sgp_estudante, estudante_cpf, estudante_nome, id_sgp_matricula, estudante_apoio_pedagogico, co_entidade, no_entidade, estudante_etapa_de_ensino, nu_ano_matricula, id_sgp_componente_curricular, co_componente_curricular_area_conhecimento, co_componente_curricular, sistema_avaliacao_desempenho, desempenho_estudante_componente_curricular',
        displayOptions: {show: {endpoints: ['createAvaliacaoDesempenhoLote']}},
    },

    // ─── editAvaliacaoDesempenhoLote ──────────────────────────────────────────
    {
        displayName: 'Avaliações (JSON)',
        name: 'avaliacoes_edicao_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de avaliações de desempenho a editar. Cada item deve conter editar_avaliacao=1 além dos campos obrigatórios do cadastro',
        displayOptions: {show: {endpoints: ['editAvaliacaoDesempenhoLote']}},
    },
];