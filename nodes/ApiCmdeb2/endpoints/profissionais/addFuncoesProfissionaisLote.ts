import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function addFuncoesProfissionaisLote(context: IExecuteFunctions, index: number): Promise<any> {
    try {
        const profissionaisJson = context.getNodeParameter('profissionais_funcoes_adicao_json', index);
        let profissionais: any[];

        try {
            profissionais = typeof profissionaisJson === 'string' ? JSON.parse(profissionaisJson) : profissionaisJson;
        } catch (e) {
            throw new Error('O campo de profissionais para edição deve conter um array JSON válido.');
        }

        return await context.helpers.httpRequestWithAuthentication.call(context, 'ApiCmdeb2', {
            url: '/api/v2/profissionais/funcoes/lote',
            body: {profissionais},
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