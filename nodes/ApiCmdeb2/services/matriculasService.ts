import {IExecuteFunctions, IHttpRequestOptions} from 'n8n-workflow';
import {confirmarConclusaoMatriculasLote} from '../endpoints/matriculas/confirmarConclusaoMatriculasLote';
import {editMatriculasLote} from '../endpoints/matriculas/editMatriculasLote';
import {enturmarEstudantesLote} from '../endpoints/matriculas/enturmarEstudantesLote';
import {movimentarMatriculasLote} from '../endpoints/matriculas/movimentarMatriculasLote';

export async function matriculasService(
    this: IExecuteFunctions,
    endpoint: string,
    i: number,
): Promise<IHttpRequestOptions> {
    let requestOptions: IHttpRequestOptions;
    switch (endpoint) {
        case 'confirmarConclusaoMatriculasLote':
            requestOptions = await confirmarConclusaoMatriculasLote(this, i);
            break;
        case 'editMatriculasLote':
            requestOptions = await editMatriculasLote(this, i);
            break;
        case 'enturmarEstudantesLote':
            requestOptions = await enturmarEstudantesLote(this, i);
            break;
        case 'movimentarMatriculasLote':
            requestOptions = await movimentarMatriculasLote(this, i);
            break;
        default:
            throw new Error(`Endpoint de matrículas não implementado: ${endpoint}`);
    }
    return requestOptions;
}