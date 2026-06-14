import { IExecuteFunctions } from 'n8n-workflow';

export async function listAvaliacaoDesempenho(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        // Extração segura de parâmetros de busca (query strings) com fallbacks
        const id_sgp_matricula = context.getNodeParameter('id_sgp_matricula', index, null) as number | null;
        const id_sgp_componente_curricular = context.getNodeParameter('id_sgp_componente_curricular', index, null) as number | null;
        const id_sgp_turma = context.getNodeParameter('id_sgp_turma', index, null) as number | null;
        const co_area_conhecimento = context.getNodeParameter('co_area_conhecimento', index, null) as number | null;
        const nu_ano_matricula = context.getNodeParameter('nu_ano_matricula', index, null) as number | null;
        const co_etapa_ensino = context.getNodeParameter('co_etapa_ensino', index, null) as number | null;

        const page = context.getNodeParameter('page', index, 1) as number;
        const page_size = context.getNodeParameter('page_size', index, 100) as number;

        // Montagem condicional do objeto de query string (evita enviar parâmetros vazios ou nulos)
        const qs: any = {
            ...(id_sgp_matricula && { id_sgp_matricula }),
            ...(id_sgp_componente_curricular && { id_sgp_componente_curricular }),
            ...(id_sgp_turma && { id_sgp_turma }),
            ...(co_area_conhecimento && { co_area_conhecimento }),
            ...(nu_ano_matricula && { nu_ano_matricula }),
            ...(co_etapa_ensino && { co_etapa_ensino }),
            ...(page && { page }),
            ...(page_size && { page_size }),
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/avaliacao-desempenho',
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
        } catch {
            // Ignora falhas de conversão para manter o erro original
        }

        throw new Error(JSON.stringify({
            nome: error.nome || error.code || 'erro_desconhecido',
            mensagem: mensagemErro
        }));
    }
}