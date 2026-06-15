import {IExecuteFunctions, IHttpRequestOptions} from 'n8n-workflow';
import {getLoteErros} from '../endpoints/lotes/getLoteErros';
import {getLoteStatus} from '../endpoints/lotes/getLoteStatus';
import {listLotes} from '../endpoints/lotes/listLotes';

export async function lotesService(
    this: IExecuteFunctions,
    endpoint: string,
    i: number,
): Promise<IHttpRequestOptions> {
    let requestOptions: IHttpRequestOptions;
    switch (endpoint) {
        case 'getLoteErros':
            requestOptions = await getLoteErros(this, i);
            break;
        case 'getLoteStatus':
            requestOptions = await getLoteStatus(this, i);
            break;
        case 'listLotes':
            requestOptions = await listLotes(this, i);
            break;
        default:
            throw new Error(`Endpoint de lotes não implementado: ${endpoint}`);
    }
    return requestOptions;
}