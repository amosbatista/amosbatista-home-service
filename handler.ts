//import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context, Handler } from 'aws-lambda';
import { Handler, Callback } from 'aws-lambda';
import { HomeListService } from './src/home/HomeListService';

export const homeList: Handler = async (event: any, context: any, callback: Callback) => {
    context;

    const listService = new HomeListService();
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