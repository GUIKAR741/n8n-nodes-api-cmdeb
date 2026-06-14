import {INodeProperties} from 'n8n-workflow';
import {estudantesConfig} from "./properties/estudantesConfig";
import {avaliacaoDesempenhoConfig} from "./properties/avaliacaoDesempenhoConfig";
import {componentesCurricularesConfig} from "./properties/componentesCurricularesConfig";
import {frequenciaMensalConfig} from "./properties/frequenciaMensalConfig";
import {lotesConfig} from "./properties/lotesConfig";
import {matriculasConfig} from "./properties/matriculasConfig";
import {pdmConfig} from "./properties/pdmConfig";
import {pessoasConfig} from "./properties/pessoasConfig";
import {profissionaisConfig} from "./properties/profissionaisConfig";
import {termosAutorizacaoConfig} from "./properties/termosAutorizacaoConfig";
import {turmasConfig} from "./properties/turmasConfig";
import {instituicoesEnsinoConfig} from "./properties/instituicoesEnsinoConfig";

export const propertiesConfig: INodeProperties[] = [
    {
        displayName: 'Recursos',
        description: 'Selecione o tipo de recurso da API',
        name: 'transactionType',
        type: 'options',
        noDataExpression: true,
        options: [
            {
                name: 'Avaliações de Desempenho',
                value: 'avaliacaoDesempenho',
            },
            {
                name: 'Componentes Curriculares',
                value: 'componentesCurriculares',
            },
            {
                name: 'Estudantes',
                value: 'estudantes',
            },
            {
                name: 'Frequência Mensal',
                value: 'frequenciaMensal',
            },
            {
                name: 'Instituições de Ensino',
                value: 'instituicoesEnsino',
            },
            {
                name: 'Lotes',
                value: 'lotes',
            },
            {
                name: 'Matrículas',
                value: 'matriculas',
            },
            {
                name: 'Pé-de-Meia',
                value: 'pdm',
            },
            {
                name: 'Pessoas',
                value: 'pessoas',
            },
            {
                name: 'Profissionais de Educação',
                value: 'profissionais',
            },
            {
                name: 'Termos de Autorização',
                value: 'termosAutorizacao',
            },
            {
                name: 'Turmas',
                value: 'turmas',
            },
        ],
        default: 'estudantes',
    },

    // ─── Estudantes ───────────────────────────────────────────────────────────
    {
        displayName: 'Operação',
        name: 'endpoints',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {transactionType: ['estudantes']}},
        options: [
            {name: 'Cadastro com Turma (Lote)', value: 'createEstudantesComTurmaLote'},
            {name: 'Cadastro sem Turma (Lote)', value: 'createEstudantesSemTurmaLote'},
            {name: 'Edição (Lote)', value: 'editEstudantesLote'},
            {name: 'Listagem', value: 'listEstudantes'},
        ],
        default: 'listEstudantes',
    },

    // ─── Matrículas ───────────────────────────────────────────────────────────
    {
        displayName: 'Operação',
        name: 'endpoints',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {transactionType: ['matriculas']}},
        options: [
            {name: 'Confirmar/Editar Conclusão (Lote)', value: 'confirmarConclusaoMatriculasLote'},
            {name: 'Edição (Lote)', value: 'editMatriculasLote'},
            {name: 'Enturmação (Lote)', value: 'enturmarEstudantesLote'},
            {name: 'Movimentação (Lote)', value: 'movimentarMatriculasLote'},
        ],
        default: 'enturmarEstudantesLote',
    },

    // ─── Frequência Mensal ────────────────────────────────────────────────────
    {
        displayName: 'Operação',
        name: 'endpoints',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {transactionType: ['frequenciaMensal']}},
        options: [
            {name: 'Cadastro (Lote)', value: 'createFrequenciaMensalLote'},
            {name: 'Edição (Lote)', value: 'editFrequenciaMensalLote'},
            {name: 'Listagem (com período)', value: 'listFrequenciaMensalPeriodo'},
            {name: 'Listagem (sem período)', value: 'listFrequenciaMensal'},
            {name: 'Listagem Faltantes', value: 'listFrequenciaMensalFaltantes'},
        ],
        default: 'listFrequenciaMensal',
    },

    // ─── Profissionais ────────────────────────────────────────────────────────
    {
        displayName: 'Operação',
        name: 'endpoints',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {transactionType: ['profissionais']}},
        options: [
            {name: 'Adição de Formações (Lote)', value: 'addFormacoesProfissionaisLote'},
            {name: 'Adição de Funções (Lote)', value: 'addFuncoesProfissionaisLote'},
            {name: 'Cadastro (Lote)', value: 'createProfissionaisLote'},
            {name: 'Edição (Lote)', value: 'editProfissionaisLote'},
            {name: 'Edição de Formações (Lote)', value: 'editFormacoesProfissionaisLote'},
            {name: 'Edição de Funções (Lote)', value: 'editFuncoesProfissionaisLote'},
            {name: 'Listagem', value: 'listProfissionais'},
        ],
        default: 'listProfissionais',
    },

    // ─── Instituições de Ensino ───────────────────────────────────────────────
    {
        displayName: 'Operação',
        name: 'endpoints',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {transactionType: ['instituicoesEnsino']}},
        options: [
            {name: 'Cadastro (Lote)', value: 'createInstituicoesEnsinoLote'},
            {name: 'Edição (Lote)', value: 'editInstituicoesEnsinoLote'},
            {name: 'Listagem', value: 'listInstituicoesEnsino'},
        ],
        default: 'listInstituicoesEnsino',
    },

    // ─── Turmas ───────────────────────────────────────────────────────────────
    {
        displayName: 'Operação',
        name: 'endpoints',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {transactionType: ['turmas']}},
        options: [
            {name: 'Cadastro (Lote)', value: 'createTurmasLote'},
            {name: 'Componentes Curriculares de uma Turma', value: 'listComponentesCurricularesTurma'},
            {name: 'Edição (Lote)', value: 'editTurmasLote'},
            {name: 'Listagem', value: 'listTurmas'},
        ],
        default: 'listTurmas',
    },

    // ─── Componentes Curriculares ─────────────────────────────────────────────
    {
        displayName: 'Operação',
        name: 'endpoints',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {transactionType: ['componentesCurriculares']}},
        options: [
            {name: 'Cadastro (Lote)', value: 'createComponentesCurricularesLote'},
            {name: 'Edição (Lote)', value: 'editComponentesCurricularesLote'},
            {name: 'Listagem', value: 'listComponentesCurriculares'},
        ],
        default: 'listComponentesCurriculares',
    },

    // ─── Avaliações de Desempenho ─────────────────────────────────────────────
    {
        displayName: 'Operação',
        name: 'endpoints',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {transactionType: ['avaliacaoDesempenho']}},
        options: [
            {name: 'Cadastro (Lote)', value: 'createAvaliacaoDesempenhoLote'},
            {name: 'Edição (Lote)', value: 'editAvaliacaoDesempenhoLote'},
            {name: 'Listagem', value: 'listAvaliacaoDesempenho'},
        ],
        default: 'listAvaliacaoDesempenho',
    },

    // ─── Lotes ────────────────────────────────────────────────────────────────
    {
        displayName: 'Operação',
        name: 'endpoints',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {transactionType: ['lotes']}},
        options: [
            {name: 'Consulta de Erros', value: 'getLoteErros'},
            {name: 'Consulta de Status', value: 'getLoteStatus'},
            {name: 'Listagem', value: 'listLotes'},
        ],
        default: 'listLotes',
    },

    // ─── Pé-de-Meia ──────────────────────────────────────────────────────────
    {
        displayName: 'Operação',
        name: 'endpoints',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {transactionType: ['pdm']}},
        options: [
            {name: 'Listagem de Elegibilidades', value: 'listPdmElegibilidades'},
            {name: 'Listagem de Incentivos', value: 'listPdmIncentivos'},
        ],
        default: 'listPdmElegibilidades',
    },

    // ─── Pessoas ──────────────────────────────────────────────────────────────
    {
        displayName: 'Operação',
        name: 'endpoints',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {transactionType: ['pessoas']}},
        options: [
            {name: 'Listagem de Solicitações de Alteração', value: 'listSolicitacoesAlteracoes'},
            {name: 'Listagem de Validações Cadastrais', value: 'listValidacoesCadastrais'},
        ],
        default: 'listSolicitacoesAlteracoes',
    },

    // ─── Termos de Autorização ────────────────────────────────────────────────
    {
        displayName: 'Operação',
        name: 'endpoints',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {transactionType: ['termosAutorizacao']}},
        options: [
            {name: 'Listagem', value: 'listTermosAutorizacao'},
        ],
        default: 'listTermosAutorizacao',
    },

    ...avaliacaoDesempenhoConfig,
    ...componentesCurricularesConfig,
    ...estudantesConfig,
    ...frequenciaMensalConfig,
    ...instituicoesEnsinoConfig,
    ...lotesConfig,
    ...matriculasConfig,
    ...pdmConfig,
    ...pessoasConfig,
    ...profissionaisConfig,
    ...termosAutorizacaoConfig,
    ...turmasConfig

];