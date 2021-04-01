//import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context, Handler } from 'aws-lambda';
import { Handler, Callback } from 'aws-lambda';

/*
export const hello: APIGatewayProxyHandler = async (event, _context) => {
    console.log("event", event);
    console.log('context', _context);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
            input: event,
        }),
    };
}

export const nuvem: Handler = async (mensagem: String, context: Context) => {
    context.succeed('Mensagem da Nuvem: ' + mensagem);
}

export const novoArquivoJSON: Handler = async (event: APIGatewayProxyEvent, _context: Context) => {
  console.info(event);
}*/


export const homeList: Handler = async (event: any, context: any, callback: Callback) => {
    event; context;
    var responseBody = [{
        foo: "bar"
    }]

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