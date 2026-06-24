import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function listAvaliacaoDesempenho(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        // Extração segura de parâmetros de busca (query strings) com fallbacks
        const id_sgp_matricula = context.getNodeParameter('id_sgp_matricula', index, null) as number | null;
        const id_sgp_componente_curricular = context.getNodeParameter('id_sgp_componente_curricular', index, null) as number | null;
        const id_sgp_turma = context.getNodeParameter('id_sgp_turma', index, null) as number | null;
        const co_area_conhecimento = context.getNodeParameter('co_area_conhecimento', index, '') as number | string;
        const nu_ano_matricula = context.getNodeParameter('nu_ano_matricula', index, null) as number | null;
        const co_etapa_ensino = context.getNodeParameter('co_etapa_ensino', index, '') as number | string;

        const page = context.getNodeParameter('page', index, 1) as number;
        const page_size = context.getNodeParameter('page_size', index, 100) as number;

        const params = new URLSearchParams();

        if (id_sgp_matricula) {
            params.append('id_sgp_matricula', String(id_sgp_matricula));
        }
        if (id_sgp_componente_curricular) {
            params.append('id_sgp_componente_curricular', String(id_sgp_componente_curricular));
        }
        if (id_sgp_turma) {
            params.append('id_sgp_turma', String(id_sgp_turma));
        }
        if (co_area_conhecimento && co_area_conhecimento !== '') {
            params.append('co_area_conhecimento', String(co_area_conhecimento));
        }
        if (nu_ano_matricula) {
            params.append('nu_ano_matricula', String(nu_ano_matricula));
        }
        if (co_etapa_ensino && co_etapa_ensino !== '') {
            params.append('co_etapa_ensino', String(co_etapa_ensino));
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
                url: `/api/v2/avaliacao-desempenho${params.toString() ? '?' + params.toString() : ''}`,
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
        throw new NodeOperationError(
            context.getNode(),
            error.httpCode ? `Erro ao consultar API HTTP ${error.httpCode}: ${error.description}` : 'Erro no Node',
            {
                description: error.httpCode ? JSON.stringify(error, null, 4) : mensagemErro,
                itemIndex: index,
            },
        );
    }
}