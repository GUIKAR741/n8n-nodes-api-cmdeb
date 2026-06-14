import { IExecuteFunctions } from 'n8n-workflow';

export async function listLotes(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const tiposStr = context.getNodeParameter('tipos', index, '') as string;

        // Transforma a string separada por vírgulas num array de números
        const tipos = tiposStr
            ? tiposStr.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n))
            : [];

        const page = context.getNodeParameter('page', index, 1) as number;
        const page_size = context.getNodeParameter('page_size', index, 100) as number;

        const qs: any = {
            ...(tipos.length > 0 && { tipos }),
            ...(page && { page }),
            ...(page_size && { page_size }),
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/lotes',
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