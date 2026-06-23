import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function editComponentesCurricularesLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        // Ajuste 'componentes_edicao_json' se o nome no seu componentesCurricularesConfig.ts for diferente
        const disciplinasJson = context.getNodeParameter('componentes_edicao_json', index);

        let disciplinas: any[];

        try {
            disciplinas = typeof disciplinasJson === 'string' ? JSON.parse(disciplinasJson) : disciplinasJson;
        } catch (e) {
            throw new Error('O campo de componentes curriculares para edição deve conter um array JSON válido.');
        }

        const body = {
            disciplinas,
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/componentes-curriculares/lote',
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