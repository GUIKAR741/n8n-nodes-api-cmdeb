import { IExecuteFunctions } from 'n8n-workflow';

export async function listTermosAutorizacao(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const co_municipio = context.getNodeParameter('co_municipio', index, null) as number | null;

        const page = context.getNodeParameter('page', index, 1) as number;
        const page_size = context.getNodeParameter('page_size', index, 100) as number;

        const qs: any = {
            ...(co_municipio && { co_municipio }),
            ...(page && { page }),
            ...(page_size && { page_size }),
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/auth/termo-autorizacao',
                qs,
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