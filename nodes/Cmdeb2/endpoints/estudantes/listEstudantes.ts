import { IExecuteFunctions } from 'n8n-workflow';

export async function listEstudantes(
    context: IExecuteFunctions,
    index: number,
): Promise<any> {
    try {
        // Extração segura: usamos um terceiro argumento como fallback (null, '', ou false)
        // Isso evita que o n8n lance erro de "Parameter not found" para os campos opcionais
        const id_sgp_instituicao = context.getNodeParameter('id_sgp_instituicao', index, null) as number | null;
        const id_sgp_turma = context.getNodeParameter('id_sgp_turma', index, null) as number | null;
        const estudante_cpf = context.getNodeParameter('estudante_cpf', index, '') as string;
        const co_entidade = context.getNodeParameter('co_entidade', index, '') as string;
        const ano_matricula = context.getNodeParameter('ano_matricula', index, null) as number | null;
        const id_sgp_matricula = context.getNodeParameter('id_sgp_matricula', index, null) as number | null;

        const outras_matriculas = context.getNodeParameter('outras_matriculas', index, false) as boolean;
        const include_endereco = context.getNodeParameter('include_endereco', index, false) as boolean;

        const page = context.getNodeParameter('page', index, 1) as number;
        const page_size = context.getNodeParameter('page_size', index, 100) as number;

        // Extração e tratamento seguro para arrays separados por vírgula
        const situacoesStr = context.getNodeParameter('situacoes_matricula', index, '') as string;
        const situacoes_matricula = situacoesStr
            ? situacoesStr.split(',').map(s => s.trim()).filter(Boolean).map(Number)
            : [];

        const etapasStr = context.getNodeParameter('etapas_ensino', index, '') as string;
        const etapas_ensino = etapasStr
            ? etapasStr.split(',').map(s => s.trim()).filter(Boolean).map(Number)
            : [];

        // Montagem da query string dinamicamente. Ignora os campos vazios ou nulos.
        const qs: any = {
            ...(id_sgp_instituicao && { id_sgp_instituicao }),
            ...(id_sgp_turma && { id_sgp_turma }),
            ...(estudante_cpf && { estudante_cpf }),
            ...(co_entidade && { co_entidade }),
            ...(ano_matricula && { ano_matricula }),
            ...(id_sgp_matricula && { id_sgp_matricula }),
            ...(situacoes_matricula.length > 0 && { situacoes_matricula }),
            ...(etapas_ensino.length > 0 && { etapas_ensino }),
            ...(outras_matriculas && { outras_matriculas }),
            ...(include_endereco && { include_endereco }),
            ...(page && { page }),
            ...(page_size && { page_size }),
        };

        // Realiza a requisição e retorna o conteúdo
        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2', // Nome da credencial registrada
            {
                url: '/api/v2/estudantes',
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
        } catch {
            // Se falhar o parse do erro da API, mantém a mensagem original
        }

        throw new Error(JSON.stringify({
            nome: error.nome || error.code || 'erro_desconhecido',
            mensagem: mensagemErro
        }));
    }
}