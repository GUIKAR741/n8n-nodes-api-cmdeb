import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function editComponentesCurricularesLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    // Ajuste 'componentes_edicao_json' se o nome no seu componentesCurricularesConfig.ts for diferente
    const disciplinasJson = context.getNodeParameter('componentes_edicao_json', index);

    let disciplinas: any[];

    try {
        disciplinas = typeof disciplinasJson === 'string' ? JSON.parse(disciplinasJson) : disciplinasJson;
    } catch (e) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Disciplinas (JSON)" para cadastro deve conter um array JSON válido.',
            {itemIndex: index},
        );
    }

    if (disciplinas.length === 0) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Disciplinas (JSON)" deve ter pelo menos um registro.',
            {itemIndex: index},
        );
    }

    try {
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