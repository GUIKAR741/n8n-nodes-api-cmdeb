import {IExecuteFunctions, IHttpRequestOptions} from 'n8n-workflow';
import {addFormacoesProfissionaisLote} from '../endpoints/profissionais/addFormacoesProfissionaisLote';
import {addFuncoesProfissionaisLote} from '../endpoints/profissionais/addFuncoesProfissionaisLote';
import {createProfissionaisLote} from '../endpoints/profissionais/createProfissionaisLote';
import {editProfissionaisLote} from '../endpoints/profissionais/editProfissionaisLote';
import {editFormacoesProfissionaisLote} from '../endpoints/profissionais/editFormacoesProfissionaisLote';
import {editFuncoesProfissionaisLote} from '../endpoints/profissionais/editFuncoesProfissionaisLote';
import {listProfissionais} from '../endpoints/profissionais/listProfissionais';

export async function profissionaisService(
    this: IExecuteFunctions,
    endpoint: string,
    i: number,
): Promise<IHttpRequestOptions> {
    let requestOptions: IHttpRequestOptions;
    switch (endpoint) {
        case 'addFormacoesProfissionaisLote':
            requestOptions = await addFormacoesProfissionaisLote(this, i);
            break;
        case 'addFuncoesProfissionaisLote':
            requestOptions = await addFuncoesProfissionaisLote(this, i);
            break;
        case 'createProfissionaisLote':
            requestOptions = await createProfissionaisLote(this, i);
            break;
        case 'editProfissionaisLote':
            requestOptions = await editProfissionaisLote(this, i);
            break;
        case 'editFormacoesProfissionaisLote':
            requestOptions = await editFormacoesProfissionaisLote(this, i);
            break;
        case 'editFuncoesProfissionaisLote':
            requestOptions = await editFuncoesProfissionaisLote(this, i);
            break;
        case 'listProfissionais':
            requestOptions = await listProfissionais(this, i);
            break;
        default:
            throw new Error(`Endpoint de profissionais não implementado: ${endpoint}`);
    }
    return requestOptions;
}