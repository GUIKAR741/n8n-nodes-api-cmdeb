import {IExecuteFunctions} from 'n8n-workflow';

export async function listFrequenciaMensalPeriodo(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const ano_referencia = context.getNodeParameter('ano_referencia', index) as number;
        const mes_referencia = context.getNodeParameter('mes_referencia', index) as number;

        const id_sgp_entidade = context.getNodeParameter('id_sgp_entidade', index, null) as number | null;
        const id_sgp_matricula = context.getNodeParameter('id_sgp_matricula', index, null) as number | null;
        const co_entidade = context.getNodeParameter('co_entidade', index, '') as string;
        const estudante_cpf = context.getNodeParameter('estudante_cpf', index, '') as string;

        const page = context.getNodeParameter('page', index, 1) as number;
        const page_size = context.getNodeParameter('page_size', index, 100) as number;

        if ((mes_referencia && !ano_referencia) || (!mes_referencia && ano_referencia)) {
            throw new Error('Se campo mês preenchido então ano deve ser preenchido, se ano preenchido então mês deve ser preenchido.');
        }

        const params = new URLSearchParams();

        if (id_sgp_entidade) {
            params.append('id_sgp_entidade', String(id_sgp_entidade));
        }
        if (id_sgp_matricula) {
            params.append('id_sgp_matricula', String(id_sgp_matricula));
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
                url: `/api/v2/frequencia-mensal-matricula/${ano_referencia}/${mes_referencia}${params.toString() ? '?' + params.toString() : ''}`,
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