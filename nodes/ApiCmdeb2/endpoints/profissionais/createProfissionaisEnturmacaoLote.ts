import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function createProfissionaisEnturmacaoLote(context: IExecuteFunctions, index: number): Promise<any> {
    const profissionaisJson = context.getNodeParameter('profissionais_enturmacao_cadastro_json', index);
    let profissionais: any[];

    try {
        profissionais = typeof profissionaisJson === 'string' ? JSON.parse(profissionaisJson) : profissionaisJson;
    } catch (e) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Alocações (JSON)" para cadastro deve conter um array JSON válido.',
            {itemIndex: index},
        );
    }

    if (profissionais.length === 0) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Alocações (JSON)" deve ter pelo menos um registro.',
            {itemIndex: index},
        );
    }
    try {
        return await context.helpers.httpRequestWithAuthentication.call(context, 'ApiCmdeb2', {
            url: '/api/v2/profissionais/enturmacao/lote',
            body: {profissionais},
            method: 'POST',
        });
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