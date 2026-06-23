import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function movimentarMatriculasLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const matriculasJson = context.getNodeParameter('matriculas_movimentacao_json', index);

        let matriculas: any[];

        try {
            matriculas = typeof matriculasJson === 'string' ? JSON.parse(matriculasJson) : matriculasJson;
        } catch (e) {
            throw new Error('O campo de matrículas para movimentação deve conter um array JSON válido.');
        }

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
        throw new NodeOperationError(
            context.getNode(),
            `Erro ao consultar API HTTP ${error.httpCode}: ${error.description}`,
            {
                description: JSON.stringify(error, null, 4),
            },
        );
    }
}