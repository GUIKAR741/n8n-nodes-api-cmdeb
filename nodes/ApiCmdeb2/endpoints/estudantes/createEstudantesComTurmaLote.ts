import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function createEstudantesComTurmaLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        // Altere 'estudantes_com_turma_json' para o name exato da propriedade configurada no seu estudantesConfig.ts
        const estudantesJson = context.getNodeParameter('estudantes_com_turma_json', index);

        let estudantes: any[];

        try {
            estudantes = typeof estudantesJson === 'string' ? JSON.parse(estudantesJson) : estudantesJson;
        } catch (e) {
            throw new Error('O campo de estudantes com turma deve conter um JSON válido.');
        }

        const body = {
            estudantes,
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/estudantes/com-turma/cadastro/lote',
                body,
                method: 'POST',
            });

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