import {IExecuteFunctions} from 'n8n-workflow';

export async function listInstituicoesEnsino(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const id_sgp_entidade = context.getNodeParameter('id_sgp_entidade', index, null) as number | null;
        const co_entidade = context.getNodeParameter('co_entidade', index, '') as string;
        const no_entidade = context.getNodeParameter('no_entidade', index, '') as string;
        const co_uf = context.getNodeParameter('co_uf', index, '') as string;

        const page = context.getNodeParameter('page', index, 1) as number;
        const page_size = context.getNodeParameter('page_size', index, 100) as number;

        const params = new URLSearchParams();

        if (id_sgp_entidade) {
            params.append('id_sgp_entidade', String(id_sgp_entidade));
        }
        if (co_entidade) {
            params.append('co_entidade', String(co_entidade));
        }
        if (no_entidade) {
            params.append('no_entidade', String(no_entidade));
        }
        if (co_uf) {
            params.append('co_uf', String(co_uf));
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
                url: `/api/v2/instituicoes-ensino${params.toString() ? '?' + params.toString() : ''}`,
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