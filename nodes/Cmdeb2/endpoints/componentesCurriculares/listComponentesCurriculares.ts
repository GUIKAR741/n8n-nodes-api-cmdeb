import { IExecuteFunctions } from 'n8n-workflow';

export async function listComponentesCurriculares(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const id_sgp_componente_curricular = context.getNodeParameter('id_sgp_componente_curricular', index, null) as number | null;
        const co_area_conhecimento = context.getNodeParameter('co_area_conhecimento', index, null) as number | null;

        // Booleano com fallback para null, requer atenção especial para não ignorar o valor 'false'
        const st_ativo = context.getNodeParameter('st_ativo', index, null) as boolean | null;

        const no_componente_curricular = context.getNodeParameter('no_componente_curricular', index, '') as string;

        const page = context.getNodeParameter('page', index, 1) as number;
        const page_size = context.getNodeParameter('page_size', index, 100) as number;

        const qs: any = {
            ...(id_sgp_componente_curricular && { id_sgp_componente_curricular }),
            ...(co_area_conhecimento && { co_area_conhecimento }),
            ...(st_ativo !== null && { st_ativo }),
            ...(no_componente_curricular && { no_componente_curricular }),
            ...(page && { page }),
            ...(page_size && { page_size }),
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/componentes-curriculares',
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