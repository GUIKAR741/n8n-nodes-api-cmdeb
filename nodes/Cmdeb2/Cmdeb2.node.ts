import {IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, NodeConnectionType} from 'n8n-workflow';

import {propertiesConfig} from "./propertiesConfig";
import {execute} from "./Services";

export class Cmdeb2 implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'API CMDEB 2.0',
        name: 'ApiCmdeb2',
        icon: 'file:SGP.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["endpoints"] + ": " + $parameter["transactionType"]}}',
        description: 'Integração com a API CMDEB 2.0',
        defaults: {
            name: 'API CMDEB 2.0',
        },
        inputs: ['main' as NodeConnectionType],
        outputs: ['main' as NodeConnectionType],
        credentials: [
            {
                name: 'ApiCmdeb2',
                required: true,
            },
        ],
        properties: propertiesConfig,
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            const endpoint = this.getNodeParameter('endpoints', i) as string;
            const result = await execute.call(this, endpoint, i);
            returnData.push(...result);
        }

        return [returnData];
    }
}