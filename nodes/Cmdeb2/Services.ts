import {IExecuteFunctions} from 'n8n-workflow';

// ─── Importação de todos os Services ──────────────────────────────────────
import {avaliacaoDesempenhoService} from "./services/avaliacaoDesempenhoService";
import {componentesCurricularesService} from "./services/componentesCurricularesService";
import {estudantesService} from "./services/estudantesService";
import {frequenciaMensalService} from "./services/frequenciaMensalService";
import {instituicoesEnsinoService} from "./services/instituicoesEnsinoService";
import {lotesService} from "./services/lotesService";
import {matriculasService} from "./services/matriculasService";
import {pdmService} from "./services/pdmService";
import {pessoasService} from "./services/pessoasService";
import {profissionaisService} from "./services/profissionaisService";
import {termosAutorizacaoService} from "./services/termosAutorizacaoService";
import {turmasService} from "./services/turmasService";

export async function execute(
    this: IExecuteFunctions,
    endpoint: string,
    i: number
) {
    const returnData: any[] = [];
    const transactionType = this.getNodeParameter('transactionType', i) as string;

    try {
        let response;

        // 1. Obtém as opções da requisição (função, url, body, qs) baseadas no endpoint
        switch (transactionType) {
            case 'avaliacaoDesempenho':
                response = await avaliacaoDesempenhoService.call(this, endpoint, i);
                break;
            case 'componentesCurriculares':
                response = await componentesCurricularesService.call(this, endpoint, i);
                break;
            case 'estudantes':
                response = await estudantesService.call(this, endpoint, i);
                break;
            case 'frequenciaMensal':
                response = await frequenciaMensalService.call(this, endpoint, i);
                break;
            case 'instituicoesEnsino':
                response = await instituicoesEnsinoService.call(this, endpoint, i);
                break;
            case 'lotes':
                response = await lotesService.call(this, endpoint, i);
                break;
            case 'matriculas':
                response = await matriculasService.call(this, endpoint, i);
                break;
            case 'pdm':
                response = await pdmService.call(this, endpoint, i);
                break;
            case 'pessoas':
                response = await pessoasService.call(this, endpoint, i);
                break;
            case 'profissionais':
                response = await profissionaisService.call(this, endpoint, i);
                break;
            case 'termosAutorizacao':
                response = await termosAutorizacaoService.call(this, endpoint, i);
                break;
            case 'turmas':
                response = await turmasService.call(this, endpoint, i);
                break;
            default:
                throw new Error(`Erro: '${transactionType}' não é um tipo de transação válida.`);
        }

        // 2. Adiciona a resposta da API ao output do nó
        returnData.push({json: response});

    } catch (error) {
        this.logger.error('Erro ao executar a requisição:', error);

        if (error.isAxiosError) {
            if (error.response) {
                const responseData = error.response.data;
                let errorMessage = 'Erro na API';
                let errorDetails = {};

                if (typeof responseData === 'object') {
                    errorMessage = responseData.message ||
                        responseData.error_description ||
                        responseData.error ||
                        `Error ${error.response.status}: ${error.response.statusText}`;
                    errorDetails = responseData;
                } else if (typeof responseData === 'string') {
                    errorMessage = responseData;
                    try {
                        errorDetails = JSON.parse(responseData);
                    } catch (e) {
                        errorDetails = {rawResponse: responseData};
                    }
                }

                this.logger.error('Erro detalhado da API:', {
                    statusCode: error.response.status,
                    message: errorMessage,
                    details: JSON.stringify(errorDetails, null, 2)
                });

                returnData.push({
                    json: {
                        success: false,
                        status: error.response.status,
                        statusText: error.response.statusText,
                        message: errorMessage,
                        details: errorDetails
                    },
                });
            } else {
                this.logger.error('Erro na requisição:', error.message);
                returnData.push({json: {error: error.message}});
            }
        } else {
            this.logger.error('Erro desconhecido:', error.message);
            returnData.push({json: {error: error.message}});
        }

        if (this.continueOnFail()) {
            return returnData;
        } else {
            throw error;
        }
    }

    return returnData;
}