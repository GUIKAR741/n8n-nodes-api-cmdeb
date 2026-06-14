import {IExecuteFunctions, IHttpRequestOptions} from 'n8n-workflow';
import {createTurmasLote} from '../endpoints/turmas/createTurmasLote';
import {listComponentesCurricularesTurma} from '../endpoints/turmas/listComponentesCurricularesTurma';
import {editTurmasLote} from '../endpoints/turmas/editTurmasLote';
import {listTurmas} from '../endpoints/turmas/listTurmas';

export async function turmasService(
    this: IExecuteFunctions,
    endpoint: string,
    i: number,
): Promise<IHttpRequestOptions> {
    let requestOptions: IHttpRequestOptions;
    switch (endpoint) {
        case 'createTurmasLote':
            requestOptions = await createTurmasLote(this, i);
            break;
        case 'listComponentesCurricularesTurma':
            requestOptions = await listComponentesCurricularesTurma(this, i);
            break;
        case 'editTurmasLote':
            requestOptions = await editTurmasLote(this, i);
            break;
        case 'listTurmas':
            requestOptions = await listTurmas(this, i);
            break;
        default:
            throw new Error(`Endpoint de turmas não implementado: ${endpoint}`);
    }
    return requestOptions;
}