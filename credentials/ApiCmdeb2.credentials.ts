import type {
    Icon,
    ICredentialTestRequest,
    ICredentialType, IDataObject, IHttpRequestOptions,
    INodeProperties
} from 'n8n-workflow';


export class ApiCmdeb2 implements ICredentialType {
    name = 'ApiCmdeb2';

    displayName = 'API CMDEB 2.0';

    icon: Icon = 'file:SGP.svg';

    documentationUrl = 'https://api-cmde2.gestaopresente.mec.gov.br/redoc';

    properties: INodeProperties[] = [
        {
            displayName: 'Ambiente',
            name: 'environment',
            type: 'options',
            default: 'prod',
            options: [
                {
                    name: 'Produção',
                    value: 'https://api-cmde2.gestaopresente.mec.gov.br',
                    description: 'https://api-cmde2.gestaopresente.mec.gov.br',
                },
                {
                    name: 'Homologação',
                    value: 'https://api-cmde2.hmg.gestaopresente.mec.gov.br',
                    description: 'https://api-cmde2.hmg.gestaopresente.mec.gov.br',
                },
            ],
        },
        {
            displayName: 'Usuário',
            name: 'username',
            type: 'string',
            required: true,
            default: '',
        },
        {
            displayName: 'Senha',
            name: 'password',
            type: 'string',
            required: true,
            typeOptions: {
                password: true,
            },
            default: '',
        },
    ];


    authenticate = async (
        credentials: IDataObject,
        requestOptions: IHttpRequestOptions,
    ): Promise<IHttpRequestOptions> => {

        const response = await fetch(`${credentials.environment}/api/v2/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password,
            }),
        });

        const data = await response.json() as { access_token: string };

        requestOptions.baseURL = `${credentials.environment}`;
        requestOptions.headers = {
            ...requestOptions.headers,
            Authorization: `Bearer ${data.access_token}`,
        };

        return requestOptions;
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: '={{$credentials.environment}}',
            url: '/api/v2/auth/login',
            method: 'POST',
            body: {
                username: '={{$credentials.username}}',
                password: '={{$credentials.password}}',
            },
        },
    };
}