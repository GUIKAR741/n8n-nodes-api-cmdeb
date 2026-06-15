import {IExecuteFunctions, IHttpRequestOptions} from 'n8n-workflow';
import {createInstituicoesEnsinoLote} from '../endpoints/instituicoesEnsino/createInstituicoesEnsinoLote';
import {editInstituicoesEnsinoLote} from '../endpoints/instituicoesEnsino/editInstituicoesEnsinoLote';
import {listInstituicoesEnsino} from '../endpoints/instituicoesEnsino/listInstituicoesEnsino';

export async function instituicoesEnsinoService(
    this: IExecuteFunctions,
    endpoint: string,
    i: number,
): Promise<IHttpRequestOptions> {
    let requestOptions: IHttpRequestOptions;
    switch (endpoint) {
        case 'createInstituicoesEnsinoLote':
            requestOptions = await createInstituicoesEnsinoLote(this, i);
            break;
        case 'editInstituicoesEnsinoLote':
            requestOptions = await editInstituicoesEnsinoLote(this, i);
            break;
        case 'listInstituicoesEnsino':
            requestOptions = await listInstituicoesEnsino(this, i);
            break;
        default:
            throw new Error(`Endpoint de instituições de ensino não implementado: ${endpoint}`);
    }
    return requestOptions;
}