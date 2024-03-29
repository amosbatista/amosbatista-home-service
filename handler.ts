//import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context, Handler } from 'aws-lambda';
import { Handler, Callback, APIGatewayProxyEvent } from 'aws-lambda';
import redisClientFactory  from './src/redis/ClientFactory';
import  HomeListService from './src/home/HomeListService';
import  HomeGenerateService from './src/home/HomeGenerateService';

export const homeList: Handler = async (event: any, context: any, callback: Callback) => {
    context;

    const listService = new HomeListService(redisClientFactory);
    var response:any;
    var error:string;

    const responseBody = await listService.Load(
        event.queryStringParameters ? 
        event.queryStringParameters.page : 
        undefined
    ).catch( clientError => {
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

    listService.saveList(
        parsedBody.content
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