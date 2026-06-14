import { IExecuteFunctions } from 'n8n-workflow';

export async function listSolicitacoesAlteracoes(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        // Parâmetros partilhados
        const id_sgp_pessoa = context.getNodeParameter('id_sgp_pessoa', index, null) as number | null;
        const st_situacao_cpf = context.getNodeParameter('st_situacao_cpf', index, '') as string | number;
        const fl_no_pessoa_validado = context.getNodeParameter('fl_no_pessoa_validado', index, null) as boolean | null;
        const fl_dt_nascimento_validado = context.getNodeParameter('fl_dt_nascimento_validado', index, null) as boolean | null;
        const fl_no_mae_validado = context.getNodeParameter('fl_no_mae_validado', index, null) as boolean | null;

        // Parâmetros específicos
        const co_tipo_situacao = context.getNodeParameter('co_tipo_situacao', index, null) as number | null;
        const dt_criacao_inicio = context.getNodeParameter('dt_criacao_inicio', index, '') as string;
        const dt_criacao_fim = context.getNodeParameter('dt_criacao_fim', index, '') as string;

        // Paginação
        const page = context.getNodeParameter('page', index, 1) as number;
        const page_size = context.getNodeParameter('page_size', index, 100) as number;

        const qs: any = {
            ...(id_sgp_pessoa && { id_sgp_pessoa }),
            ...(st_situacao_cpf !== '' && { st_situacao_cpf }),
            ...(fl_no_pessoa_validado !== null && { fl_no_pessoa_validado }),
            ...(fl_dt_nascimento_validado !== null && { fl_dt_nascimento_validado }),
            ...(fl_no_mae_validado !== null && { fl_no_mae_validado }),
            ...(co_tipo_situacao && { co_tipo_situacao }),
            ...(dt_criacao_inicio && { dt_criacao_inicio }),
            ...(dt_criacao_fim && { dt_criacao_fim }),
            ...(page && { page }),
            ...(page_size && { page_size }),
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/pessoas/solicitacoes-alteracoes', // Ajuste a rota exata se necessário conforme a OpenAPI
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