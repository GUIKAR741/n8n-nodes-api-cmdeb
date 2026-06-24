import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

export async function listComponentesCurriculares(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const id_sgp_componente_curricular = context.getNodeParameter('id_sgp_componente_curricular', index, null) as number | null;
        const co_area_conhecimento = context.getNodeParameter('co_area_conhecimento', index, '') as number | string;

        // Booleano com fallback para null, requer atenção especial para não ignorar o valor 'false'
        const st_ativo = context.getNodeParameter('st_ativo', index, null) as boolean | null;

        const no_componente_curricular = context.getNodeParameter('no_componente_curricular', index, '') as string;

        const page = context.getNodeParameter('page', index, 1) as number;
        const page_size = context.getNodeParameter('page_size', index, 100) as number;

        const params = new URLSearchParams();

        if (id_sgp_componente_curricular) {
            params.append('id_sgp_componente_curricular', String(id_sgp_componente_curricular));
        }
        if (co_area_conhecimento && co_area_conhecimento !== '') {
            params.append('co_area_conhecimento', String(co_area_conhecimento));
        }
        if (st_ativo) {
            params.append('st_ativo', String(st_ativo));
        }
        if (no_componente_curricular) {
            params.append('no_componente_curricular', String(no_componente_curricular));
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
                url: `/api/v2/componentes-curriculares${params.toString() ? '?' + params.toString() : ''}`,
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