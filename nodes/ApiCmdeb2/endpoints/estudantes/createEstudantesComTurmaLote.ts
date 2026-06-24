import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function createEstudantesComTurmaLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    // Altere 'estudantes_com_turma_json' para o name exato da propriedade configurada no seu estudantesConfig.ts
    const estudantesJson = context.getNodeParameter('estudantes_com_turma_json', index);

    let estudantes: any[];

    try {
        estudantes = typeof estudantesJson === 'string' ? JSON.parse(estudantesJson) : estudantesJson;
    } catch (e) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Estudantes (JSON)" para cadastro deve conter um array JSON válido.',
            {itemIndex: index},
        );
    }

    if (estudantes.length === 0) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Estudantes (JSON)" deve ter pelo menos um registro.',
            {itemIndex: index},
        );
    }
    try {
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