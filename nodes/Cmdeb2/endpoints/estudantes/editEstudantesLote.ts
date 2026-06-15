import {IExecuteFunctions} from 'n8n-workflow';

export async function editEstudantesLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        // Obtém o parâmetro JSON informado pelo usuário no nó do n8n
        const estudantesJson = context.getNodeParameter('estudantes_edicao_json', index);

        let estudantes: any[];

        // Garante que o valor será um Array/Objeto JSON válido antes de montar o payload
        try {
            estudantes = typeof estudantesJson === 'string' ? JSON.parse(estudantesJson) : estudantesJson;
        } catch (e) {
            throw new Error('O campo de estudantes para edição deve conter um JSON válido.');
        }

        // Monta o corpo da requisição conforme a estrutura exigida pela API CMDEB (EstudantesEdicaoLoteRequest)
        const body = {
            estudantes,
        };

        // Realiza a chamada HTTP autenticada
        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/estudantes/edicao/lote',
                body,
                method: 'PUT',
            });

    } catch (error: any) {
        let mensagemErro = error.message || error.mensagem || error.detail || "Ocorreu um erro desconhecido";

        try {
            // Tenta extrair a mensagem de erro detalhada retornada pela API (caso seja um erro 422, por exemplo)
            if (error.response && error.response.data) {
                mensagemErro = JSON.stringify(error.response.data);
            }
        } catch {
            // Ignora falhas no parse do erro para não ofuscar o erro original
        }

        throw new Error(JSON.stringify({
            nome: error.nome || error.code || 'erro_desconhecido',
            mensagem: mensagemErro
        }));
    }
}