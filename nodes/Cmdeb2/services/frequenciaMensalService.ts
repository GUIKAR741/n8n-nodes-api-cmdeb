import {IExecuteFunctions, IHttpRequestOptions} from 'n8n-workflow';
import {createFrequenciaMensalLote} from '../endpoints/frequenciaMensal/createFrequenciaMensalLote';
import {editFrequenciaMensalLote} from '../endpoints/frequenciaMensal/editFrequenciaMensalLote';
import {listFrequenciaMensalPeriodo} from '../endpoints/frequenciaMensal/listFrequenciaMensalPeriodo';
import {listFrequenciaMensal} from '../endpoints/frequenciaMensal/listFrequenciaMensal';
import {listFrequenciaMensalFaltantes} from '../endpoints/frequenciaMensal/listFrequenciaMensalFaltantes';

export async function frequenciaMensalService(
    this: IExecuteFunctions,
    endpoint: string,
    i: number,
): Promise<IHttpRequestOptions> {
    let requestOptions: IHttpRequestOptions;
    switch (endpoint) {
        case 'createFrequenciaMensalLote':
            requestOptions = await createFrequenciaMensalLote(this, i);
            break;
        case 'editFrequenciaMensalLote':
            requestOptions = await editFrequenciaMensalLote(this, i);
            break;
        case 'listFrequenciaMensalPeriodo':
            requestOptions = await listFrequenciaMensalPeriodo(this, i);
            break;
        case 'listFrequenciaMensal':
            requestOptions = await listFrequenciaMensal(this, i);
            break;
        case 'listFrequenciaMensalFaltantes':
            requestOptions = await listFrequenciaMensalFaltantes(this, i);
            break;
        default:
            throw new Error(`Endpoint de frequência mensal não implementado: ${endpoint}`);
    }
    return requestOptions;
}