import {IExecuteFunctions, NodeOperationError} from 'n8n-workflow';

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

        const situacoes_matricula = context.getNodeParameter('situacoes_matricula', index, []) as number[];

        const etapas_ensino = context.getNodeParameter('etapas_ensino', index, []) as number[];

        const params = new URLSearchParams();

        if (id_sgp_instituicao) {
            params.append('id_sgp_instituicao', String(id_sgp_instituicao));
        }
        if (id_sgp_turma) {
            params.append('id_sgp_turma', String(id_sgp_turma));
        }
        if (estudante_cpf) {
            params.append('estudante_cpf', String(estudante_cpf));
        }
        if (co_entidade) {
            params.append('co_entidade', String(co_entidade));
        }
        if (ano_matricula) {
            params.append('ano_matricula', String(ano_matricula));
        }
        if (id_sgp_matricula) {
            params.append('id_sgp_matricula', String(id_sgp_matricula));
        }
        situacoes_matricula.forEach((situacao_matricula) => {
            params.append('situacoes_matricula', String(situacao_matricula));
        });
        etapas_ensino.forEach((etapa_ensino) => {
            params.append('etapas_ensino', String(etapa_ensino));
        });
        if (outras_matriculas) {
            params.append('outras_matriculas', String(outras_matriculas));
        }
        if (include_endereco) {
            params.append('include_endereco', String(include_endereco));
        }
        if (page) {
            params.append('page', String(page));
        }
        if (page_size) {
            params.append('page_size', String(page_size));
        }

        // Realiza a requisição e retorna o conteúdo
        return await context.helpers.httpRequestWithAuthentication.call(
            context,
            'ApiCmdeb2', // Nome da credencial registrada
            {
                url: `/api/v2/estudantes${params.toString() ? '?' + params.toString() : ''}`,
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