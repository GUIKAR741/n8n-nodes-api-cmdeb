import { IExecuteFunctions } from 'n8n-workflow';

export async function editTurmasLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const turmasJson = context.getNodeParameter('turmas_edicao_json', index);

        let turmas: any[];

        try {
            turmas = typeof turmasJson === 'string' ? JSON.parse(turmasJson) : turmasJson;
        } catch (e) {
            throw new Error('O campo de turmas para edição deve conter um array JSON válido.');
        }

        const body = {
            turmas,
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/turmas/lote',
                body,
                method: 'PUT',
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