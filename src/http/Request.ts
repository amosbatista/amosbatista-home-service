export default class Request {
  httpClient: any;

  constructor (
    httpClient: any,
  ) {
    this.httpClient = httpClient;
  }

    Get(
      url: string,
      query: any = {}
    ): any {
      return new Promise( (resolve, reject) => {

        this.httpClient.get(url)
          .query(query)
          .send()
          .set('Content-Type', "application/json")
          .end((err, apiRes) => {
        
          if(err) {
            reject(err);
          }
  
          resolve(apiRes)
        });
      });
  }
}