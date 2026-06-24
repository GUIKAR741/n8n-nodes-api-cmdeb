import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function listComponentesCurricularesTurma(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    const id_sgp_turma = context.getNodeParameter('id_sgp_turma', index) as number;

    const page = context.getNodeParameter('page', index, 1) as number;
    const page_size = context.getNodeParameter('page_size', index, 100) as number;

    if (!id_sgp_turma) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "id_sgp_turma" é obrigatório.',
            {itemIndex: index},
        );
    }
    try {
        const params = new URLSearchParams();

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
                url: `/api/v2/turmas/${id_sgp_turma}/componentes-curriculares${params.toString() ? '?' + params.toString() : ''}`,
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