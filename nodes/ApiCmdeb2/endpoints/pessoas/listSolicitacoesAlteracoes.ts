import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

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

        const params = new URLSearchParams();

        if (id_sgp_pessoa) {
            params.append('id_sgp_pessoa', String(id_sgp_pessoa));
        }
        if (st_situacao_cpf) {
            params.append('st_situacao_cpf', String(st_situacao_cpf));
        }
        if (fl_no_pessoa_validado) {
            params.append('fl_no_pessoa_validado', String(fl_no_pessoa_validado));
        }
        if (fl_dt_nascimento_validado) {
            params.append('fl_dt_nascimento_validado', String(fl_dt_nascimento_validado));
        }
        if (fl_no_mae_validado) {
            params.append('fl_no_mae_validado', String(fl_no_mae_validado));
        }
        if (co_tipo_situacao) {
            params.append('co_tipo_situacao', String(co_tipo_situacao));
        }
        if (dt_criacao_inicio) {
            params.append('dt_criacao_inicio', String(dt_criacao_inicio));
        }
        if (dt_criacao_fim) {
            params.append('dt_criacao_fim', String(dt_criacao_fim));
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
                url: `/api/v2/pessoas/solicitacoes-alteracoes${params.toString() ? '?' + params.toString() : ''}`,
                method: 'GET',
            }
        );

    } catch (error: any) {
        throw new NodeOperationError(
            context.getNode(),
            `Erro ao consultar API HTTP ${error.httpCode}: ${error.description}`,
            {
                description: JSON.stringify(error, null, 4),
            },
        );
    }
}