//import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context, Handler } from 'aws-lambda';
import { Handler, Callback } from 'aws-lambda';
import { HomeListService } from './src/home/HomeListService';

export const homeList: Handler = async (event: any, context: any, callback: Callback) => {
    event; context;

    const listService = new HomeListService();
    const responseBody = await listService.Load(); 

    var response = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin" : "*"
        },
        "body": JSON.stringify(responseBody),
        "isBase64Encoded": false
    };
    callback(null, response);
};