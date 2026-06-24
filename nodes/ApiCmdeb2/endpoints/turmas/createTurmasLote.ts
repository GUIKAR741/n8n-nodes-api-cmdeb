import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function createTurmasLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    const turmasJson = context.getNodeParameter('turmas_cadastro_json', index);

    let turmas: any[];

    try {
        turmas = typeof turmasJson === 'string' ? JSON.parse(turmasJson) : turmasJson;
    } catch (e) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Turmas para Cadastro (JSON)" para cadastro deve conter um array JSON válido.',
            {itemIndex: index},
        );
    }

    if (turmas.length === 0) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Turmas para Cadastro (JSON)" deve ter pelo menos um registro.',
            {itemIndex: index},
        );
    }
    try {
        const body = {
            turmas,
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/turmas/lote',
                body,
                method: 'POST',
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