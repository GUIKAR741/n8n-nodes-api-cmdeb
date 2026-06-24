import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function movimentarMatriculasLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    const matriculasJson = context.getNodeParameter('matriculas_movimentacao_json', index);

    let matriculas: any[];

    try {
        matriculas = typeof matriculasJson === 'string' ? JSON.parse(matriculasJson) : matriculasJson;
    } catch (e) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Matrículas para Movimentação (JSON)" para cadastro deve conter um array JSON válido.',
            {itemIndex: index},
        );
    }

    if (matriculas.length === 0) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Matrículas para Movimentação (JSON)" deve ter pelo menos um registro.',
            {itemIndex: index},
        );
    }
    try {
        const body = {
            matriculas,
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/matriculas/movimentacao/lote',
                body,
                method: 'PUT',
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