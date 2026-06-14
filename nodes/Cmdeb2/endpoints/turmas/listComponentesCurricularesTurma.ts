import { IExecuteFunctions } from 'n8n-workflow';

export async function listComponentesCurricularesTurma(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const id_sgp_turma = context.getNodeParameter('id_sgp_turma', index) as number;

        const page = context.getNodeParameter('page', index, 1) as number;
        const page_size = context.getNodeParameter('page_size', index, 100) as number;

        const qs: any = {
            ...(page && { page }),
            ...(page_size && { page_size }),
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: `/api/v2/turmas/${id_sgp_turma}/componentes-curriculares`,
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