import { IExecuteFunctions } from 'n8n-workflow';

export async function editFormacoesProfissionaisLote(context: IExecuteFunctions, index: number): Promise<any> {
    try {
        const profissionaisJson = context.getNodeParameter('profissionais_formacoes_edicao_json', index);
        let profissionais: any[];

        try {
            profissionais = typeof profissionaisJson === 'string' ? JSON.parse(profissionaisJson) : profissionaisJson;
        } catch (e) {
            throw new Error('O campo de profissionais para edição deve conter um array JSON válido.');
        }

        return await context.helpers.httpRequestWithAuthentication.call(context, 'ApiCmdeb2', {
            url: '/api/v2/profissionais/formacoes/lote',
            body: { profissionais },
            method: 'PUT',
        });
    } catch (error: any) {
        let mensagemErro = error.message || "Ocorreu um erro desconhecido";
        try { if (error.response && error.response.data) mensagemErro = JSON.stringify(error.response.data); } catch {}
        throw new Error(JSON.stringify({ nome: error.nome || 'erro_desconhecido', mensagem: mensagemErro }));
    }
}