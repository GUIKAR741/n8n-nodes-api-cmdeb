import {IExecuteFunctions} from 'n8n-workflow';

export async function listProfissionais(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const id_sgp_profissional = context.getNodeParameter('id_sgp_profissional', index, null) as number | null;
        const id_sgp_instituicao = context.getNodeParameter('id_sgp_instituicao', index, null) as number | null;
        const profissional_cpf = context.getNodeParameter('profissional_cpf', index, '') as string;
        const co_entidade = context.getNodeParameter('co_entidade', index, '') as string;
        const profissional_nome = context.getNodeParameter('profissional_nome', index, '') as string;
        const co_ocupacao_funcao = context.getNodeParameter('co_ocupacao_funcao', index, null) as number | null;
        const co_situacao_profissional_educacao_funcao = context.getNodeParameter('co_situacao_profissional_educacao_funcao', index, null) as number | null;

        const page = context.getNodeParameter('page', index, 1) as number;
        const page_size = context.getNodeParameter('page_size', index, 100) as number;

        const params = new URLSearchParams();

        if (id_sgp_profissional) {
            params.append('id_sgp_profissional', String(id_sgp_profissional));
        }
        if (id_sgp_instituicao) {
            params.append('id_sgp_instituicao', String(id_sgp_instituicao));
        }
        if (profissional_cpf) {
            params.append('profissional_cpf', String(profissional_cpf));
        }
        if (co_entidade) {
            params.append('co_entidade', String(co_entidade));
        }
        if (profissional_nome) {
            params.append('profissional_nome', String(profissional_nome));
        }
        if (co_ocupacao_funcao) {
            params.append('co_ocupacao_funcao', String(co_ocupacao_funcao));
        }
        if (co_situacao_profissional_educacao_funcao) {
            params.append('co_situacao_profissional_educacao_funcao', String(co_situacao_profissional_educacao_funcao));
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
                url: `/api/v2/profissionais${params.toString() ? '?' + params.toString() : ''}`,
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