import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function listFrequenciaMensalFaltantes(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    const ano_referencia = context.getNodeParameter('ano_referencia', index) as number;
    const mes_referencia = context.getNodeParameter('mes_referencia', index) as number;

    const pdm = context.getNodeParameter('pdm', index, false) as boolean;
    const id_sgp_entidade = context.getNodeParameter('id_sgp_entidade', index, null) as number | null;
    const co_entidade = context.getNodeParameter('co_entidade', index, '') as string;
    const estudante_cpf = context.getNodeParameter('estudante_cpf', index, '') as string;

    const page = context.getNodeParameter('page', index, 1) as number;
    const page_size = context.getNodeParameter('page_size', index, 100) as number;

    if (!ano_referencia) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Ano de Referência" é obrigatório.',
            {itemIndex: index},
        );
    }

    if (!mes_referencia) {
        throw new NodeOperationError(
            context.getNode(),
            'O campo "Mês de Referência" é obrigatório.',
            {itemIndex: index},
        );
    }
    try {
        const params = new URLSearchParams();

        if (pdm) {
            params.append('pdm', String(pdm));
        }
        if (id_sgp_entidade) {
            params.append('id_sgp_entidade', String(id_sgp_entidade));
        }
        if (co_entidade) {
            params.append('co_entidade', String(co_entidade));
        }
        if (estudante_cpf) {
            params.append('estudante_cpf', String(estudante_cpf));
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
                url: `/api/v2/frequencia-mensal-matricula/${ano_referencia}/${mes_referencia}/faltantes${params.toString() ? '?' + params.toString() : ''}`,
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