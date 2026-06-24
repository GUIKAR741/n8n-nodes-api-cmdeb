import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function createAvaliacaoDesempenhoLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    const avaliacoesJson = context.getNodeParameter('avaliacoes_cadastro_json', index);

    let avaliacoes: any[];

    try {
        avaliacoes = typeof avaliacoesJson === 'string' ? JSON.parse(avaliacoesJson) : avaliacoesJson;
    } catch (e) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Avaliações (JSON)" para cadastro deve conter um array JSON válido.',
            {itemIndex: index},
        );
    }

    if (avaliacoes.length === 0) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Avaliações (JSON)" deve ter pelo menos um registro.',
            {itemIndex: index},
        );
    }

    try {
        const body = {
            avaliacoes,
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/avaliacao-desempenho/lote',
                body,
                method: 'POST',
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