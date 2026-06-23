import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function editAvaliacaoDesempenhoLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const avaliacoesJson = context.getNodeParameter('avaliacoes_edicao_json', index);

        let avaliacoes: any[];

        try {
            avaliacoes = typeof avaliacoesJson === 'string' ? JSON.parse(avaliacoesJson) : avaliacoesJson;
        } catch (e) {
            throw new Error('O campo de avaliações para edição deve conter um array JSON válido.');
        }

        const body = {
            avaliacoes,
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/avaliacao-desempenho/lote',
                body,
                method: 'PUT',
            }
        );

    } catch (error: any) {
        throw new NodeOperationError(
            context.getNode(),
            `Erro ao consultar API HTTP ${error.httpCode}: ${error.description}`,
            {
                description: JSON.stringify(error, null, 4),
            },
        );
    }
}