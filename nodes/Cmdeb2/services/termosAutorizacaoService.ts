import {IExecuteFunctions, IHttpRequestOptions} from 'n8n-workflow';
import {listTermosAutorizacao} from '../endpoints/termosAutorizacao/listTermosAutorizacao';

export async function termosAutorizacaoService(
    this: IExecuteFunctions,
    endpoint: string,
    i: number,
): Promise<IHttpRequestOptions> {
    let requestOptions: IHttpRequestOptions;
    switch (endpoint) {
        case 'listTermosAutorizacao':
            requestOptions = await listTermosAutorizacao(this, i);
            break;
        default:
            throw new Error(`Endpoint de termos de autorização não implementado: ${endpoint}`);
    }
    return requestOptions;
}