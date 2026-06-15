import {IExecuteFunctions, IHttpRequestOptions} from 'n8n-workflow';

// Importações dos endpoints de estudantes
import {listEstudantes} from '../endpoints/estudantes/listEstudantes';
import {createEstudantesComTurmaLote} from '../endpoints/estudantes/createEstudantesComTurmaLote';
import {createEstudantesSemTurmaLote} from '../endpoints/estudantes/createEstudantesSemTurmaLote';
import {editEstudantesLote} from '../endpoints/estudantes/editEstudantesLote';

export async function estudantesService(
    this: IExecuteFunctions,
    endpoint: string,
    i: number,
): Promise<IHttpRequestOptions> {
    let requestOptions: IHttpRequestOptions;

    switch (endpoint) {
        case 'listEstudantes':
            requestOptions = await listEstudantes(this, i);
            break;
        case 'createEstudantesComTurmaLote':
            requestOptions = await createEstudantesComTurmaLote(this, i);
            break;
        case 'createEstudantesSemTurmaLote':
            requestOptions = await createEstudantesSemTurmaLote(this, i);
            break;
        case 'editEstudantesLote':
            requestOptions = await editEstudantesLote(this, i);
            break;
        default:
            throw new Error(`Endpoint de estudantes não implementado: ${endpoint}`);
    }

    return requestOptions;
}