import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function getLoteErros(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    // Parâmetro de rota obrigatório
    const lote_id = context.getNodeParameter('lote_id', index) as string;

    if (!lote_id) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "ID do Lote" é obrigatório.',
            {itemIndex: index},
        );
    }
    try {
        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: `/api/v2/lotes/${lote_id}/erros`,
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