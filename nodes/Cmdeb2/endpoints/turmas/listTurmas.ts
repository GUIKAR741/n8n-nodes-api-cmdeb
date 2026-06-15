import {IExecuteFunctions} from 'n8n-workflow';

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

        const params = new URLSearchParams();

        if (id_sgp_instituicao) {
            params.append('id_sgp_instituicao', String(id_sgp_instituicao));
        }
        if (id_sgp_componente_curricular) {
            params.append('id_sgp_componente_curricular', String(id_sgp_componente_curricular));
        }
        if (co_entidade) {
            params.append('co_entidade', String(co_entidade));
        }
        if (no_turma) {
            params.append('no_turma', String(no_turma));
        }
        if (co_etapa_ensino) {
            params.append('co_etapa_ensino', String(co_etapa_ensino));
        }
        if (co_turno_turma) {
            params.append('co_turno_turma', String(co_turno_turma));
        }
        if (nu_ano) {
            params.append('nu_ano', String(nu_ano));
        }
        if (st_turma_ativa) {
            params.append('st_turma_ativa', String(st_turma_ativa));
        }
        if (page) {
            params.append('page', String(page));
        }
        if (page_size) {
            params.append('page_size', String(page_size));
        }

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: `/api/v2/turmas${params.toString() ? '?' + params.toString() : ''}`,
                method: 'GET',
            }
        );

    } catch (error: any) {
        let mensagemErro = error.message || error.mensagem || error.detail || "Ocorreu um erro desconhecido";
        try {
            if (error.response && error.response.data) {
                mensagemErro = JSON.stringify(error.response.data);
            }
        } catch {
        }

        throw new Error(JSON.stringify({
            nome: error.nome || error.code || 'erro_desconhecido',
            mensagem: mensagemErro
        }));
    }
}