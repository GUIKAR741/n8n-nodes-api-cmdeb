import { IExecuteFunctions } from 'n8n-workflow';

export async function createEstudantesSemTurmaLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        // Altere 'estudantes_sem_turma_json' para o name exato da propriedade configurada no seu estudantesConfig.ts
        const estudantesJson = context.getNodeParameter('estudantes_sem_turma_json', index);

        let estudantes: any[];

        try {
            estudantes = typeof estudantesJson === 'string' ? JSON.parse(estudantesJson) : estudantesJson;
        } catch (e) {
            throw new Error('O campo de estudantes sem turma deve conter um JSON válido.');
        }

        const body = {
            estudantes,
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/estudantes/sem-turma/cadastro/lote',
                body,
                method: 'POST',
            });

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