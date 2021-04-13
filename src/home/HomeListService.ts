import content from './homeContent.json';
import redisClientFactory from '../redis/ClientFactory';

export class HomeListService {

  homeContent: Array<any>;
  pageSize: number;

  constructor (pageSize?: number) {
    this.homeContent = content;
    this.pageSize = pageSize || 3;
  }

  Load (_page?: number) {
    _page;
    const client = redisClientFactory();

    client.set("foo", "bar");

    return new Promise ( (response, reject) => {
      client.get("foo", (err, redisResponse) => {
        client.quit();
        
        if(err) {
          reject(err);
        }
        else{
          response(redisResponse);
        }
      })
    });
  }
}