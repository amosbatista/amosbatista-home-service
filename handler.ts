//import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context, Handler } from 'aws-lambda';
import { Handler, Callback, APIGatewayProxyEvent } from 'aws-lambda';
import redisClientFactory  from './src/redis/ClientFactory';
import  HomeContentService from './src/home/HomeContentLoader';
import  HomeGenerateService from './src/home/HomeGenerateService';

export const homeContent: Handler = async (event: any, context: any, callback: Callback) => {
    context;event;

    const listService = new HomeContentService(redisClientFactory);
    var response:any;
    var error:string;

    const responseBody = await listService.Load().catch( clientError => {
        error = JSON.stringify(clientError);
    }); 

    if(error) {
        response = {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin" : "*"
            },
            "body": error,
            "isBase64Encoded": false
        };
    }
    else {
        response = {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin" : "*"
            },
            "body": JSON.stringify(responseBody),
            "isBase64Encoded": false
        };
    }
    
    callback(null, response);
};

export const homeGenerate: Handler = async (event: APIGatewayProxyEvent, context: any, callback: Callback) => {
    context;

    const listService = new HomeGenerateService(redisClientFactory);
    var response:any;

    const parsedBody = JSON.parse(event.body);

    listService.SaveTopContent(
        parsedBody.content.topContent
    );
    
    listService.SaveHighlights(
        parsedBody.content.highlights
    );

    response = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin" : "*"
        },
        "body": "Conteúdo salvo com sucesso",
        "isBase64Encoded": false
    };
        
    callback(null, response);
};