import { IExecuteFunctions } from 'n8n-workflow';

export async function createComponentesCurricularesLote(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        // Ajuste 'componentes_cadastro_json' se o nome no seu componentesCurricularesConfig.ts for diferente
        const disciplinasJson = context.getNodeParameter('componentes_cadastro_json', index);

        let disciplinas: any[];

        try {
            disciplinas = typeof disciplinasJson === 'string' ? JSON.parse(disciplinasJson) : disciplinasJson;
        } catch (e) {
            throw new Error('O campo de componentes curriculares para cadastro deve conter um array JSON válido.');
        }

        const body = {
            disciplinas,
        };

        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2',
            {
                url: '/api/v2/componentes-curriculares/lote',
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