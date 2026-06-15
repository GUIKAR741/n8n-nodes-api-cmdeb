import {IExecuteFunctions, IHttpRequestOptions} from 'n8n-workflow';
import {
    createComponentesCurricularesLote
} from '../endpoints/componentesCurriculares/createComponentesCurricularesLote';
import {editComponentesCurricularesLote} from '../endpoints/componentesCurriculares/editComponentesCurricularesLote';
import {listComponentesCurriculares} from '../endpoints/componentesCurriculares/listComponentesCurriculares';

export async function componentesCurricularesService(
    this: IExecuteFunctions,
    endpoint: string,
    i: number,
): Promise<IHttpRequestOptions> {
    let requestOptions: IHttpRequestOptions;
    switch (endpoint) {
        case 'createComponentesCurricularesLote':
            requestOptions = await createComponentesCurricularesLote(this, i);
            break;
        case 'editComponentesCurricularesLote':
            requestOptions = await editComponentesCurricularesLote(this, i);
            break;
        case 'listComponentesCurriculares':
            requestOptions = await listComponentesCurriculares(this, i);
            break;
        default:
            throw new Error(`Endpoint de componentes curriculares não implementado: ${endpoint}`);
    }
    return requestOptions;
}