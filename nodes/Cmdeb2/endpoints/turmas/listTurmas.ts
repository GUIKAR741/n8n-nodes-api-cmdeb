import { IExecuteFunctions } from 'n8n-workflow';

export async function listTurmas(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const id_sgp_instituicao = context.getNodeParameter('id_sgp_instituicao', index, null) as number | null;
        const id_sgp_componente_curricular = context.getNodeParameter('id_sgp_componente_curricular', index, null) as number | null;
        const co_entidade = context.getNodeParameter('co_entidade', index, '') as string;
        const no_turma = context.getNodeParameter('no_turma', index, '') as string;
        const co_etapa_ensino = context.getNodeParameter('co_etapa_ensino', index, null) as number | null;
        const co_turno_turma = context.getNodeParameter('co_turno_turma', index, null) as number | null;
        const nu_ano = context.getNodeParameter('nu_ano', index, null) as number | null;
        const st_turma_ativa = context.getNodeParameter('st_turma_ativa', index, null) as boolean | null;

        const page = context.getNodeParameter('page', index, 1) as number;
        const page_size = context.getNodeParameter('page_size', index, 100) as number;

        const qs: any = {
            ...(id_sgp_instituicao && { id_sgp_instituicao }),
            ...(id_sgp_componente_curricular && { id_sgp_componente_curricular }),
            ...(co_entidade && { co_entidade }),
            ...(no_turma && { no_turma }),
            ...(co_etapa_ensino && { co_etapa_ensino }),
            ...(co_turno_turma && { co_turno_turma }),
            ...(nu_ano && { nu_ano }),
            ...(st_turma_ativa !== null && { st_turma_ativa }),
            ...(page && { page }),
            ...(page_size && { page_size }),
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/turmas',
                qs,
                method: 'GET',
            }
        );

    } catch (error: any) {
        let mensagemErro = error.message || error.mensagem || error.detail || "Ocorreu um erro desconhecido";
        try {
            if (error.response && error.response.data) {
                mensagemErro = JSON.stringify(error.response.data);
            }
        } catch {}

        throw new Error(JSON.stringify({
            nome: error.nome || error.code || 'erro_desconhecido',
            mensagem: mensagemErro
        }));
    }
}