import { IExecuteFunctions } from 'n8n-workflow';

export async function enturmarEstudantesLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        const matriculasJson = context.getNodeParameter('matriculas_enturmacao_json', index);

        let matriculas: any[];

        try {
            matriculas = typeof matriculasJson === 'string' ? JSON.parse(matriculasJson) : matriculasJson;
        } catch (e) {
            throw new Error('O campo de matrículas para enturmação deve conter um array JSON válido.');
        }

        const body = {
            matriculas,
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/matriculas/enturmacao/lote',
                body,
                method: 'POST',
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