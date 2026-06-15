import {IExecuteFunctions, IHttpRequestOptions} from 'n8n-workflow';
import {listSolicitacoesAlteracoes} from '../endpoints/pessoas/listSolicitacoesAlteracoes';
import {listValidacoesCadastrais} from '../endpoints/pessoas/listValidacoesCadastrais';

export async function pessoasService(
    this: IExecuteFunctions,
    endpoint: string,
    i: number,
): Promise<IHttpRequestOptions> {
    let requestOptions: IHttpRequestOptions;
    switch (endpoint) {
        case 'listSolicitacoesAlteracoes':
            requestOptions = await listSolicitacoesAlteracoes(this, i);
            break;
        case 'listValidacoesCadastrais':
            requestOptions = await listValidacoesCadastrais(this, i);
            break;
        default:
            throw new Error(`Endpoint de pessoas não implementado: ${endpoint}`);
    }
    return requestOptions;
}