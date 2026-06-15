import {IExecuteFunctions} from 'n8n-workflow';

export async function listPdmElegibilidades(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const cpf_nis = context.getNodeParameter('cpf_nis', index, '') as string;
        const co_entidade = context.getNodeParameter('co_entidade', index, '') as string;
        const ciclo = context.getNodeParameter('ciclo', index, null) as number | null;

        const page = context.getNodeParameter('page', index, 1) as number;
        const page_size = context.getNodeParameter('page_size', index, 100) as number;

        const params = new URLSearchParams();

        if (cpf_nis) {
            params.append('cpf_nis', String(cpf_nis));
        }
        if (co_entidade) {
            params.append('co_entidade', String(co_entidade));
        }
        if (ciclo) {
            params.append('ciclo', String(ciclo));
        }
        if (page) {
            params.append('page', String(page));
        }
        if (page_size) {
            params.append('page_size', String(page_size));
        }

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: `/api/v2/pdm/elegibilidades${params.toString() ? '?' + params.toString() : ''}`,
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