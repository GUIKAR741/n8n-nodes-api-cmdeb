import { IExecuteFunctions } from 'n8n-workflow';

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

        const qs: any = {
            ...(id_sgp_profissional && { id_sgp_profissional }),
            ...(id_sgp_instituicao && { id_sgp_instituicao }),
            ...(profissional_cpf && { profissional_cpf }),
            ...(co_entidade && { co_entidade }),
            ...(profissional_nome && { profissional_nome }),
            ...(co_ocupacao_funcao && { co_ocupacao_funcao }),
            ...(co_situacao_profissional_educacao_funcao && { co_situacao_profissional_educacao_funcao }),
            ...(page && { page }),
            ...(page_size && { page_size }),
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/profissionais', // Ajuste a rota se necessário
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