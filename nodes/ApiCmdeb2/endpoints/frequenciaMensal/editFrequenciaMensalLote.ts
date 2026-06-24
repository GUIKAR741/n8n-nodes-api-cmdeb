import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function editFrequenciaMensalLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    const ano_referencia = context.getNodeParameter('ano_referencia', index) as number;
    const mes_referencia = context.getNodeParameter('mes_referencia', index) as number;
    const frequenciasJson = context.getNodeParameter('frequencias_edicao_json', index);

    let frequencias: any[];

    try {
        frequencias = typeof frequenciasJson === 'string' ? JSON.parse(frequenciasJson) : frequenciasJson;
    } catch (e) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Frequências para Edição (JSON)" para cadastro deve conter um array JSON válido.',
            {itemIndex: index},
        );
    }

    if (frequencias.length === 0) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Frequências para Edição (JSON)" deve ter pelo menos um registro.',
            {itemIndex: index},
        );
    }
    try {
        const body = {
            frequencias,
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: `/api/v2/frequencia-mensal-matricula/${ano_referencia}/${mes_referencia}/lote`,
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