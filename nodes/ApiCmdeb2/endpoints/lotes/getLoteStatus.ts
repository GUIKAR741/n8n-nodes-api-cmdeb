import {IExecuteFunctions} from 'n8n-workflow';

export async function getLoteStatus(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        // Parâmetro de rota obrigatório
        const lote_id = context.getNodeParameter('lote_id', index) as string;

        // Parâmetros de query (opcionais)
        const objetos_processados = context.getNodeParameter('objetos_processados', index, false) as boolean;
        const limit_objetos = context.getNodeParameter('limit_objetos', index, 100) as number;

        const params = new URLSearchParams();

        if (objetos_processados) {
            params.append('objetos_processados', String(objetos_processados));
        }
        if (limit_objetos) {
            params.append('limit_objetos', String(limit_objetos));
        }


        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: `/api/v2/lotes/${lote_id}${params.toString() ? '?' + params.toString() : ''}`,
                method: 'GET',
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

        throw new Error(JSON.stringify({
            nome: error.nome || error.code || 'erro_desconhecido',
            mensagem: mensagemErro
        }));
    }
}