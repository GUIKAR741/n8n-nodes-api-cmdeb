import { IExecuteFunctions } from 'n8n-workflow';

export async function editInstituicoesEnsinoLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const instituicoesJson = context.getNodeParameter('instituicoes_edicao_json', index);

        let instituicoes: any[];

        try {
            instituicoes = typeof instituicoesJson === 'string' ? JSON.parse(instituicoesJson) : instituicoesJson;
        } catch (e) {
            throw new Error('O campo de instituições para edição deve conter um array JSON válido.');
        }

        const body = {
            instituicoes,
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/instituicoes-ensino/lote',
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