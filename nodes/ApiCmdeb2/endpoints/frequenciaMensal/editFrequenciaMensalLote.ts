import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function editFrequenciaMensalLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const ano_referencia = context.getNodeParameter('ano_referencia', index) as number;
        const mes_referencia = context.getNodeParameter('mes_referencia', index) as number;
        const frequenciasJson = context.getNodeParameter('frequencias_edicao_json', index);

        let frequencias: any[];

        try {
            frequencias = typeof frequenciasJson === 'string' ? JSON.parse(frequenciasJson) : frequenciasJson;
        } catch (e) {
            throw new Error('O campo de frequências para edição deve conter um JSON válido.');
        }

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
        throw new NodeOperationError(
            context.getNode(),
            `Erro ao consultar API HTTP ${error.httpCode}: ${error.description}`,
            {
                description: JSON.stringify(error, null, 4),
            },
        );
    }
}