import { IExecuteFunctions } from 'n8n-workflow';

export async function getLoteErros(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        // Parâmetro de rota obrigatório
        const lote_id = context.getNodeParameter('lote_id', index) as string;

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: `/api/v2/lotes/${lote_id}/erros`,
                method: 'GET',
            }
        );

    } catch (error: any) {
        let mensagemErro = error.message || error.mensagem || error.detail || "Ocorreu um erro desconhecido";
        try {
            if (error.response && error.response.data) {
                mensagemErro = JSON.stringify(error.response.data);
            }
        } catch {}

        throw new Error(JSON.stringify({
            nome: error.nome || error.code || 'erro_desconhecido',
            mensagem: mensagemErro
        }));
    }
}