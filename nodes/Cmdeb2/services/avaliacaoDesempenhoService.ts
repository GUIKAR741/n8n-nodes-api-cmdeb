import {IExecuteFunctions, IHttpRequestOptions} from 'n8n-workflow';
import {createAvaliacaoDesempenhoLote} from '../endpoints/avaliacaoDesempenho/createAvaliacaoDesempenhoLote';
import {editAvaliacaoDesempenhoLote} from '../endpoints/avaliacaoDesempenho/editAvaliacaoDesempenhoLote';
import {listAvaliacaoDesempenho} from '../endpoints/avaliacaoDesempenho/listAvaliacaoDesempenho';

export async function avaliacaoDesempenhoService(
    this: IExecuteFunctions,
    endpoint: string,
    i: number,
): Promise<IHttpRequestOptions> {
    let requestOptions: IHttpRequestOptions;
    switch (endpoint) {
        case 'createAvaliacaoDesempenhoLote':
            requestOptions = await createAvaliacaoDesempenhoLote(this, i);
            break;
        case 'editAvaliacaoDesempenhoLote':
            requestOptions = await editAvaliacaoDesempenhoLote(this, i);
            break;
        case 'listAvaliacaoDesempenho':
            requestOptions = await listAvaliacaoDesempenho(this, i);
            break;
        default:
            throw new Error(`Endpoint de avaliação de desempenho não implementado: ${endpoint}`);
    }
    return requestOptions;
}