import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function editInstituicoesEnsinoLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    const instituicoesJson = context.getNodeParameter('instituicoes_edicao_json', index);

    let instituicoes: any[];

    try {
        instituicoes = typeof instituicoesJson === 'string' ? JSON.parse(instituicoesJson) : instituicoesJson;
    } catch (e) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Instituições para Edição (JSON)" para cadastro deve conter um array JSON válido.',
            {itemIndex: index},
        );
    }

    if (instituicoes.length === 0) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Instituições para Edição (JSON)" deve ter pelo menos um registro.',
            {itemIndex: index},
        );
    }

    try {
        const body = {
            instituicoes,
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/instituicoes-ensino/lote',
                body,
                method: 'PUT',
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