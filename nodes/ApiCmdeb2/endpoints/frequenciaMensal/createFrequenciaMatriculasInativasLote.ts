import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function createFrequenciaMatriculasInativasLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const frequenciasJson = context.getNodeParameter('frequencias_matriculas_inativas_json', index);

        let frequencias: any[];

        try {
            frequencias = typeof frequenciasJson === 'string' ? JSON.parse(frequenciasJson) : frequenciasJson;
        } catch (e) {
            throw new Error('O campo de frequências para cadastro deve conter um JSON válido.');
        }

        const body = {
            frequencias,
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: `/api/v2/frequencia-mensal-matricula/matriculas-inativas-com-frequencias/lote`,
                body,
                method: 'POST',
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