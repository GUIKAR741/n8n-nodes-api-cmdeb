import {IExecuteFunctions, IHttpRequestOptions} from 'n8n-workflow';
import {listPdmElegibilidades} from '../endpoints/pdm/listPdmElegibilidades';
import {listPdmIncentivos} from '../endpoints/pdm/listPdmIncentivos';

export async function pdmService(
    this: IExecuteFunctions,
    endpoint: string,
    i: number,
): Promise<IHttpRequestOptions> {
    let requestOptions: IHttpRequestOptions;
    switch (endpoint) {
        case 'listPdmElegibilidades':
            requestOptions = await listPdmElegibilidades(this, i);
            break;
        case 'listPdmIncentivos':
            requestOptions = await listPdmIncentivos(this, i);
            break;
        default:
            throw new Error(`Endpoint de Pé-de-Meia não implementado: ${endpoint}`);
    }
    return requestOptions;
}