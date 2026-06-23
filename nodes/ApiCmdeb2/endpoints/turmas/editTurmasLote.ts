import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function editTurmasLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const turmasJson = context.getNodeParameter('turmas_edicao_json', index);

        let turmas: any[];

        try {
            turmas = typeof turmasJson === 'string' ? JSON.parse(turmasJson) : turmasJson;
        } catch (e) {
            throw new Error('O campo de turmas para edição deve conter um array JSON válido.');
        }

        const body = {
            turmas,
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/turmas/lote',
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