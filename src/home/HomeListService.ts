import pageValuesService from '../utils/PaginationValuesService';

export default class HomeListService {

  CHAVE_REDIS = "HOME:CONTENT";
  homeContent: Array<any>;
  pageSize: number = 3;
  client: any;

  constructor (redisClientFactory: Function, pageSize?: number) {
    this.pageSize = pageSize || this.pageSize;
    this.client = redisClientFactory();
  }

  Load (_page?: number): Promise<Array<any>> {  
    const page = (!_page || _page < 1) ? 1 : _page;
    const pageInfo = pageValuesService(page, this.pageSize);

    return new Promise( (resolve, reject) => {
      this.client.lrange(
        this.CHAVE_REDIS,
        pageInfo.takeFrom, pageInfo.takeTo,

        (err, redisResponse) => {
          this.client.quit();
        
          if(err) {
            reject(err);
          }
          else{
            resolve(redisResponse);
          }
      });
    });
  }
}