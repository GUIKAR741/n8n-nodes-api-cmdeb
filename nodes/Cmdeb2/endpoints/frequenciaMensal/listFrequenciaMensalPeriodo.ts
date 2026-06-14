import { IExecuteFunctions } from 'n8n-workflow';

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

        const qs: any = {
            ...(id_sgp_entidade && { id_sgp_entidade }),
            ...(id_sgp_matricula && { id_sgp_matricula }),
            ...(co_entidade && { co_entidade }),
            ...(estudante_cpf && { estudante_cpf }),
            ...(page && { page }),
            ...(page_size && { page_size }),
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: `/api/v2/frequencia-mensal-matricula/${ano_referencia}/${mes_referencia}`,
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