import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function listProfissionaisEnturmacao(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const id_sgp_turma = context.getNodeParameter('id_sgp_turma', index, null) as number | null;
        const id_sgp_componente_curricular = context.getNodeParameter('id_sgp_componente_curricular', index, null) as number | null;
        const id_sgp_funcao = context.getNodeParameter('id_sgp_funcao', index, '') as string;
        const co_entidade = context.getNodeParameter('co_entidade', index, '') as string;

        const page = context.getNodeParameter('page', index, 1) as number;
        const page_size = context.getNodeParameter('page_size', index, 100) as number;

        const params = new URLSearchParams();

        if (id_sgp_turma) {
            params.append('id_sgp_turma', String(id_sgp_turma));
        }
        if (id_sgp_componente_curricular) {
            params.append('id_sgp_componente_curricular', String(id_sgp_componente_curricular));
        }
        if (id_sgp_funcao) {
            params.append('id_sgp_funcao', String(id_sgp_funcao));
        }
        if (co_entidade) {
            params.append('co_entidade', String(co_entidade));
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
                url: `/api/v2/profissionais/enturmacao${params.toString() ? '?' + params.toString() : ''}`,
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