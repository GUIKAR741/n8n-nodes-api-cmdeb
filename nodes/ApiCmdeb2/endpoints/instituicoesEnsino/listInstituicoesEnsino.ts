import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function listInstituicoesEnsino(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const id_sgp_entidade = context.getNodeParameter('id_sgp_entidade', index, null) as number | null;
        const co_entidade = context.getNodeParameter('co_entidade', index, '') as string;
        const no_instituicao = context.getNodeParameter('no_instituicao', index, '') as string;
        const co_municipio = context.getNodeParameter('co_municipio', index, null) as number | null;
        const co_uf = context.getNodeParameter('co_uf', index, null) as number | null;
        const co_dependencia_administrativa = context.getNodeParameter('co_dependencia_administrativa', index, '') as number | string;
        const co_situacao_funcionamento = context.getNodeParameter('co_situacao_funcionamento', index, '') as number | string;
        const include_endereco = context.getNodeParameter('include_endereco', index, false) as boolean;

        const page = context.getNodeParameter('page', index, 1) as number;
        const page_size = context.getNodeParameter('page_size', index, 100) as number;

        const params = new URLSearchParams();

        if (id_sgp_entidade) {
            params.append('id_sgp_entidade', String(id_sgp_entidade));
        }
        if (co_entidade) {
            params.append('co_entidade', String(co_entidade));
        }
        if (no_instituicao) {
            params.append('no_instituicao', String(no_instituicao));
        }
        if (co_municipio) {
            params.append('co_municipio', String(co_municipio));
        }
        if (co_uf) {
            params.append('co_uf', String(co_uf));
        }
        if (co_dependencia_administrativa && co_dependencia_administrativa !== '') {
            params.append('co_dependencia_administrativa', String(co_dependencia_administrativa));
        }
        if (co_situacao_funcionamento && co_situacao_funcionamento !== '') {
            params.append('co_situacao_funcionamento', String(co_situacao_funcionamento));
        }
        if (include_endereco) {
            params.append('include_endereco', String(include_endereco));
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