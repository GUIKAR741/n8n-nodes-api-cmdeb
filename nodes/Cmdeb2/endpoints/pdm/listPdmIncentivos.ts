import { IExecuteFunctions } from 'n8n-workflow';

export async function listPdmIncentivos(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const cpf_nis = context.getNodeParameter('cpf_nis', index, '') as string;
        const co_entidade = context.getNodeParameter('co_entidade', index, '') as string;
        const ciclo = context.getNodeParameter('ciclo', index, null) as number | null;

        const page = context.getNodeParameter('page', index, 1) as number;
        const page_size = context.getNodeParameter('page_size', index, 100) as number;

        const qs: any = {
            ...(cpf_nis && { cpf_nis }),
            ...(co_entidade && { co_entidade }),
            ...(ciclo && { ciclo }),
            ...(page && { page }),
            ...(page_size && { page_size }),
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/pdm/incentivos',
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