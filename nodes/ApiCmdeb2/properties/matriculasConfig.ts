import type {INodeProperties} from 'n8n-workflow';

export const matriculasConfig: INodeProperties[] = [

    // ─── confirmarConclusaoMatriculasLote ─────────────────────────────────────
    {
        displayName: 'Matrículas para Conclusão (JSON)',
        name: 'matriculas_confirmar_conclusao_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de objetos com os dados para confirmar/editar conclusão. Campos obrigatórios: id_sgp_matricula, editar_confirmar_conclusao (1=Cancelar, 2=Confirmar, 3=Editar data).',
        displayOptions: {
            show: {
                endpoints: ['confirmarConclusaoMatriculasLote']
            }
        },
    },

    // ─── editMatriculasLote ───────────────────────────────────────────────────
    {
        displayName: 'Matrículas para Edição (JSON)',
        name: 'matriculas_edicao_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de objetos com os dados para edição. Campos obrigatórios mínimos: id_sgp_matricula, editar_matricula.',
        displayOptions: {
            show: {
                endpoints: ['editMatriculasLote']
            }
        },
    },

    // ─── enturmarEstudantesLote ───────────────────────────────────────────────
    {
        displayName: 'Matrículas para Enturmação (JSON)',
        name: 'matriculas_enturmacao_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de objetos com os dados para enturmação de estudantes em turmas. Campos obrigatórios principais: id_sgp_matricula, id_sgp_turma, entre os demais requeridos de identificação.',
        displayOptions: {
            show: {
                endpoints: ['enturmarEstudantesLote']
            }
        },
    },

    // ─── movimentarMatriculasLote ─────────────────────────────────────────────
    {
        displayName: 'Matrículas para Movimentação (JSON)',
        name: 'matriculas_movimentacao_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de objetos com os dados para movimentação/encerramento de matrícula. Campos obrigatórios: id_sgp_matricula, estudante_matricula_situacao, data_fim.',
        displayOptions: {
            show: {
                endpoints: ['movimentarMatriculasLote']
            }
        },
    },

    // ─── editEnturmacaoMatriculasLote ─────────────────────────────────────────
    {
        displayName: 'Matrículas (JSON)',
        name: 'matriculas_edicao_enturmacao_json',
        type: 'json',
        default: '[]',
        required: true,
        description: 'Array de enturmações a editar. Consulte a documentação para os campos obrigatórios',
        displayOptions: {show: {endpoints: ['editEnturmacaoMatriculasLote']}},
    },
];