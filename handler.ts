//import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context, Handler } from 'aws-lambda';
import { Handler, Callback } from 'aws-lambda';
import  HomeListService from './src/home/HomeListService';
import  HomeGenerateService from './src/home/HomeGenerateService';

import redisClientFactory  from './src/redis/ClientFactory';

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

export const homeGenerate: Handler = async (event: any, context: any, callback: Callback) => {
    context;

    const listService = new HomeGenerateService(redisClientFactory);
    var response:any;

    listService.saveList(
        event.queryStringParameters ? 
        event.queryStringParameters.page : 
        undefined
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