import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function getLoteStatus(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        // Parâmetro de rota obrigatório
        const lote_id = context.getNodeParameter('lote_id', index) as string;

        // Parâmetros de query (opcionais)
        const objetos_processados = context.getNodeParameter('objetos_processados', index, false) as boolean;
        const limit_objetos = context.getNodeParameter('limit_objetos', index, 100) as number;

        const params = new URLSearchParams();

        if (objetos_processados) {
            params.append('objetos_processados', String(objetos_processados));
        }
        if (limit_objetos) {
            params.append('limit_objetos', String(limit_objetos));
        }


        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: `/api/v2/lotes/${lote_id}${params.toString() ? '?' + params.toString() : ''}`,
                method: 'GET',
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